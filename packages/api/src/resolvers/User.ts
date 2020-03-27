import { IResolverObject } from 'apollo-server-express';

export const User: IResolverObject = {
  avatar: (parent) =>
    `https://i.picsum.photos/id/911/200/30${parent.githubLogin}.jpg`,
};
