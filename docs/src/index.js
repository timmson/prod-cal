import "bootstrap";
import "./index.scss";

import Calendar from "../../index";

import URL from "url";
import QueryString from "querystring";
import Vue from "vue"
import Moment from "moment";

let url = URL.parse(window.location.href);
let params = QueryString.parse(url.query);

let request = {
    year: params["year"] || parseInt(Moment().format("YYYY"))
}

let app = new Vue({
    el: '#app',
    data: {
        currentYear: request.year,
        request: request,
        calendar: new Calendar("ru"),
        year: {}
    },
    methods: {
        buildCalendar: function () {
            this.year = this.calendar.getCalendar(this.request.year).map((m, index) => {
                    let momentMonth = Moment([this.request.year, index]);
                    let month = {
                        name: momentMonth.format("MMMM"),
                        working: {
                            days: m.filter(d => d !== "holiday").length,
                            hours: m.filter(d => d !== "holiday").reduce((last, d) => last += (d === "work_reduced" ? 7 : 8), 0)
                        },
                        weeks: [],
                    };
                    let monthStartsWith = momentMonth.clone().startOf("month").format("d") - 1;
                    for (let i = 0; i < 6; i++) {
                        let days = [];
                        month.weeks[i] = {
                            number: momentMonth.clone().startOf("month").add(i * 7  - monthStartsWith, "d").week()
                        };
                        for (let j = 0; j < 7; j++) {
                            let cDay = i * 7 + j - monthStartsWith;
                            if (cDay >= 0 && cDay < m.length) {
                                days[j] = {
                                    date: cDay + 1,
                                    type: m[cDay]
                                }
                            } else {
                                if (cDay < 0) {
                                    days[j] = {
                                        date: momentMonth.clone().startOf("month").add(cDay, "d").format("D"),
                                        type: "inactive"
                                    }
                                } else {
                                    days[j] = {
                                        date: momentMonth.clone().endOf("month").add(cDay - m.length + 1, "d").format("D"),
                                        type: "inactive"
                                    }
                                }
                            }
                        }
                        month.weeks[i].days = days;
                    }
                    return month;
                }
            );
            window.history.replaceState({}, "Production Calendar", "?" + QueryString.stringify(this.request));
        }
    },
    mounted() {
        this.buildCalendar();
    }
});