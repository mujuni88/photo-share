import { GraphQLScalarType } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A valid date time value',
  parseValue: (value): Date => new Date(value),
  serialize: (value): string => new Date(value).toISOString(),
});
