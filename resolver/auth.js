const UserSchema = require('../model/user');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);



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

   
}