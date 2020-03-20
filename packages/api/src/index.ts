import { ApolloServer, IResolvers } from 'apollo-server'
import { GraphQLScalarType, ValueNode, StringValueNode } from 'graphql'

enum PhotoCategory {
    SELFIE = 'SELFIE',
    POTRAIT = 'POTRAIT',
    ACTION = 'ACTION',
    LANDSCAPE = 'LANDSCAPE',
    GRAPHIC = 'GRAPHIC',
}

interface User {
    githubLogin: String
    name: String
    postedPhotos?: Photo[]
}
interface Photo {
    id: String
    name: String
    description?: String
    url: String
    category: PhotoCategory
    githubUser: String,
    created: String,
}

const users: User[] = [
    { githubLogin: 'joe', name: 'Joe Buza' },
    { githubLogin: 'alan', name: 'Alan Souza' },
    { githubLogin: 'julien', name: 'Julien Horau' },
    { githubLogin: 'alex', name: 'Alex Rowe' },
]

const dates: String[] = ['3-28-1977', '1-2-1985', '2018-04-15T19:09:57.308Z', new Date().toISOString()]
const photos: Photo[] = users.map(({ githubLogin, name }, index) => ({
    id: `${index}`,
    url: `https://i.picsum.photos/id/911/200/30${index}.jpg`,
    name,
    description: name,
    category: PhotoCategory.POTRAIT,
    githubUser: githubLogin,
    created: dates[index]
}))

const tags = photos.map(({ id }, index) => ({
    photoId: id,
    userId: users[index].githubLogin,
}))

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

    scalar DateTime
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
        taggedUsers: [User!]!
        created: DateTime!
    }

    type User {
        githubLogin: ID!
        name: String
        avatar: String
        postedPhotos: [Photo!]!
        inPhotos: [Photo!]!
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
        getUser: (_, { input }) =>
            users.find(({ githubLogin }) => githubLogin === input.githubLogin),
    },
    Mutation: {
        addPhoto: (_, { input }) => {
            const newPhoto = { ...input, id: photos.length, created: new Date() }
            photos.push(newPhoto)
            return newPhoto
        },
        addUser: (_, { input }) => {
            const newUser = { ...input }
            users.push(newUser)
            return newUser
        },
    },
    Photo: {
        url: parent => `https://i.picsum.photos/id/911/200/30${parent.id}.jpg`,
        postedBy: parent =>
            users.find(({ githubLogin }) => parent.githubUser === githubLogin),
        taggedUsers: parent =>
            tags
                .filter(({ photoId }) => photoId === parent.id)
                .map(({ userId }) => userId)
                .map(userId => users.find(({ githubLogin }) => githubLogin === userId)),
    },
    User: {
        avatar: parent =>
            `https://i.picsum.photos/id/911/200/30${parent.githubLogin}.jpg`,
        postedPhotos: parent =>
            photos.filter(({ githubUser }) => githubUser === parent.githubLogin),
        inPhotos: parent =>
            tags
                .filter(({ userId }) => userId === parent.githubLogin)
                .map(({ photoId }) => photoId)
                .map(photoId => photos.find(({ id }) => photoId === id)),
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value',
        parseValue: (value) => new Date(value),
        serialize: (value) => new Date(value).toISOString()
    })
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen()
    .then(({ url }) => console.log(`GraphQL Service running on ${url}`))
