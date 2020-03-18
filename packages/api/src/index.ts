import { ApolloServer, IResolvers } from 'apollo-server'

interface Photo {
    name: String
    description?: String
}

const photos: Photo[] = []
const typeDefs: string = `
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
    }
    type Query {
        totalPhotos: Int!
        getPhotos: [Photo!]!
    }

    type Mutation {
        addPhoto(name: String! description: String): Photo
    }
`


const resolvers: IResolvers = {
    Query: {
        totalPhotos: () => photos.length,
        getPhotos: () => photos
    },
    Mutation: {
        addPhoto: (_, args) => {
            const newPhoto = { ...args, id: photos.length}
            photos.push(newPhoto)
            return newPhoto
        }
    },
    Photo: {
        url: parent => `https://i.picsum.photos/id/911/200/30${parent.id}.jpg`
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`GraphQL Service running on ${url}`))