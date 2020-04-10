import React from 'react';
import { Box } from 'grommet';
import { UserItem } from './user-item';
import { User } from '@photo-share/api/src/ts/interfaces';
import nextId from 'react-id-generator';

type Props = {
  users: User[];
};

export const UserList = ({ users }: Props) => {
  return (
    <Box tag="ul" direction="column">
      {users.map(({ name, avatar }) => (
        <UserItem key={nextId()} name={name} avatar={avatar} />
      ))}
    </Box>
  );
};
