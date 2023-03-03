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
            return User.find().populate({path: 'lists', populate: {path: 'tasks'}});
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
        addUser: async(parent, {email, username, password}) => 
        {
            const user = await User.create({email, username, password});
            return user;
        },
        addList: async(parent, {email, listTitle,taskRefreshDay }) =>
        {
            const list = await List.create({listTitle, taskRefreshDay});
            await User.findOneAndUpdate({email: email}, 
            {$addToSet: {lists: list._id}});
            return list;
        },
        addTask: async (parent,{ listId, taskTitle, taskDescription, dueDate}) =>
        {
            const task = await Task.create({title: taskTitle, description: taskDescription, dueDate: dueDate});
             await List.findOneAndUpdate({_id: listId}, {$addToSet: {tasks: task._id}});
            return task;
        },
        updateUser: async (parent, {email, username, password}) =>
        {
            const user = await User.findOne({email});
            const newUser = await User.findOneAndUpdate({email: email},
                {...user,
                    username: username ? username : user.username,
                    password: password ? password : user.password
                }
            );
            return newUser;
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
        },
        updateList: async (parent, {id, listTitle, taskRefreshDay}) =>
        {
            const list = await List.findOne({id});
            const newList = await List.findByIdAndUpdate({id: id},
                {...list,
                    listTitle: listTitle ? listTitle : list.listTitle,
                    taskRefreshDay: taskRefreshDay ? taskRefreshDay : list.taskRefreshDay
                }
            );
            return newList;
        },
    },
    
    
};

module.exports = resolvers;