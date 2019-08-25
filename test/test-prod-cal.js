const Calendar = require("../index.js").default;
const {expect} = require("chai");

function countWorkDays(m) {
    return m.filter(isWork).length;
}

function isWork(d) {
    return d.indexOf("work") >= 0;
}

describe("Calendar", () => {
    let calendar = new Calendar("ru");

    describe("gets year as", () => {

        it("29-01-2019 and it should return work day", () => {
            let dayType = calendar.getCalendar(2019, 1, 28);
            expect(dayType).to.equal(Calendar.DAY_WORK);
        });

        it("25-08-2019 and it should return holiday", () => {
            let dayType = calendar.getCalendar(2019, 8, 25);
            expect(dayType).to.equal(Calendar.DAY_HOLIDAY);
        });

        it("22-02-2019 and it should return reduced workday", () => {
            let dayType = calendar.getCalendar(2019, 2, 22);
            expect(dayType).to.equal(Calendar.DAY_WORK_REDUCED);
        });
    });

    describe("gets month as", () => {
        it("Feb.2019 should return 20 work days", () => {
            let workingDays = calendar.getCalendar(2019, 2).filter(isWork).length;
            expect(workingDays).to.equal(20);
        });
    });

    describe("gets year as", () => {
        it("2019 and it should return 247 work days", () => {
            let workingDays = calendar.getCalendar(2019).map(countWorkDays).reduce((a, c) => a + c, 0);
            expect(workingDays).to.equal(247);
        });
    });

    it("null and it should throw error", () => {
        try {
            let dayType = calendar.getCalendar(null);
            expect.fail("Error did not threw");
        } catch (e) {

        }
    });
});

describe("Calendar gets ", () => {
    it("unknown locale and it should throw error", () => {
        try {
            new Calendar("ru1");
            expect.fail("Error did not threw");
        } catch (e) {

        }
    });
});