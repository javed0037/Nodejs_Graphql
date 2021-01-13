const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const EventSchema = require('./model/event');
const UserSchema = require('./model/user');
const buildSchema1 = require('./schema/index')
const resolver = require('./resolver/index')
const salt = bcrypt.genSaltSync(10);

mongoose.connect('mongodb://localhost:27017/GraphQL', {
    useNewUrlParser: true
})

const app = express();
app.use(bodyParser.json())
const events = [];





app.use('/graphql', graphqlHTTP({
    schema: buildSchema1,
    rootValue: resolver,
    graphiql: true
}))

app.listen(5000., () => {
    console.log('app running on the port', 5000);
})