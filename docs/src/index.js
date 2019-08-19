import "bootstrap";
import "./index.scss";

import Calendar from "../../index.js";

import Vue from "vue"
import Moment from "moment";

let app = new Vue({
    el: '#app',
    data: {
        currentYear: parseInt(Moment().format("YYYY")),
        calendar: new Calendar("ru"),
        selectedYear: {},
        year: {}
    },
    methods: {
        buildCalendar: function () {
            this.year = this.calendar.getYear(this.selectedYear).map((m, index) => {
                    let momentMonth = Moment([this.selectedYear, index]);
                    let month = {
                        name: momentMonth.format("MMMM"),
                        weeks: [],
                    };
                    let monthStartsWith = momentMonth.clone().startOf("month").format("d") - 1;
                    for (let i = 0; i < 6; i++) {
                        let week = [];
                        for (let j = 0; j < 7; j++) {
                            let cDay = i * 7 + j - monthStartsWith;
                            if (cDay >= 0 && cDay < m.length) {
                                week[j] = {
                                    date: cDay + 1,
                                    type: m[cDay]
                                }
                            } else {
                                if (cDay < 0) {
                                    week[j] = {
                                        date: momentMonth.clone().startOf("month").add(cDay, "d").format("D"),
                                        type: "inactive"
                                    }
                                } else {
                                    week[j] = {
                                        date: momentMonth.clone().endOf("month").add(cDay - m.length + 1, "d").format("D"),
                                        type: "inactive"
                                    }
                                }
                            }
                        }
                        month.weeks[i] = week;
                    }
                    return month;
                }
            );
            console.log(this.year);
        }
    },
    created() {
        this.selectedYear = this.currentYear;
    },
    mounted() {
        this.buildCalendar();
    }
});