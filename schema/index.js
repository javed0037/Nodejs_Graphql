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
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!

}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
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

input Booking_Input {
    eventId: ID!
}

type RootQuery {
    events:[Event!]!
    booking: [Booking!]!
    login(email: String!,password: String!): AuthData!
}

type RootMutation{
    createEvent(eventInput: Event_Input ): Event 
    createUser(UserInput: User_Input): User
    bookEvent(bookingInput: Booking_Input): Booking!
    cancelBooking(bookingId:ID!): Event!
}

schema{
   query: RootQuery,
   mutation: RootMutation
}
`);