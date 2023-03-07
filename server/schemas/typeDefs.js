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
        completed: Boolean
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        me: User
        lists: [List]
        tasks: [Task]
    }
    
    type Mutation {
        addUser(email: String!, username: String!, password: String!): User

        login(email: String!, password: String!): Auth

        addList(email: String!, listTitle: String!, taskRefreshDay: String!): List

        addTask(listId: ID!, taskTitle: String! taskDescription: String, dueDate: String!, startTime: Date, finishTime: Date): Task
        
        updateUser(email: String!, username: String, password: String): User

        completeTask(taskId: ID!): Task

        updateTask(taskId: ID!, taskTitle: String, taskDescription: String, dueDate: String, startTime: Date, finishTime: Date): Task

        updateList(id: ID!, listTitle: String, taskRefreshDay: String): List

        removeTask(listId: ID!, taskId: ID!): Task

        removeList(listId: ID!): List
    }
`

module.exports =  typeDefs;