import React from 'react';
import { render, findByTestId } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

// The component AND the query need to be exported
import { USERS_QUERY, Users } from './';

const mocks = [
  {
    request: {
      query: USERS_QUERY,
      variables: {
        code: 'test',
      },
    },
    result: {
      data: {
        totalUsers: 4,
        allUsers: [
          {
            name: 'Joe',
            githubLogin: 'joebm08',
          },
          {
            name: 'John',
            githubLogin: 'johnBm',
          },
        ],
      },
    },
  },
];

describe('users', () => {
  it('should render users', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Users />
      </MockedProvider>
    );

    const signInText = await findByTestId(container, 'signin');

    expect(signInText).toBeTruthy();
  });
});
