import React from 'react';
import { Box } from 'grommet';
import { useQuery } from '@apollo/client';
import { User } from '@photo-share/api/src/ts/interfaces';
import { UserList } from './user-list';
import gql from 'graphql-tag';
import { isEmpty } from 'lodash/fp';
import { AddFakeUsers } from '../add-fake-users/add-fake-users';

export const USERS_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
  }

  fragment userInfo on User {
    name
    githubLogin
    avatar
  }
`;

export interface Users {
  totalUsers: number;
  allUsers: User[];
  me: User;
}

type UsersProps = {
  users?: User[];
  totalUsers?: number;
};

type FailureProps = {
  error: Error;
};
export const Failure = ({ error }: FailureProps) => (
  <Box>Error loading users: {error.message}</Box>
);
export const Empty = () => <Box>No users yet</Box>;
export const Loading = () => <Box>Loading users ...</Box>;
export const Success = ({ users = [], totalUsers = 0 }: UsersProps) => (
  <Box justify="start">
    <Box tag="h3">Total Users {totalUsers}</Box>
    <UserList users={users} />
  </Box>
);

export const Users = () => {
  const { loading, data, error } = useQuery<Users>(USERS_QUERY, {
    fetchPolicy: 'cache-first',
  });

  if (error) {
    return <Failure error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (isEmpty(data)) {
    return <Empty />;
  }

  return (
    <>
      <AddFakeUsers />
      <Success users={data?.allUsers} totalUsers={data?.totalUsers} />
    </>
  );
};
