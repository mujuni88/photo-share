import { users, tags, PhotoValue, UserValue } from '../models';

export const Photo = {
  url: (parent: PhotoValue): string =>
    `https://i.picsum.photos/id/911/200/30${parent.id}.jpg`,
  postedBy: (parent: PhotoValue): UserValue | undefined =>
    users.find(({ githubLogin }) => parent.githubUser === githubLogin),
  taggedUsers: (parent: PhotoValue): (UserValue | undefined)[] =>
    tags
      .filter(({ photoId }) => photoId === parent.id)
      .map(({ userId }) => userId)
      .map((userId) => users.find(({ githubLogin }) => githubLogin === userId)),
};
