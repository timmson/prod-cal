const Calendar = require("../index.js");

function countWorkDays(m) {
	return m.filter(isWork).length;
}

function isWork(d) {
	return d.indexOf("work") >= 0;
}

let calendar = new Calendar("ru");

test("Calendar gets unknown locale and test should throw error", () => {
	expect(() => new Calendar("ru1")).toThrow();
});

describe("Calendar gets day", () => {

	test("as 29-01-2019 and test should return work day", () => {
		let dayType = calendar.getCalendar(2019, 1, 28);

		expect(dayType).toEqual(Calendar.DAY_WORK);
	});

	test("as 25-08-2019 and test should return holiday", () => {
		let dayType = calendar.getCalendar(2019, 8, 25);

		expect(dayType).toEqual(Calendar.DAY_HOLIDAY);
	});

	test("as 22-02-2019 and test should return reduced workday", () => {
		let dayType = calendar.getCalendar(2019, 2, 22);

		expect(dayType).toEqual(Calendar.DAY_WORK_REDUCED);
	});

});

describe("Calendar gets month as", () => {

	test("Feb.2019 should return 20 work days", () => {
		let workingDays = calendar.getCalendar(2019, 2).filter(isWork).length;

		expect(workingDays).toEqual(20);
	});

});


describe("Calendar gets year as", () => {

	test("2019 and test should return 247 work days", () => {
		let workingDays = calendar.getCalendar(2019).map(countWorkDays).reduce((a, c) => a + c, 0);

		expect(workingDays).toEqual(247);
	});

	test("null and test should throw error", () => {
		expect(() => calendar.getCalendar(null)).toThrow();
	});

});