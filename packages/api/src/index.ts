import { ApolloServer, IResolvers } from 'apollo-server'

const typeDefs: string = `
    type Query {
        totalPhotos: Int!
    }
`

const resolvers: IResolvers = {
    Query: {
        totalPhotos: () => 40,
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`GraphQL Service running on ${url}`))