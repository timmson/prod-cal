# Production Calendar

[![status](https://travis-ci.org/timmson/prod-cal.svg?branch=master)](https://travis-ci.org/angular/angular)
[![codecov](https://codecov.io/gh/timmson/prod-cal/branch/master/graph/badge.svg)](https://codecov.io/gh/timmson/prod-cal)
[![codacy](https://api.codacy.com/project/badge/Grade/a67746d04fb245e58817f2e3959d9501)](https://www.codacy.com/app/timmson666/prod-cal)
[![version](https://img.shields.io/npm/v/prod-cal.svg)](https://www.npmjs.com/package/prod-cal)
[![license](https://img.shields.io/npm/l/prod-cal.svg)](https://www.npmjs.com/package/prod-cal)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftimmson%2Fprod-cal.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftimmson%2Fprod-cal?ref=badge_shield)


## Installation
```bash
npm i prod-cal
```

## Usage

### Import
```js
const Calendar = require("prod-cal");

//"ru" - locale
let calendar = new Calendar("ru");
```

### Check day
```js
//Will print "holiday"
console.log(this.calendar.getDay(2019, 1, 27));

//Will print "work"
console.log(this.calendar.getDay(2019, 1, 28));

//Will print "work_reduced"
console.log(this.calendar.getDay(2019, 2, 22));
```


### Get working days in month
```js
//Will print "20"
console.log(calendar.getMonth(2019, 2).filter(d => d.indexOf("work") >= 0).length);
```


### Get working days in year
```js
//Will print "250"
console.log(calendar.getYear(2020).map(m => m.filter(d => d.indexOf("work") >= 0).length).reduce((a, c) => a + c, 0));
```