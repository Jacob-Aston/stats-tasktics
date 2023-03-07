//code referenced from 21-MERN\01-Activities\24-Stu_Decode-JWT

import { gql } from '@apollo/client';


/*
The only query the client side needs is the me query since 
all lists and tasks the client SHOULD ever see are subdocuments 
of the me query.
*/
export const QUERY_ME = gql`
query Me {
    me {
        _id
        username
        email
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
  }`

  
//Is this even allowed???
export function queryMe(lists = false, tasks = false) {
    return gql`
query Me {
    me {
        _id
        username
        email
        ${lists ? `lists {
             _id
            listTitle
            taskRefreshDay
            ${lists && tasks ? `tasks {
                _id
                title
                description
                dueDate
                startTime
                finishTime
                completed
           }` : ``}
        }`: ``}
    }
  }

`};
