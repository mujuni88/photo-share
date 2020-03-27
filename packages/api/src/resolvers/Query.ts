import { IResolverObject } from 'apollo-server-express';

export const Query: IResolverObject = {
  me: (_, args, { currentUser }) => currentUser,
  totalPhotos: (_, args, { db }) =>
    db.collection('photos').estimatedDocumentCount(),
  allPhotos: (_, args, { db }) => {
    db.collection('photos').find().toArray();
  },
  totalUsers: (_, args, { db }) =>
    db.collection('users').estimatedDocumentCount(),
  allUsers: (_, args, { db }) => db.collection('users').find().toArray(),
};
