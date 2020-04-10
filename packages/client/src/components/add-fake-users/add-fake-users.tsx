import React from 'react';
import { Box, Button } from 'grommet';
import { Mutation, MutationResult } from 'react-apollo';
import { gql } from 'apollo-boost';
import { USERS_QUERY } from '../users';

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

export const AddFakeUsers = () => (
  <Mutation<MutationResult, AddFakeUsersVariables>
    mutation={ADD_FAKE_USERS_MUTATION}
    variables={{ count: 1 }}
    refetchQueries={[{ query: USERS_QUERY }]}
  >
    {(addFakeUsers, { error, data }) => (
      <Box width="small">
        <Button
          label="Add Fake User"
          onClick={() => addFakeUsers()}
          size="small"
        />
      </Box>
    )}
  </Mutation>
);
