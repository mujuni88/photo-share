import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers';
import path from 'path';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

const typeDefs = readFileSync(
  path.resolve(__dirname, './typeDefs.graphql'),
  'UTF-8'
);
dotenv.config();

async function start(): Promise<void> {
  const app = express();

  const MONGO_DB = process.env.DB_HOST || '';
  let db;

  try {
    const client = await MongoClient.connect(MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db();
  } catch (error) {
    console.log(`
    
      Mongo DB Host not found!
      please add DB_HOST environment variable to .env file
      exiting...
       
    `);
    process.exit(1);
  }

  const context = { db };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  const DB_HOST = process.env.DB_HOST;

  server.applyMiddleware({ app });

  app.get('/', (req, res) => res.send('Welcome to PhotoShare API'));
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
  app.listen({ port: 4000 }, () =>
    console.log(
      `GraphQL Server running @http://localhost:4000${server.graphqlPath}`
    )
  );
}

start();
