const Calendar = require("../dist/index.js")

function countWorkDays(m) {
	return m.filter(isWork).length
}

function isWork(d) {
	return d.indexOf("work") >= 0
}

const calendar = new Calendar("ru")

test("Calendar gets unknown locale and test should throw error", () => {
	expect(() => new Calendar("ru1")).toThrow()
})

describe("Calendar gets day", () => {

	test("as 29-01-2019 and test should return work day", () => {
		expect(calendar.getDay(2019, 1, 28)).toEqual(Calendar.DAY_WORK)
		expect(calendar.getDate(new Date("2019-01-28"))).toEqual(Calendar.DAY_WORK)
	})

	test("as 25-08-2019 and test should return holiday", () => {
		expect(calendar.getDay(2019, 8, 25)).toEqual(Calendar.DAY_HOLIDAY)
		expect(calendar.getDate(new Date("2019-08-25"))).toEqual(Calendar.DAY_HOLIDAY)
	})

	test("as 22-02-2019 and test should return reduced workday", () => {
		expect(calendar.getDay(2019, 2, 22)).toEqual(Calendar.DAY_WORK_REDUCED)
		expect(calendar.getDate(new Date("2019-02-22"))).toEqual(Calendar.DAY_WORK_REDUCED)
	})

	test("null and test should throw error", () => {
		expect(() => calendar.getDay(2019, 2, null)).toThrow()
	})

})

describe("Calendar gets month as", () => {

	test("Feb.2019 should return 20 work days", () => {
		const workingDays = calendar.getMonth(2019, 2).filter(isWork).length
		expect(workingDays).toEqual(20)
	})

	test("null and test should throw error", () => {
		expect(() => calendar.getMonth(2019, null)).toThrow()
	})

	test("null and test should throw error", () => {
		expect(() => calendar.getMonth(null, 2)).toThrow()
	})

})


describe("Calendar gets year as", () => {

	test("2019 and test should return 247 work days", () => {
		const workingDays = calendar.getYear(2019).map(countWorkDays).reduce((a, c) => a + c, 0)
		expect(workingDays).toEqual(247)
	})

	test("null and test should throw error", () => {
		expect(() => calendar.getYear(null)).toThrow()
	})

})