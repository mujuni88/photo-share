import React from 'react';
import { Box } from 'grommet';
import { UserItem } from './user-item';
import { User } from '@photo-share/api/src/ts/interfaces';

type Props = {
  users: User[];
};

export const UserList = ({ users }: Props) => (
  <Box tag="ul" direction="column">
    {users.map(({ name, avatar, githubLogin }) => (
      <UserItem key={githubLogin} name={name} avatar={avatar} />
    ))}
  </Box>
);
