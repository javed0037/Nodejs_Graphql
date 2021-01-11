const express =  require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema} = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const EventSchema = require('./model/event');
const UserSchema = require('./model/user');
  
const salt = bcrypt.genSaltSync(10);

mongoose.connect('mongodb://localhost:27017/GraphQL',{
    useNewUrlParser: true
})

const app = express();
app.use(bodyParser.json())
const events =[];

app.use('/graphql',graphqlHTTP({
        schema: buildSchema(`

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User{
            _id: ID!
            email: String!
            password: String!
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
       `),
       rootValue:{
           events:async ()=>{
               try {
                const getEvent =  await EventSchema.find();
                return getEvent;
               } catch (error) {
                   
               }
           },
           createEvent: async (args)=> {
        try { 

           const createEvent = new EventSchema({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date,
                creator: "5ff68f08efe110246b940dd2"
                })

              const eventData = await createEvent.save();
              
              const user = await UserSchema.findById("5ff68f08efe110246b940dd2");
              if(!user){
                  throw new Error('User not found')
              }
              console.log('userDate',user);

              user.createEvent.push(createEvent);
              const userDate = await user.save();

               return eventData;
           }
        
        catch (error) {
            console.log('error',error);  
        }
    },
    
    // create the mutation for creating the new user

    createUser: async (args)=> {

try {
    const getUser = await UserSchema.findOne({email: args.UserInput.email});
    if(getUser){
       throw  new Error('User Already Exist');
    }
    const hashPassword =  await bcrypt.hashSync(args.UserInput.password, salt);
    const user = new UserSchema({
        email: args.UserInput.email,
        password: hashPassword
    })
    const userCreate = await user.save(user);
    console.log('userCreate',userCreate);
    return userCreate;
  
   } catch (error) {
    console.log('error',error);

    return error;
    }
        
 } 
},
    graphiql: true
}))

app.listen(5000.,()=>{
console.log('app running on the port',5000);
})