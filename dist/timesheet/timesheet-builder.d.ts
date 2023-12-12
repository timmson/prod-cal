import { Timesheet, TimesheetException } from "./types";
export declare class TimesheetBuilder {
    constructor(locale: string);
    build(dateFrom: Date, dateTill: Date, exceptions: Array<TimesheetException>): Timesheet;
}
