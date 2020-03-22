import { users, tags } from '../models';

export const Photo = {
  url: (parent) => `https://i.picsum.photos/id/911/200/30${parent.id}.jpg`,
  postedBy: (parent) =>
    users.find(({ githubLogin }) => parent.githubUser === githubLogin),
  taggedUsers: (parent) =>
    tags
      .filter(({ photoId }) => photoId === parent.id)
      .map(({ userId }) => userId)
      .map((userId) => users.find(({ githubLogin }) => githubLogin === userId)),
};
