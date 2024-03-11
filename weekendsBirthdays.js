// The Challenge
// Given a list of friends, their dates of birth and the date of their conversation, work out who has had the most birthdays fall on a Saturday or Sunday up to and including the date of the conversation. If more than one friend shares that number of weekend birthdays, return the youngest. If the youngest shares their birthday with other friends, then any of the youngest will be accepted.

// When counting weekend days, don't include the day on which they were born - after all, they wouldn't have been familiar with the concept of a weekend right then! Friends born on 29th February celebrate their birthdays on 28th February in non-leap years.

// Here is the solution I chose from this challenge because I find it a bit easy to understand. This challenge is tricky because it involves a lot of date manipulation and comparison. The solution is not mine and I may not have come up with it on my own. I am just sharing it here for future reference.

const isLeapYear = (year) =>
    year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);

function getBirthdaysCount(strDateFrom, strDateTo) {
    let dateFrom = new Date(strDateFrom),
        dateTo = new Date(strDateTo),
        month = dateFrom.getMonth(),
        day = dateFrom.getDate(),
        count = 0;
    for (
        let year = dateFrom.getFullYear() + 1;
        year <= dateTo.getFullYear();
        year++
    ) {
        let bdate = new Date(
            year,
            month,
            month === 1 && day === 29 && !isLeapYear(year) ? 28 : day
        );
        if ((bdate.getDay() === 0 || bdate.getDay() === 6) && bdate <= dateTo)
            count++;
    }
    return count;
}

function mostWeekendBirthdays(friends, conversationDate) {
    return friends.sort(
        (a, b) =>
            getBirthdaysCount(b[1], conversationDate) -
                getBirthdaysCount(a[1], conversationDate) ||
            new Date(b[1]) - new Date(a[1])
    )[0][0];
}
