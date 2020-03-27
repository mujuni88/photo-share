import React from 'react'
import { Box } from 'grommet'
import { User } from '@photo-share/api/src/ts/interfaces'
import { UserList } from './user-list'
import { Query, QueryResult } from 'react-apollo'
import { gql } from 'apollo-boost'

const USERS_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      name
      avatar
    }
  }
`
type UsersProps = {
  users: User[]
  totalUsers: number
}

export const Loading = () => <Box>Loading users ...</Box>
export const Success = ({ users, totalUsers }: UsersProps) => (
  <Box>
    <Box tag="h3">Total Users {totalUsers}</Box>
    <UserList users={users} />
  </Box>
)

export const Users = () => (
  <Query query={USERS_QUERY}>
    {({ loading, data }: QueryResult) =>
      loading ? (
        <Loading />
      ) : (
        <Success users={data.allUsers} totalUsers={data.totalUsers} />
      )
    }
  </Query>
)
