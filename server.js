const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const { taskResolver, taskTypeDefs } = require('./schema/task.schema')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true});

const rootTypeDefs = `
	type Query
	type Mutation
	schema {
		query: Query
		mutation: Mutation
	}
`;

const schema = makeExecutableSchema({
	typeDefs: [rootTypeDefs, taskTypeDefs],
	resolvers: taskResolver
})

const server = new ApolloServer({
	schema,
	formatError(error){
		if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      		console.log(error);
    }
    return error;
  },
})

server.listen(process.env.PORT||3000, ()=>{
	console.log(`GraphQL Server Listening at Port ${process.env.PORT||3000}`);
})