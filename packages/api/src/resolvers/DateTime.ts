import { GraphQLScalarType } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A valid date time value',
  parseValue: (value) => new Date(value),
  serialize: (value) => new Date(value).toISOString(),
});
