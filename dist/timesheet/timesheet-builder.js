"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetBuilder = void 0;
const calendar_ru_1 = require("../calendar.ru");
const sequence_1 = require("../sequence");
const getWorkDaysByMonthAndYear = (firstDay, lastDay, month, year) => {
    const sequence = (0, sequence_1.getSequencedArray)(firstDay, lastDay - firstDay + 1).map((d) => {
        const m = calendar_ru_1.default[year.toString()][month - 1];
        if (m.includes(d.toString())) {
            return { date: d, hours: 0 };
        }
        if (m.includes(d.toString() + "*")) {
            return { date: d, hours: 7 };
        }
        else {
            return { date: d, hours: 8 };
        }
    });
    return Object.fromEntries(sequence.map(it => [it.date.toString(), it]));
};
const getMonth = (firstDay, lastDay, month, year, exceptions) => {
    const days = getWorkDaysByMonthAndYear(firstDay, lastDay, month, year);
    exceptions.forEach((e) => {
        days[e.date.getDate()] = { date: e.date.getDate(), hours: e.hours };
    });
    const daysAsArray = Object.values(days);
    return {
        days: daysAsArray,
        month: month,
        year: year,
        summary: getSummaryOfTheMonth(daysAsArray)
    };
};
const getSummaryOfTheMonth = (days) => days.reduce((acc, d) => ({ days: acc.days + (d.hours > 0 ? 1 : 0), hours: acc.hours + d.hours }), { days: 0, hours: 0 });
const getSummaryOfTheMonths = (months) => months.map((m) => m.summary)
    .reduce((acc, m) => ({ days: acc.days + m.days, hours: acc.hours + m.hours }), { days: 0, hours: 0 });
class TimesheetBuilder {
    constructor(locale) {
        if (locale && locale !== "ru") {
            throw new Error("Locales differed from RU are not supported yet");
        }
    }
    build(dateFrom, dateTill, exceptions) {
        const startMonth = dateFrom.getMonth() + 1 + dateFrom.getFullYear() * 12;
        const endMonth = dateTill.getMonth() + 1 + dateTill.getFullYear() * 12;
        const months = (0, sequence_1.getSequencedArray)(startMonth, endMonth - startMonth + 1).map((m) => {
            const year = Math.floor(m / 12) - ((m % 12 == 0) ? 1 : 0);
            const month = (m % 12 == 0) ? 12 : m % 12;
            const firstDay = (m === startMonth) ? dateFrom.getDate() : 1;
            const lastDay = (m === endMonth) ? dateTill.getDate() : new Date(year, month, 0).getDate();
            return getMonth(firstDay, lastDay, month, year, exceptions.filter((e) => (e.date.getFullYear() * 12 + e.date.getMonth() + 1) === m));
        });
        return {
            months: months,
            summary: getSummaryOfTheMonths(months)
        };
    }
}
exports.TimesheetBuilder = TimesheetBuilder;
