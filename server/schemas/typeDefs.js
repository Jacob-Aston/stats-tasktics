const { gql } = require('apollo-server-express');

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
        taskRefreshDay
        task
    }

    type Task {
        title
    }


    type Query {
        me: [User]
        lists(email: String): [List]
    }
`