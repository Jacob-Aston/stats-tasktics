const { AuthenticationError } = require('apollo-server-express');
const { User, List, Task } = require('../models');
const { signToken } = require('../utils/auth');
const {dateScalar} = require('./customTypes/customDate.js');

const resolvers = {
    Date: dateScalar,
    Query: {
        //this function should not be called
        //user should only get their own data (me)
        users: async() => 
        { 
            return User.find().populate('lists');
        },
        //this function should not be called
        //user should only get their own data (me)
        user:  async(parent, {userId}) =>
        {
            return User.findOne({_id:userId});
        },
        me: async(parent,args,context) =>
        {
            if(context.user) {
                return User.findOne({_id:userId});
            }
            throw new AuthenticationError('You need to be logged in')
        },
        lists: async(parent, {id}) =>
        {
            const params = id ? {id} : {};
            return List.find(params).populate({path: 'tasks'});
        },
        tasks: async(parent, {id}) =>
        {
            const params = id ? {id} : {};
            return Task.find(params);
        }

    },
    Mutation: {
        addList: async(parent, {email, listTitle,taskRefreshDay }) =>
        {
            const list = await List.create({listTitle, taskRefreshDay});
            await User.findOneAndUpdate({email: email}, 
            {$addToSet: {lists: list._id}});
            return list;
        },
        addTask: async (parent,{id, taskTitle, taskDescription, dueDate}) =>
        {
            const task = await Task.create({title: taskTitle, description: taskDescription, dueDate: dueDate});
            await List.findOneAndUpdate({id}, {$addToSet: {tasks: task._id}});
            return task;
        }
    }
    
};

module.exports = resolvers;