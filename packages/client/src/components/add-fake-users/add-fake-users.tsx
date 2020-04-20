import React from 'react'
import { Box, Button } from 'grommet'
import gql from 'graphql-tag'
import { USERS_QUERY, Users } from '../users'
import { useMutation } from '@apollo/client'

export const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      name
      avatar
      githubLogin
    }
  }
`

type AddFakeUsersVariables = {
  count: number
}

export const AddFakeUsers = () => {
  const [addFakeUsers] = useMutation(ADD_FAKE_USERS_MUTATION, {
    update(cache, { data: { addFakeUsers } }) {
      const data = cache.readQuery<Users>({
        query: USERS_QUERY,
      })

      cache.writeQuery({
        query: USERS_QUERY,
        data: {
          totalUsers: data?.totalUsers + addFakeUsers.length,
          allUsers: data?.allUsers
            ? [...data?.allUsers, ...addFakeUsers]
            : [addFakeUsers],
        },
      })
    },
  })

  return (
    <Box width="small">
      <Button
        label="Add Fake User"
        onClick={() => addFakeUsers({ variables: { count: 1 } })}
        size="small"
      />
    </Box>
  )
}
