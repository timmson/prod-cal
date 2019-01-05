const Calendar = require("./index.js");


module.exports = {
    setUp: function (callback) {
        this.calendar = new Calendar("ru");
        callback();
    },

    testDate: function (test) {
        test.equal(this.calendar.getDay(2019, 1, 28), this.calendar.DAY_WORK);
        test.equal(this.calendar.getDay(2019, 1, 27), this.calendar.DAY_HOLIDAY);
        test.equal(this.calendar.getDay(2019, 2, 22), this.calendar.DAY_WORK_REDUCED);
        test.done();
    },

    testMonth: function (test) {
        test.equal(20, this.calendar.getMonth(2019, 2).filter(isWork).length);
        test.done();
    },

    testYear: function (test) {
        test.equal(250, this.calendar.getYear(2020).map(countWorkDays).reduce((a, c) => a + c, 0));
        test.done();
    }
};

function countWorkDays(m) {
    return m.filter(isWork).length
}

function isWork(d) {
    return d.indexOf("work") >= 0
}