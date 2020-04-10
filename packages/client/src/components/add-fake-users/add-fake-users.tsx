import React from 'react';
import { Box, Button } from 'grommet';
import gql from 'graphql-tag';
import { USERS_QUERY } from '../users';
import { useMutation } from '@apollo/react-hooks';

export const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      name
      avatar
    }
  }
`;

type AddFakeUsersVariables = {
  count: number;
};

export const AddFakeUsers = () => {
  const [addFakeUsers] = useMutation(ADD_FAKE_USERS_MUTATION, {
    refetchQueries: [{ query: USERS_QUERY }],
  });

  return (
    <Box width="small">
      <Button
        label="Add Fake User"
        onClick={() => addFakeUsers({ variables: { count: 1 } })}
        size="small"
      />
    </Box>
  );
};
