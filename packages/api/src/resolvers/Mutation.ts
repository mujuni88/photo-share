import { IResolverObject } from 'apollo-server-express';
import { users, photos } from '../models';

export const Mutation: IResolverObject = {
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
};
