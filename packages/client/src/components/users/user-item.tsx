import React from 'react'
import { Box } from 'grommet'
import { User } from '@photo-share/api/src/ts/interfaces'

type UserItemProps = Pick<User, 'name' | 'avatar'>;

export const UserItem = ({ name, avatar }: UserItemProps) => (
  <Box tag="li" align="center" justify="start">
    <img src={avatar} alt='Avatar'/>
    <Box tag="span">{name}</Box>
  </Box>
)
