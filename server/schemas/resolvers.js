const { AuthenticationError } = require('apollo-server-express');
const { User, List, Task } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //this function should not be called
        //user should only get their own data (me)
        Users: async() => 
        { 
            return Users.find();
        },
        //this function should not be called
        //user should only get their own data (me)
        User:  async(parent, {userId}) =>
        {
            return Users.findOne({_id:userId});
        },
        me: async(parent,args,context) =>
        {
            if(context.user) {
                return Users.findOne({_id:userId});
            }
            throw new AuthenticationError('You need to be logged in')
        },
        Lists: async(parent, {email}) =>
        {
            const params = email ? {email} : {};
            return List.find(params);
        }

    },
    
};

module.exports resolvers;