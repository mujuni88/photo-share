import React from 'react';
import wait from 'waait';
import { render, screen, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import faker from 'faker';

// The component AND the query need to be exported
import { USERS_QUERY, Users } from './';

const mocks = [
  {
    request: {
      query: USERS_QUERY,
    },
    result: () => ({
      data: {
        totalUsers: faker.fake.length,
        allUsers: [
          {
            name: faker.name.findName(),
            githubLogin: faker.internet.userName(),
            avatar: faker.internet.avatar(),
          },
          {
            name: faker.name.findName(),
            githubLogin: faker.internet.userName(),
            avatar: faker.internet.avatar(),
          },
        ],
        me: {
          name: faker.name.findName(),
          githubLogin: faker.internet.userName(),
          avatar: faker.internet.avatar(),
        },
      },
    }),
  },
];

describe('users', () => {
  it('should render users', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Users />
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeTruthy();

    await act(async () => await wait(0));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="StyledBox-sc-13pk1d4-0 iblEOj"
        >
          <button
            class="StyledButton-sc-323bzc-0 iuDhZQ"
            type="button"
          >
            Add Fake User
          </button>
        </div>
        <div
          class="StyledBox-sc-13pk1d4-0 eowHFX"
        >
          <h3
            class="StyledBox-sc-13pk1d4-0 jJdKAu"
          >
            Total Users 
            1
          </h3>
          <ul
            class="StyledBox-sc-13pk1d4-0 jJdKAu"
          >
            <li
              class="StyledBox-sc-13pk1d4-0 cARVMe"
              data-testid="user-item"
            >
              <div
                class="StyledBox-sc-13pk1d4-0 bAPboM"
              >
                <img
                  alt="Avatar"
                  class="StyledImage-ey4zx9-0 dQECSV"
                />
              </div>
              <span
                class="StyledBox-sc-13pk1d4-0 jJdKAu"
              />
            </li>
            <li
              class="StyledBox-sc-13pk1d4-0 cARVMe"
              data-testid="user-item"
            >
              <div
                class="StyledBox-sc-13pk1d4-0 bAPboM"
              >
                <img
                  alt="Avatar"
                  class="StyledImage-ey4zx9-0 dQECSV"
                />
              </div>
              <span
                class="StyledBox-sc-13pk1d4-0 jJdKAu"
              />
            </li>
          </ul>
        </div>
      </div>
    `);
  });
});
