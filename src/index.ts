import cal from "./calendar.ru"

const getSequencedArray = (length: number, startFrom = 0): Array<number> =>
	Array.from(Array(length).keys()).map((i) => i + startFrom)

class Calendar {

	public static DAY_WORK = "work"
	public static DAY_HOLIDAY = "holiday"
	public static DAY_WORK_REDUCED = "work_reduced"

	constructor(locale: string) {
		if (locale && locale !== "ru") {
			throw new Error("Locales differ from RU is not supported yet")
		}
	}

	public getDate(date: Date): string {
		return this.getDay(date.getFullYear(), date.getMonth() + 1, date.getDate())
	}

	public getDay(year: number, month: number, day: number): string {
		if (!year || !month || !day) {
			throw new Error("Year, Month and Day must be not null")
		}
		let dayType = Calendar.DAY_WORK
		if (cal[year.toString()] !== undefined && cal[year.toString()][month - 1] !== undefined) {
			const monthArray = cal[year.toString()][month - 1]
			dayType = monthArray.includes(day.toString()) ? Calendar.DAY_HOLIDAY : dayType
			dayType = monthArray.includes(day + "*") ? Calendar.DAY_WORK_REDUCED : dayType
		}
		return dayType
	}

	public getMonth(year: number, month: number): string[] {
		if (!year || !month) {
			throw new Error("Year and Month must be not null")
		}
		return getSequencedArray(new Date(year, month, 0).getDate(), 1).map(day => this.getDay(year, month, day))
	}

	public getYear(year: number): string[][] {
		if (!year) {
			throw new Error("Year must be not null")
		}
		return getSequencedArray(12, 1).map(month => this.getMonth(year, month))
	}
}

export = Calendar