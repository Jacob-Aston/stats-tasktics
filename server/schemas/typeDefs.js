const { gql } = require('apollo-server-express');


/*
Type defs are used by the graph ql client and define what queries the cliend is allowed to make    type User {
        _id: ID <-- required id of type ID 
        username: String <-- the user name property in the user model (its a string) 
        the : seperates type from name
        email: String
        password: String
        lists: [List] <-- our custom type that is defined under the user type, cant use this without defining it in the typedef
    }

*/
const typeDefs = gql`
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
        task: [Task]
    }

    type Task {
        _id: ID
        title: String
    }




    type Query {
        users: [User]
        user(userId: ID!): User
        me: User
        lists: [List]
    }
    type Mutation {
        addList(email: String!, listTitle: String!, taskRefreshDay: String!): List
    }
`

module.exports =  typeDefs;