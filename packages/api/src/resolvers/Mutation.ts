import fetch from 'node-fetch';
import { IResolverObject } from 'apollo-server-express';
import { authorizeWithGithub } from '../helper';
import { Photo, User, RandomUser, AuthUser, Context } from '../ts/interfaces';

export const Mutation: IResolverObject = {
  postPhoto: async (
    _,
    { input },
    { db, currentUser }: Context
  ): Promise<Photo> => {
    if (!currentUser) {
      throw new Error('Only an authorized user can post a photo');
    }

    const newPhoto = {
      ...input,
      userID: currentUser.githubLogin,
      created: new Date(),
    };

    const { insertedIds } = await db.collection('photos').insert(newPhoto);
    newPhoto.id = insertedIds[0];

    return newPhoto;
  },
  githubAuth: async (_, { code }, { db }) => {
    /* eslint-disable @typescript-eslint/camelcase */
    const {
      message,
      access_token,
      avatar_url,
      login,
      name,
    } = await authorizeWithGithub({
      client_id: process.env.GITHUB_CLIENT_ID || '',
      client_secret: process.env.GITHUB_CLIENT_SECRET || '',
      code,
    });

    if (message) {
      throw new Error(message);
    }

    // package result into a single object
    const latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url,
    };

    // add or update the record with the new info
    const {
      ops: [user],
    } = await db
      .collection('users')
      .replaceOne({ githubLogin: login }, latestUserInfo, {
        upsert: true,
      });

    return { user, token: access_token };
  },
  addFakeUsers: async (
    _,
    { count }: { count: number },
    { db }: Context
  ): Promise<User[]> => {
    const randomUserApi = `https://randomuser.me/api/?results=${count}`;
    const { results: randomUsers } = await fetch(randomUserApi).then((res) =>
      res.json()
    );

    const users = randomUsers.map(
      ({
        login: { username: githubLogin, sha1: githubToken },
        name: { first, last },
        picture: { thumbnail: avatar },
      }: RandomUser) => ({
        githubLogin,
        name: `${first} ${last}`,
        avatar,
        githubToken,
      })
    );
    await db.collection('users').insert(users);

    return users;
  },
  fakeUserAuth: async (parent, { githubLogin }, { db }): Promise<AuthUser> => {
    const user = await db.collection('users').findOne({ githubLogin });

    if (!user) {
      throw new Error(`Cannot find user with githubLogin "${githubLogin}"`);
    }

    return {
      token: user.githubLogin,
      user,
    };
  },
};
