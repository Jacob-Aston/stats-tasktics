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
        addTask: async (parent,{id: listId, taskTitle, taskDescription, dueDate}) =>
        {
            const task = await Task.create({title: taskTitle, description: taskDescription, dueDate: dueDate});
            await List.findOneAndUpdate({id: listId}, {$addToSet: {tasks: task._id}});
            return task;
        },
        updateTask: async (parent, {id: taskId, title: taskTitle, description: taskDescription, dueDate: dueDate, startTime: startTime, finishTime: finishTime}) => 
        {
            const task = await Task.findOne({taskId});
            const newTask = await Task.findOneAndUpdate({taskId: task.id},
                {...task,
                    title: taskTitle ? taskTitle : task.title,
                    description: taskDescription ? taskDescription : task.description,
                    dueDate: dueDate ? dueDate : task.dueDate,
                    startTime: startTime ? startTime : task.startTime,
                    finishTime: finishTime ? finishTime : task.finishTime

                }, {new:true}
            );
            return newTask;
        }
    },
    
    
};

module.exports = resolvers;