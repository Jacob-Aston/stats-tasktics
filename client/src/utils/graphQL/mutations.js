//code referenced from 21-MERN\01-Activities\24-Stu_Decode-JWT

import { gql } from '@apollo/client';

/**
 * this mutation takes the email and password to login to the users account
 * this returns all the data associated with the user including lists and associated tasks
 */
export const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      password
      username
      lists {
        _id
        listTitle
        taskRefreshDay
        tasks {
          _id
          title
          description
          dueDate
          startTime
          finishTime
          completed
        }
      }
    }
  }
}`

  
 /**
  * this mutation creates a user and returns the username
  * _id and email for that user.
  * it will not return the lists or tasks 
  * as it is assumed that there are none that exist yet
  */
export const CREATE_USER = gql`
mutation Mutation($email: String!, $username: String!, $password: String!) {
addUser(email: $email, username: $username, password: $password) {
    _id
    email
    username
  }
}`

  /**
   * this mutation creates a list with the specified title and refresh day, adds it to the user with the specified email associated with their account (assumed to be the current user)
  */
  export const CREATE_LIST = gql`
  mutation Mutation($email: String!, $listTitle: String!, $taskRefreshDay: String!) {
  addList(email: $email, listTitle: $listTitle, taskRefreshDay: $taskRefreshDay) {
      _id
      listTitle
      taskRefreshDay
    }
  }`

  /**
   * this mutation creates a task under the given listId. the list requires a title, and due date to be created. optionally a description can also be provided.
   * Start and end times will not be added during creation of a task
   */
  export const CREATE_TASK = gql`
  mutation Mutation($listId: ID!, $taskTitle: String!, $dueDate: String!, $taskDescription: String) {
  addTask(listId: $listId, taskTitle: $taskTitle, dueDate: $dueDate, taskDescription: $taskDescription) {
    _id
    title
    description
    dueDate
    startTime
    finishTime
    completed
    }
  }`

  /**
   * this mutation takes the email associated with the user and optionally takes the username and password to update
   * either of those or both.
   */
  export const UPDATE_USER = gql`
  mutation Mutation($email: String!, $username: String, $password: String) {
  updateUser(email: $email, username: $username, password: $password) {
      _id
      email
      password
      username
    }
  }`;


/**
 * this mutation takes the list id and updates the list associated with that id with the provided
 * title, or refresh day
 * 
 * returns the _id and the new title and taskRefreshDay
 */
  export const UPDATE_lIST = gql`
  mutation Mutation($updateListId: ID!, $listTitle: String, $taskRefreshDay: String) {
  updateList(id: $updateListId, listTitle: $listTitle, taskRefreshDay: $taskRefreshDay) {
      _id
      listTitle
      taskRefreshDay
    }
  }`;


  /**
   * this mutation takes a task id, filters for that specific task, and updates the title, description, duedate, startTime and/or endTime
   */
  export const UPDATE_TASK = gql`
  mutation Mutation($taskId: ID!, $taskTitle: String, $taskDescription: String, $dueDate: String, $startTime: Date, $finishTime: Date) {
  updateTask(taskId: $taskId, taskTitle: $taskTitle, taskDescription: $taskDescription, dueDate: $dueDate, startTime: $startTime, finishTime: $finishTime) {
    _id
    title
    description
    dueDate
    startTime
    finishTime
    completed
    }
  }`;


  export const COMPLETE_TASK = gql`
  mutation Mutation($taskId: ID!) {
    completeTask(taskId: $taskId) {
      _id
      title
      description
      dueDate
      startTime
      finishTime
      completed
    }
  }
  `;

