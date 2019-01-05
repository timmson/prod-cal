const assert = require("assert");
const Calendar = require("../index.js");

function countWorkDays(m) {
    return m.filter(isWork).length;
}

function isWork(d) {
    return d.indexOf("work") >= 0;
}

describe("ProdCal", () => {
    let calendar = new Calendar("ru");
    
    describe("#getDay", ()=> {
        it("29-01-2019 should be work day", () => {
            assert.equal(calendar.getDay(2019, 1, 28), calendar.DAY_WORK);
        })

        it("25-08-2019 should be holiday", () => {
            assert.equal(calendar.getDay(2019, 8, 25), calendar.DAY_HOLIDAY);
        })

        it("22-02-2019 should be reduced working day", () => {
            assert.equal(calendar.getDay(2019, 2, 22), calendar.DAY_WORK_REDUCED);
        })
    });

    describe("#getMonth", ()=> {
        it("Feb.2019 should have 20 working days", () => {
            assert.equal(calendar.getMonth(2019, 2).filter(isWork).length, 20);
        })
    });

    describe("#getYear", ()=> {
        it("2020 year should have 250 working days", () => {
            assert.equal(calendar.getYear(2020).map(countWorkDays).reduce((a, c) => a + c, 0), 250);
        })
    });
});