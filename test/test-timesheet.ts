import {TimesheetBuilder} from "../src/timesheet/timesheet-builder"

describe("Timesheet should ", () => {

	const timesheetBuilder = new TimesheetBuilder("ru")

	test("return valid timesheet for 2023-11-1 - 2023-11-30", () => {
		const actual = timesheetBuilder.build(new Date("2023-11-1"), new Date("2023-11-30"), [])

		expect(actual).toMatchSnapshot()
		expect(actual.summary).toEqual({days: 21, hours: 167})
	})


	test("return valid timesheet for 2023-9-18 - 2023-12-15", () => {
		const actual = timesheetBuilder.build(new Date("2023-9-18"), new Date("2023-12-15"), [])

		expect(actual).toMatchSnapshot()
		expect(actual.months[0].summary).toEqual({days: 10, hours: 80})
		expect(actual.months[1].summary).toEqual({days: 22, hours: 176})
		expect(actual.months[2].summary).toEqual({days: 21, hours: 167})
		expect(actual.months[3].summary).toEqual({days: 11, hours: 88})
		expect(actual.summary).toEqual({days: 64, hours: 511})
	})

	test("return valid timesheet for 2023-11-21 - 2024-1-22", () => {
		const actual = timesheetBuilder.build(new Date("2023-11-21"), new Date("2024-1-22"), [])

		expect(actual).toMatchSnapshot()
		expect(actual.months[0].summary).toEqual({days: 8, hours: 64})
		expect(actual.months[1].summary).toEqual({days: 21, hours: 168})
		expect(actual.months[2].summary).toEqual({days: 10, hours: 80})
		expect(actual.summary).toEqual({days: 39, hours: 312})
	})

	test("return valid timesheet for November 2023 with out of office for 20-24", () => {
		const actual = timesheetBuilder.build(new Date("2023-11-1"), new Date("2023-11-30"), [
			{date: 20, month: 11, year: 2023, hours: 0},
			{date: 21, month: 11, year: 2023, hours: 0},
			{date: 22, month: 11, year: 2023, hours: 0},
			{date: 23, month: 11, year: 2023, hours: 0},
			{date: 24, month: 11, year: 2023, hours: 0}
		])

		expect(actual).toMatchSnapshot()
		expect(actual.summary).toEqual({days: 16, hours: 127})
	})

})