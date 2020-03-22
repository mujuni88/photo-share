import { IResolverObject } from 'apollo-server-express';
import { photos, users } from '../models';

export const Query: IResolverObject = {
  totalPhotos: () => photos.length,
  getPhotos: (parent, { input }) => {
    const { after } = input;
    return photos.filter(({ created }) => new Date(created) > after);
  },
  getUsers: () => users,
  getUser: (_, { input }) =>
    users.find(({ githubLogin }) => githubLogin === input.githubLogin),
};
