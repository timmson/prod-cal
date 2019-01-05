let cal = undefined;

function Calendar(locale) {
    cal = require("./calendars/" + (locale ? locale : "ru") + ".js");
}

Calendar.prototype.getDay = function (year, month, day) {
    let dayType = this.DAY_WORK;
    if (cal[year.toString()] !== undefined && cal[year.toString()][month - 1] !== undefined) {
        const monthArray = cal[year.toString()][month - 1];
        dayType = monthArray.includes(day.toString()) ? this.DAY_HOLIDAY : dayType;
        dayType = monthArray.includes(day + "*") ? this.DAY_WORK_REDUCED : dayType;
    }
    return dayType;
};

Calendar.prototype.getMonth = function (year, month) {
    return Array.apply(null, {length: new Date(year, month, 0).getDate()}).map(Number.call, Number).map(d => this.getDay(year, month, d + 1));
};

Calendar.prototype.getYear = function (year) {
    return Array.apply(null, {length: 12}).map(Number.call, Number).map(m => this.getMonth(year, m + 1));
};

Calendar.prototype.DAY_WORK = "work";
Calendar.prototype.DAY_WORK_REDUCED = "work_reduced";
Calendar.prototype.DAY_HOLIDAY = "holiday";

module.exports = Calendar;
