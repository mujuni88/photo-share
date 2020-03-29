import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Image, Button } from 'grommet'
import { User } from '@photo-share/api/src/ts/interfaces'
import { USERS_QUERY } from '../../components/users'

type UserProps = Pick<User, 'name' | 'avatar'> & { refetch: () => void }

export const CurrentUser = ({ avatar, name, refetch }: UserProps) => (
  <Box width="small">
    <Box round height="xsmall" width="xsmall" margin={{ right: 'small' }}>
      <Image fit="cover" src={avatar} alt="Avatar" />
    </Box>
    <Box tag="span">{name}</Box>
    <Button
      label="Logout"
      onClick={() => {
        localStorage.removeItem('token')
        refetch()
      }}
    />
  </Box>
)

type MeProps = {
  signingIn: boolean
  requestCode: () => void
}

export const Me = ({ signingIn, requestCode }: MeProps) => {
  const { loading, data, refetch } = useQuery(USERS_QUERY)
  return data?.me ? (
    <CurrentUser
      avatar={data.me.avatar}
      name={data.me.name}
      refetch={refetch}
    />
  ) : loading ? (
    <Box>Loading... </Box>
  ) : (
    <Button
      label="Sign In with Github"
      disabled={signingIn}
      onClick={requestCode}
    />
  )
}
