import { Context } from 'src/ts/interfaces'
import { SubscriptionKey } from '../ts/types'

export const Subscription = {
  newPhoto: {
    subscribe: (_parent: any, _args: any, { pubsub }: Context): void => {
      pubsub.asyncIterator(SubscriptionKey.PHOTO_ADDED)
    },
  },
  newUser: {
    subscribe: (_parent: any, _args: any, { pubsub }: Context): void => {
      pubsub.asyncIterator(SubscriptionKey.NEW_USER)
    },
  },
}
