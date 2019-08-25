import * as cal from "./calendars/ru.js"

class Calendar {

    public static DAY_WORK = "work";
    public static DAY_HOLIDAY = "holiday";
    public static DAY_WORK_REDUCED = "work_reduced";

    constructor(locale?: string) {
        if (locale && locale !== "ru") {
            throw new Error("Locales differ from RU is not supported yet");
        }

    }

    public getCalendar(year: number, month?: number, day?: number) {
        if (!year) {
            throw new Error("Year must be not null");
        }

        if (month) {
            if (day) {
                let dayType = Calendar.DAY_WORK;
                if (cal[year.toString()] !== undefined && cal[year.toString()][month - 1] !== undefined) {
                    const monthArray = cal[year.toString()][month - 1];
                    dayType = monthArray.includes(day.toString()) ? Calendar.DAY_HOLIDAY : dayType;
                    dayType = monthArray.includes(day + "*") ? Calendar.DAY_WORK_REDUCED : dayType;
                }
                return dayType;
            }

            return Array.apply(null, {length: new Date(year, month, 0).getDate()}).map(Number.call, Number).map((d: number) => this.getCalendar(year, month, d + 1))
        }

        return Array.apply(null, {length: 12}).map(Number.call, Number).map((m: number) => this.getCalendar(year, m + 1));
    }
}

export default Calendar;