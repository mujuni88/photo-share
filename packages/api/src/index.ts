import { ApolloServer, IResolvers } from 'apollo-server'

enum PhotoCategory {
    SELFIE = 'SELFIE',
    POTRAIT = 'POTRAIT',
    ACTION = 'ACTION',
    LANDSCAPE = 'LANDSCAPE',
    GRAPHIC = 'GRAPHIC',
}

interface User {
    githubLogin: String
    name?: String
    postedPhotos?: Photo[]
}
interface Photo {
    id: String
    name: String
    description?: String
    url: String
    category: PhotoCategory
    githubUser: String
}

const users: User[] = [
    { githubLogin: 'joe', name: 'Joe Buza' },
    { githubLogin: 'alan', name: 'Alan Souza' },
]
const photos: Photo[] = [
    {
        "id": "0",
        "url": "https://i.picsum.photos/id/911/200/300.jpg",
        "name": "Joe",
        "description": "Buza",
        "category": PhotoCategory.POTRAIT,
        githubUser: users[0].githubLogin
    },
    {
        "id": "1",
        "url": "https://i.picsum.photos/id/911/200/301.jpg",
        "name": "Joe",
        "description": "Buza",
        "category": PhotoCategory.POTRAIT,
        githubUser: users[1].githubLogin
    }
]
const typeDefs: string = `
    enum PhotoCategory {
        SELFIE
        POTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }

    input PostPhotoInput {
        name: String!
        description: String
        category: PhotoCategory=POTRAIT
        githubUser: String!
    }

    input UserInput {
        githubLogin: String!
        name: String
    }

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
    }

    type User {
        githubLogin: ID!
        name: String
        avatar: String
        postedPhotos: [Photo!]!
    }
    type Query {
        totalPhotos: Int!
        getPhotos: [Photo!]!
        getUsers: [User!]!
        getUser(input: UserInput!): User
    }

    type Mutation {
        addPhoto(input: PostPhotoInput!): Photo!
        addUser(input: UserInput!): User!
    }
`


const resolvers: IResolvers = {
    Query: {
        totalPhotos: () => photos.length,
        getPhotos: () => photos,
        getUsers: () => users,
        getUser: (_, { input }) => users.find(({ githubLogin }) => githubLogin === input.githubLogin)
    },
    Mutation: {
        addPhoto: (_, { input }) => {
            const newPhoto = { ...input, id: photos.length }
            photos.push(newPhoto)
            return newPhoto
        },
        addUser: (_, { input }) => {
            const newUser = { ...input }
            users.push(newUser)
            return newUser
        }
    },
    Photo: {
        url: parent => `https://i.picsum.photos/id/911/200/30${parent.id}.jpg`,
        postedBy: parent => users.find(({githubLogin}) => parent.githubUser === githubLogin)
    },
    User: {
        avatar: parent => `https://i.picsum.photos/id/911/200/30${parent.githubLogin}.jpg`,
        postedPhotos: parent => photos.filter(({ githubUser }) => githubUser === parent.githubLogin)
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`GraphQL Service running on ${url}`))