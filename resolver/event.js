const EventSchema = require('../model/event');
const UserSchema = require('../model/user');
const { transformEvent } = require('./merge')




module.exports = {

events: async (args, req) => {
    try {

        if(!req.isAuth){
            return new Error('Unorthorized')
        }
      const getEvent =   await  EventSchema.find();
            return getEvent.map((event) => {
                return transformEvent(event);
            })

        
    } catch (error) {
        console.log(error);
    }
},

createEvent:  async (args,req) => {
    try{
        
        if(!req.isAuth){
            return new Error('Unorthorized')
        }
        const createEvent = new EventSchema({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date,
            creator: req.userId
        })
        
        const eventData=  await createEvent.save();

        
        const user= await UserSchema.findById(req.userId);                
          if (!user) {
                    throw new Error('User not found')
                }
                user.createEvent.push(createEvent);
                await   user.save();
            return transformEvent(eventData);
        }
        catch(e){
            console.log(e);
        }
    }
}


