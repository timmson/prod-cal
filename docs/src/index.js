import "bootstrap";
import "./index.scss";

import Calendar from "../../index.js";

import Vue from "vue"

let app = new Vue({
    el: '#app',
    data: {
        currentYear: parseInt(new Date().getFullYear().toString()),
        calendar: new Calendar("ru"),
        years: {}
    },
    methods: {},
    mounted() {
        [this.currentYear, this.currentYear + 1].forEach(y => this.$set(this.years, y, this.calendar.getYear(y)));
    },
    beforeUpdate() {

    }
});