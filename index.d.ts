declare class Calendar {
    static DAY_WORK: string;
    static DAY_HOLIDAY: string;
    static DAY_WORK_REDUCED: string;
    constructor(locale: string);
    getCalendar(year: Date | number, month?: number, day?: number): string | any;
}
export = Calendar;
