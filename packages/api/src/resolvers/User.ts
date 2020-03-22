import { IResolverObject } from 'apollo-server-express';
import { photos, tags } from '../models';

export const User: IResolverObject = {
  avatar: (parent) =>
    `https://i.picsum.photos/id/911/200/30${parent.githubLogin}.jpg`,
  postedPhotos: (parent) =>
    photos.filter(({ githubUser }) => githubUser === parent.githubLogin),
  inPhotos: (parent) =>
    tags
      .filter(({ userId }) => userId === parent.githubLogin)
      .map(({ photoId }) => photoId)
      .map((photoId) => photos.find(({ id }) => photoId === id)),
};
