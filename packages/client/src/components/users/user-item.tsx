import React from 'react';
import { Box, Image } from 'grommet';
import { User } from '@photo-share/api/src/ts/interfaces';

type UserItemProps = Pick<User, 'name' | 'avatar'>;

export const UserItem = ({ name, avatar }: UserItemProps) => (
  <Box
    tag="li"
    align="center"
    justify="start"
    direction="row"
    margin={{ top: 'small' }}
  >
    <Box round height="xsmall" width="xsmall" margin={{ right: 'small' }}>
      <Image fit="cover" src={avatar} alt="Avatar" />
    </Box>
    <Box tag="span">{name}</Box>
  </Box>
);
