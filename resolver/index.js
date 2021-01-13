


const EventSchema = require('../model/event');
const UserSchema = require('../model/user');





const getEvent = async (eventId) => {

try{
  const event =   await  EventSchema.find({
        _id: {
            $in: eventId
        }
    });
     event.map(data => {
            return {
                ...data._doc,
                _id: data.id,
                creator: userfunction.bind(this, data.creator)
            }
        })
    return event;
    }catch(e){
        console.log(e)

    }
}

const userfunction = async (userId) => {
    try{
        const user =  await UserSchema.findById(userId);
        return {
            ...user._doc,
            createEvent: getEvent.bind(this, user.createEvent)
        }
       } catch(e){
        console.log(e);
    }
    
    }


module.exports = {
    events: () => {
        try {
            return EventSchema.find().then(getEvent => {
                return getEvent.map((event) => {
                    let obj = {
                        ...event._doc,
                        creator: userfunction.bind(this, event._doc.creator)
                    }
                    console.log("event ::", obj);

                    return obj
                })

            });
        } catch (error) {
console.log('====================================');
console.log(error);
console.log('====================================');
        }
    },
    createEvent:  (args) => {
        let createdEvent;
            const createEvent = new EventSchema({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date,
                creator: "5ff68f08efe110246b940dd2"
            })

            return createEvent
            .save()
            .then(eventData =>{
            createdEvent = {
                ...eventData._doc,
                _id: eventData._doc.id,
                creator: userfunction.bind(this, eventData.creator)}
            return  UserSchema.findById("5ff68f08efe110246b940dd2");
            }).then(user=>{
                if (!user) {
                        throw new Error('User not found')
                    }
                    user.createEvent.push(createEvent);
                    return  user.save();
            }).then(result=>{
                return createdEvent;
            }).catch(e=>{
                console.log('====================================');
                console.log(e);
                console.log('====================================');
            })
    },

    // create the mutation for creating the new user

    createUser: async (args) => {
        try {
            const getUser = await UserSchema.findOne({
                email: args.UserInput.email
            });
            if (getUser) {
                throw new Error('User Already Exist');
            }
            const hashPassword = await bcrypt.hashSync(args.UserInput.password, salt);
            const user = new UserSchema({
                email: args.UserInput.email,
                password: hashPassword
            })
            const userCreate = await user.save(user);
            console.log('userCreate', userCreate);
            return userCreate;

        } catch (error) {
            console.log('error', error);

            return error;
        }

    }
}