"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
const calendar_ru_1 = require("../calendar.ru");
const sequence_1 = require("../sequence");
class Calendar {
    constructor(locale) {
        if (locale && locale !== "ru") {
            throw new Error("Locales differed from RU are not supported yet");
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
        return (0, sequence_1.getSequencedArray)(1, new Date(year, month, 0).getDate()).map(day => this.getDay(year, month, day));
    }
    getYear(year) {
        if (!year) {
            throw new Error("Year must be not null");
        }
        return (0, sequence_1.getSequencedArray)(1, 12).map(month => this.getMonth(year, month));
    }
}
exports.Calendar = Calendar;
Calendar.DAY_WORK = "work";
Calendar.DAY_HOLIDAY = "holiday";
Calendar.DAY_WORK_REDUCED = "work_reduced";
