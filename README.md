# prod-cal
Production Calendar

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