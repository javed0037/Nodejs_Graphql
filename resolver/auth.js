
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const UserSchema = require('../model/user');



module.exports = {
    createUser: async (args) => {
        try {
            const getUser = await UserSchema.findOne({
                email: args.UserInput.email
            });
            if (getUser) {
                throw new Error('User Already Exist');
            }
            const hashPassword = bcrypt.hashSync(args.UserInput.password, salt);
            const user = new UserSchema({
                email: args.UserInput.email,
                password: hashPassword
            })
            const userCreate = await user.save(user);
            return userCreate;

        } catch (error) {
            console.log('error', error);
            return error;
        }

    },
login: async ({email, password}) => {
    try{
        const user = await UserSchema.findOne({email});
        if(!user){
            throw new Error("user is not find");
        }
       const comparePassword =  await bcrypt.compare(password, user.password);
         if(!comparePassword){
              throw new Error("password is incorrect");
        }
       const token =  jwt.sign({userId: user._id,email: user.email},"ad2wallet",{expiresIn: "1h"})
         return {
            userId: user.id,
            token,
            tokenExpiration:1
        }
    }catch(e){
        throw new Error(e)
    }

}
   
}