//the number of milliseconds in a day
import {weekday} from './weekday';

const DAY_MS = (1000 * 60 * 60 * 24);

/**
 * 
 * @returns the sunday at midnight the current week started on
 */
export default function getThisSunday() {
    const currentDay = new Date();
    currentDay.setHours(0,0,0);
    let currentWeekDay = new Date(currentDay.getDay());
    //this is now sunday
    return currentDay - DAY_MS * currentWeekDay;
}

/**
 * this function takes a date and the sunday date of a specific week
 * and checks if the date is between the specified sunday and the 
 * next sunday
 * @param {*} date the current date
 * @param {*} sundayDate the specified sunday the date falls after
 * @returns 
 */
export default function isDateInWeek(date, sundayDate)
{
    const nextSunday = sundayDate + DAY_MS * 7;
    return date < nextSunday && date < sundayDate;
}

export default function isDateInCurrentWeek(date)
{
    return isDateInWeek(date, getThisSunday());
}

/**
 * 
 * @param {*} date 
 * @param {*} weekPrevious a number representing this week for 0, last week for 1 and so on.
 */
export default function isDateInLastWeek(date, weekPrevious){
    const thisSunday = getThisSunday();
    const TargetSunday = thisSunday - (DAY_MS * 7 * weekPrevious);
}

/**
 * this function returns the number of days betweeen two dates
 * assuming they are in the same week
 * @param {*} date1 
 * @param {*} date2 
 * @returns the number of days between the dates - means day 1 happens after day 2
 */
export default function dayDiffBetweenTwoDates(date1, date2)
{
    const time1 = new Date(date1).setHours(0,0,0);
    const time2 = new Date(date2).setHours(0,0,0);

    
    return new Date(time2).getDay() - new Date(time1).getDay();
}