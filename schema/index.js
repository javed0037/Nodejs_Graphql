const { buildSchema } = require('graphql');


module.exports = buildSchema(`

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator:User!
}

type User{
    _id: ID!
    email: String!
    password: String!,
    createEvent: [Event!]

}


input Event_Input {
    title: String!
    description: String!
    price: Float!
    date: String!    
}
input User_Input {
    email: String!
    password: String!
}

type RootQuery {
    events:[Event!]!
}

type RootMutation{
    createEvent(eventInput: Event_Input ): Event 
    createUser(UserInput: User_Input): User
}

schema{
   query: RootQuery,
   mutation: RootMutation
}
`);