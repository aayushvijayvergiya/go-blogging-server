const express = require('express');
const mongoose = require('mongoose');
// const schema = require('./schema.graphql');
const { typeDefs, resolvers } = require('./schema');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server-express');
const session = require('express-session');
const passport = require('passport');

const app = new express();

require('./passport/config')(passport);

const MONGO_URI = 'mongodb://localhost:27017/go-blog-db';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB'))
    .on('error', error => console.log('Error connecting to MongoDB:', error));

app.use(express.json());

app.use(session({
    secret: 'Ghanta Secret',
    resave: false,
    saveUnintialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.use('/category', require('./routes/category'));
app.use('/blogs', require('./routes/blogs'));
app.use('/user', require('./routes/user'));


const executedSchema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema: executedSchema, playground: true, introspection: true });
server.applyMiddleware({ app });

app.listen(4000, () => {
    console.log('Server listening at 4000');
});

