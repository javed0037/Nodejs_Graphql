const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const buildSchema1 = require('./schema/index')
const {rootResolver} = require('./resolver/index');
const isAuth = require('./middlewares/is_auth')

mongoose.connect('mongodb://localhost:27017/GraphQL', {
    useNewUrlParser: true
})


const app = express();
app.use(bodyParser.json())

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
    schema: buildSchema1,
    rootValue: rootResolver,
    graphiql: true
}))


app.listen(5000., () => {
    console.log('app running on the port', 5000);
})