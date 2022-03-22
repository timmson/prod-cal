"use strict";
const calendar_ru_1 = require("./calendar.ru");
const getSequencedArray = (length, startFrom = 0) => Array.from(Array(length).keys()).map((i) => i + startFrom);
class Calendar {
    constructor(locale) {
        if (locale && locale !== "ru") {
            throw new Error("Locales differ from RU is not supported yet");
        }
    }
    getDate(date) {
        return this.getDay(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
    getDay(year, month, day) {
        if (!year || !month || !day) {
            throw new Error("Year, Month and Day must be not null");
        }
        let dayType = Calendar.DAY_WORK;
        if (calendar_ru_1.default[year.toString()] !== undefined && calendar_ru_1.default[year.toString()][month - 1] !== undefined) {
            const monthArray = calendar_ru_1.default[year.toString()][month - 1];
            dayType = monthArray.includes(day.toString()) ? Calendar.DAY_HOLIDAY : dayType;
            dayType = monthArray.includes(day + "*") ? Calendar.DAY_WORK_REDUCED : dayType;
        }
        return dayType;
    }
    getMonth(year, month) {
        if (!year || !month) {
            throw new Error("Year and Month must be not null");
        }
        return getSequencedArray(new Date(year, month, 0).getDate(), 1).map(day => this.getDay(year, month, day));
    }
    getYear(year) {
        if (!year) {
            throw new Error("Year must be not null");
        }
        return getSequencedArray(12, 1).map(month => this.getMonth(year, month));
    }
}
Calendar.DAY_WORK = "work";
Calendar.DAY_HOLIDAY = "holiday";
Calendar.DAY_WORK_REDUCED = "work_reduced";
module.exports = Calendar;
