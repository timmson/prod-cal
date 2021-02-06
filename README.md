# Production Calendar

[![codecov](https://codecov.io/gh/timmson/prod-cal/branch/master/graph/badge.svg)](https://codecov.io/gh/timmson/prod-cal)
[![codacy](https://api.codacy.com/project/badge/Grade/c513099cc1ec4e849c123705ab04b369)](https://www.codacy.com/app/timmson666/prod-cal)
[![version](https://img.shields.io/npm/v/prod-cal.svg)](https://www.npmjs.com/package/prod-cal)
[![license](https://img.shields.io/npm/l/prod-cal.svg)](https://www.npmjs.com/package/prod-cal)

[..::Live demo::..](https://timmson.github.io/prod-cal/)

## Installation
```bash
npm i prod-cal
```

## Usage

```js
const Calendar = require("prod-cal");

//"ru" - locale
let calendar = new Calendar("ru");

//Will print "holiday"
console.log(calendar.getCalendar(2019, 1, 27));
console.log(calendar.getCalendar(new Date("2019-01-27")));

//Will print "work"
console.log(calendar.getCalendar(2019, 1, 28));
console.log(calendar.getCalendar(new Date("2019-01-28")));

//Will print "work_reduced"
console.log(calendar.getCalendar(2019, 2, 22));
console.log(calendar.getCalendar(new Date("2019-22-22")));

//Will print "20"
console.log(calendar.getCalendar(2019, 2).filter(d => d.indexOf("work") >= 0).length);

//Will print "248"
console.log(calendar.getCalendar(2020).map(m => m.filter(d => d.indexOf("work") >= 0).length).reduce((a, c) => a + c, 0));
```
