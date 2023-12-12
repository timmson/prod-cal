export declare class Calendar {
    static DAY_WORK: string;
    static DAY_HOLIDAY: string;
    static DAY_WORK_REDUCED: string;
    constructor(locale: string);
    getDate(date: Date): string;
    getDay(year: number, month: number, day: number): string;
    getMonth(year: number, month: number): string[];
    getYear(year: number): string[][];
}
