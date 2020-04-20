import { IResolvers } from 'apollo-server-express'

import { Query } from './Query'
import { Mutation } from './Mutation'
import * as Types from './Types'
import { Subscription } from './Subscription'

export const resolvers: IResolvers = {
  Query,
  Mutation,
  Subscription,
  ...Types,
}
