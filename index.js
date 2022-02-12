const cal = require("./calendars/ru.js");

const getSequencedArray = (length, startFrom) =>
	Array.from(Array(length).keys()).map((i) => i + startFrom || 0);

class Calendar {

	constructor(locale) {
		if (locale && locale !== "ru") {
			throw new Error("Locales differ from RU is not supported yet");
		}

	}

	getCalendar(year, month, day) {
		if (!year) {
			throw new Error("Year must be not null");
		}

		if (year instanceof Date) {
			day = year.getDate();
			month = year.getMonth() + 1;
			year = year.getFullYear();
		}

		if (month) {
			if (day) {
				let dayType = Calendar.DAY_WORK;
				if (cal[year.toString()] !== undefined && cal[year.toString()][month - 1] !== undefined) {
					const monthArray = cal[year.toString()][month - 1];
					dayType = monthArray.includes(day.toString()) ? Calendar.DAY_HOLIDAY : dayType;
					dayType = monthArray.includes(day + "*") ? Calendar.DAY_WORK_REDUCED : dayType;
				}
				return dayType;
			}

			return getSequencedArray(new Date(year, month, 0).getDate(), 1).map(day => this.getCalendar(year, month, day));
		}

		return getSequencedArray(12, 1).map(month => this.getCalendar(year, month));
	}
}

Calendar.DAY_WORK = "work";
Calendar.DAY_HOLIDAY = "holiday";
Calendar.DAY_WORK_REDUCED = "work_reduced";

module.exports = Calendar;