# Production Calendar

[![codecov](https://codecov.io/gh/timmson/prod-cal/branch/master/graph/badge.svg)](https://codecov.io/gh/timmson/prod-cal)
[![codacy](https://api.codacy.com/project/badge/Grade/c513099cc1ec4e849c123705ab04b369)](https://app.codacy.com/gh/timmson/prod-cal)
[![version](https://img.shields.io/npm/v/prod-cal.svg)](https://www.npmjs.com/package/prod-cal)
[![license](https://img.shields.io/npm/l/prod-cal.svg)](https://www.npmjs.com/package/prod-cal)

[..::Live demo::..](https://timmson.github.io/prod-cal-ui/)

## Installation
```bash
npm i prod-cal
```

## Usage

### Production Calendar

```js
const Calendar = require("prod-cal")

//'ru' - locale
let calendar = new Calendar("ru")

//Will print 'holiday'
console.log(calendar.getDay(2019, 1, 27))
console.log(calendar.getDate(new Date("2019-01-27")))

//Will print 'work'
console.log(calendar.getDay(2019, 1, 28))
console.log(calendar.getDate(new Date("2019-01-28")))

//Will print 'work_reduced'
console.log(calendar.getDay(2019, 2, 22))
console.log(calendar.getDate(new Date("2019-22-22")))

//Will print '20'
console.log(calendar.getMonth(2019, 2).filter(d => d.indexOf("work") >= 0).length)

//Will print '248'
console.log(calendar.getYear(2020).map(m => m.filter(d => d.indexOf("work") >= 0).length).reduce((a, c) => a + c, 0))
```

### Timesheet Builder

```js
const TimesheetBuilder = require("prod-cal").TimesheetBuilder

//'ru' - locale
let timesheetBuilder = new TimesheetBuilder("ru")

//Will print '{days: 21, hours: 167}'
const timesheet = timesheetBuilder.build(new Date("2023-11-1"), new Date("2023-11-30"), [])
console.log(timesheet.summary)

//Will print '{days: 64, hours: 511}'
const actual = timesheetBuilder.build(new Date("2023-9-18"), new Date("2023-12-15"), [])
console.log(timesheet.summary)

//Will print '{days: 16, hours: 127}'
const timesheet = timesheetBuilder.build(new Date("2023-11-1"), new Date("2023-11-30"), [
	{date: new Date(2023, 11-1, 20), hours: 0},
	{date: new Date(2023, 11-1, 21), hours: 0},
	{date: new Date(2023, 11-1, 22), hours: 0},
	{date: new Date(2023, 11-1, 23), hours: 0},
	{date: new Date(2023, 11-1, 24), hours: 0}
])
console.log(timesheet.summary)
```
