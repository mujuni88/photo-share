import { Photo as IPhoto, User, Context } from '../ts/interfaces';
import { IResolverObject } from 'apollo-server-express';

export const Photo: IResolverObject = {
  id: (parent: IPhoto): string => parent.id || parent._id,
  url: (parent: IPhoto): string =>
    `https://i.picsum.photos/id/911/200/30${parent.id}.jpg`,
  postedBy: async (
    parent: IPhoto,
    args: any,
    { db }: Context
  ): Promise<User | null> =>
    await db.collection('users').findOne({ githubLogin: parent.userID }),
};

/*

  taggedUsers: (parent: Photo): (User | undefined)[] =>
    tags
      .filter(({ photoId }) => photoId === parent.id)
      .map(({ userId }) => userId)
      .map((userId) => users.find(({ githubLogin }) => githubLogin === userId)),
*/
