import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLScalarType } from 'graphql';

const scalarDate = new GraphQLScalarType({
  name: 'Date',
  parseValue(value: any) {
    return new Date(value);
  },
  serialize(value: any) {
    return value.toISOString();
  },
});

const typesArray = loadFilesSync(path.join(__dirname, './typeDefs'), {
  extensions: [ 'graphql' ],
});

const resolversArray = loadFilesSync(
  path.join(__dirname, './resolvers/**/*.resolvers.*')
);

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({ resolvers: { ...resolvers, Date: scalarDate }, typeDefs });

export default schema;