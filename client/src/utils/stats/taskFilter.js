//this file takes a list and calculates the stats for that list

/**
 * 
 * this function takes a list of tasks and finds the unique 
 * titles and returns one item per task.title that is the most recent task
 * @param {*} taskList 
 */
export default function findCurrentTasks(taskList) {
    return [...new Set(taskList.map(t=>t.title))].map
    (
        n => taskList.filter
        ( 
            t =>t.title === n 
        ).reduce(
            (max, cur) => cur.createdAt > max.createdAt ? max : cur
        ) 
    );
    
}

/**
 * this function takes the task list with all of the tasks and a task title to return a sub list of tasks that are records for the same task
 * @param {*} taskList 
 * @param {string} taskTitle
 */
export default function getTaskHistory(taskList, taskTitle){
    return taskList.filter(task => task.title === taskTitle);
}

export default function getPercentageOnTimeTasks(taskHistory) {
    
}



