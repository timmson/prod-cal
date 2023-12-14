export interface TimesheetException {
    date: Date;
    hours: number;
}
export interface TimesheetSummary {
    days: number;
    hours: number;
}
export interface TimesheetDay {
    date: number;
    hours: number;
}
export interface TimesheetMonth {
    year: number;
    month: number;
    days: Array<TimesheetDay>;
    summary?: TimesheetSummary;
}
export interface Timesheet {
    months: Array<TimesheetMonth>;
    summary?: TimesheetSummary;
}
