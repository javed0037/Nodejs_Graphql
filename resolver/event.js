const EventSchema = require('../model/event');
const UserSchema = require('../model/user');
const { transformEvent } = require('./merge')




module.exports = {

events: async () => {
    try {
      const getEvent =   await  EventSchema.find();
            return getEvent.map((event) => {
                return transformEvent(event);
            })

        
    } catch (error) {
        console.log(error);
    }
},

createEvent:  async (args) => {
    try{
        const createEvent = new EventSchema({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: args.eventInput.date,
            creator: "5ff68f08efe110246b940dd2"
        })
        
        const eventData=  await createEvent.save();

        
    const user= await UserSchema.findById("5ff68f08efe110246b940dd2");                
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


