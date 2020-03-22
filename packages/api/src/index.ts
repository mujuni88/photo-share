import { ApolloServer, IResolvers } from 'apollo-server';
import { GraphQLScalarType, ValueNode, StringValueNode } from 'graphql';

enum PhotoCategory {
  SELFIE = 'SELFIE',
  POTRAIT = 'POTRAIT',
  ACTION = 'ACTION',
  LANDSCAPE = 'LANDSCAPE',
  GRAPHIC = 'GRAPHIC',
}

interface User {
  githubLogin: string;
  name: string;
  postedPhotos?: Photo[];
}
interface Photo {
  id: string;
  name: string;
  description?: string;
  url: string;
  category: PhotoCategory;
  githubUser: string;
  created: string;
}

const users: User[] = [
  { githubLogin: 'joe', name: 'Joe Buza' },
  { githubLogin: 'alan', name: 'Alan Souza' },
  { githubLogin: 'julien', name: 'Julien Horau' },
  { githubLogin: 'alex', name: 'Alex Rowe' },
];

const dates: string[] = [
  '3-28-1977',
  '1-2-1985',
  '2018-04-15T19:09:57.308Z',
  new Date().toISOString(),
];
const photos: Photo[] = users.map(({ githubLogin, name }, index) => ({
  id: `${index}`,
  url: `https://i.picsum.photos/id/911/200/30${index}.jpg`,
  name,
  description: name,
  category: PhotoCategory.POTRAIT,
  githubUser: githubLogin,
  created: dates[index],
}));

const tags = photos.map(({ id }, index) => ({
  photoId: id,
  userId: users[index].githubLogin,
}));

const typeDefs = `
    scalar DateTime

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

    input PhotoFilter {
        after: DateTime
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
        getPhotos(input: PhotoFilter): [Photo!]!
        getUsers: [User!]!
        getUser(input: UserInput!): User
    }

    type Mutation {
        addPhoto(input: PostPhotoInput!): Photo!
        addUser(input: UserInput!): User!
    }
`;

const resolvers: IResolvers = {
  Query: {
    totalPhotos: () => photos.length,
    getPhotos: (parent, { input }) => {
      const { after } = input;
      console.log('AFTER', after);
      return photos.filter(({ created }) => {
        const isGreater = new Date(created) > after;
        console.log('IS AFTER GREATER', new Date(created), isGreater);
        return isGreater;
      });
    },
    getUsers: () => users,
    getUser: (_, { input }) =>
      users.find(({ githubLogin }) => githubLogin === input.githubLogin),
  },
  Mutation: {
    addPhoto: (_, { input }) => {
      const newPhoto = { ...input, id: photos.length, created: new Date() };
      photos.push(newPhoto);
      return newPhoto;
    },
    addUser: (_, { input }) => {
      const newUser = { ...input };
      users.push(newUser);
      return newUser;
    },
  },
  Photo: {
    url: (parent) => `https://i.picsum.photos/id/911/200/30${parent.id}.jpg`,
    postedBy: (parent) =>
      users.find(({ githubLogin }) => parent.githubUser === githubLogin),
    taggedUsers: (parent) =>
      tags
        .filter(({ photoId }) => photoId === parent.id)
        .map(({ userId }) => userId)
        .map((userId) =>
          users.find(({ githubLogin }) => githubLogin === userId)
        ),
  },
  User: {
    avatar: (parent) =>
      `https://i.picsum.photos/id/911/200/30${parent.githubLogin}.jpg`,
    postedPhotos: (parent) =>
      photos.filter(({ githubUser }) => githubUser === parent.githubLogin),
    inPhotos: (parent) =>
      tags
        .filter(({ userId }) => userId === parent.githubLogin)
        .map(({ photoId }) => photoId)
        .map((photoId) => photos.find(({ id }) => photoId === id)),
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value',
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
  }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
