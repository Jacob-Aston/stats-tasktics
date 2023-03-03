const {gql} = require('apollo-server-express');


const typeDefs = gql`
    scalar Date

    type User {
        _id: ID
        username: String
        email: String
        password: String
        lists: [List]
    }

    type List {
        _id: ID
        listTitle: String
        taskRefreshDay: String
        tasks: [Task]
    }

    type Task {
        _id: ID
        title: String
        description: String
        dueDate: String
        startTime: Date
        finishTime: Date
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        me: User
        lists: [List]
        tasks: [Task]
    }
    type Mutation {
        addList(email: String!, listTitle: String!, taskRefreshDay: String!): List

        addTask(listId: ID!, taskTitle: String! taskDescription: String, dueDate: String!, startTime: Date, finishTime: Date): Task

        updateTask(taskId: ID! , taskTitle: String ,taskDescription: String, dueDate: String, startTime: Date, finishTime: Date): Task
    }
`

module.exports =  typeDefs;