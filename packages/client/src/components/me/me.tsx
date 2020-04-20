import React from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { Box, Image, Button } from 'grommet'
import { User } from '@photo-share/api/src/ts/interfaces'
import { USERS_QUERY } from '../../components/users'

type UserProps = Pick<User, 'name' | 'avatar'> & { onLogout: () => void }

export const CurrentUser = ({ avatar, name, onLogout }: UserProps) => (
  <Box width="medium" direction="row" align="center" justify="between">
    <Box round height="xsmall" width="xsmall" margin={{ right: 'small' }}>
      <Image fit="contain" src={avatar} alt="Avatar" />
    </Box>
    <Box tag="span">{name}</Box>
    <Button label="Logout" onClick={onLogout} />
  </Box>
)

type MeProps = {
  signingIn: boolean
  requestCode: () => void
}

export const Me = ({ signingIn, requestCode }: MeProps) => {
  const { loading, data } = useQuery(USERS_QUERY)
  const client = useApolloClient()
  const logout = () => {
    localStorage.removeItem('token')
    client.writeQuery({
      query: USERS_QUERY,
      data: {
        totalUsers: 0,
        allUsers: [],
        me: null,
      },
    })
  }
  return (
    <Box
      width="medium"
      direction="row"
      align="center"
      justify="between"
      pad="small"
    >
      {data?.me ? (
        <CurrentUser
          avatar={data.me.avatar}
          name={data.me.name}
          onLogout={logout}
        />
      ) : loading ? (
        <Box>Loading... </Box>
      ) : (
        <Button
          data-testid="signin"
          label="Sign In with Github"
          disabled={signingIn}
          onClick={requestCode}
        />
      )}
    </Box>
  )
}
