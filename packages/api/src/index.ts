import { ApolloServer, PubSub } from 'apollo-server-express'
import express from 'express'
import { createServer } from 'http'
import expressPlayground from 'graphql-playground-middleware-express'
import { readFileSync } from 'fs'
import { resolvers } from './resolvers'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import { MongoClient, Db } from 'mongodb'
import { Context } from './ts/interfaces'

const typeDefs = readFileSync(
  path.resolve(__dirname, './typeDefs.graphql'),
  'UTF-8'
)

async function start(): Promise<void> {
  const app = express()

  const MONGO_DB = process.env.DB_HOST || ''

  let db: Db
  try {
    const client: MongoClient = await MongoClient.connect(MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    db = client.db()
  } catch (error) {
    console.log(`
    
      Mongo DB Host not found!
      please add DB_HOST environment variable to .env file
      exiting...
       
    `)
    console.error(error)
    process.exit(1)
  }

  const pubsub = new PubSub()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }): Promise<Context> => {
      const githubToken = req
        ? req.headers.authorization
        : connection?.context.Authorization
      const currentUser = await db.collection('users').findOne({ githubToken })
      return { db, currentUser, pubsub }
    },
  })

  const httpServer = createServer(app)
  server.installSubscriptionHandlers(httpServer)

  server.applyMiddleware({ app })

  app.get('/', (req, res) => res.send('Welcome to PhotoShare API'))
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
  httpServer.listen({ port: 4000 }, () =>
    console.log(
      `GraphQL Server running @http://localhost:4000${server.graphqlPath}`
    )
  )
}

start()
