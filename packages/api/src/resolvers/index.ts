import { IResolvers } from 'apollo-server-express';

import { Query } from './Query';
import { Mutation } from './Mutation';
import { DateTime } from './DateTime';

export const resolvers: IResolvers = {
  Query,
  Mutation,
  DateTime,
};
