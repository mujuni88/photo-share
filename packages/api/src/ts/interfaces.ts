import { Db } from 'mongodb'
import { PhotoCategory } from './types'
import { PubSub } from 'apollo-server-express'
export interface Context {
  db: Db
  currentUser: User
  pubsub: PubSub
}

export interface AuthUser {
  user: User
  token: string
}
export interface User {
  githubLogin: string
  avatar: string
  name: string
  postedPhotos?: Photo[]
}

export interface RandomUser {
  login: {
    username: string
    sha1: string
  }
  name: {
    first: string
    last: string
  }
  picture: {
    thumbnail: string
  }
}
export interface Photo {
  id?: string
  _id: string
  name: string
  description?: string
  url: string
  category: PhotoCategory
  userID: string
  created: string
}
