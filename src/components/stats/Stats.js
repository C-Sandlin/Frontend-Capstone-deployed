import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import Statscss from "./Statscss.css"
import moment from "moment"
import Carousel from 're-carousel'
import IndicatorDots from './indicator-dots'
import cardCss from '../coping/cardCss.css'
import API from "../db/API";




export default class Stats extends React.Component {

    state = {
        cat5Entries: [],
        cat4Entries: [],
        cat3Entries: [],
        cat2Entries: [],
        cat1Entries: [],
        allEntries: [],
        donutData: { data: { datasets: [], labels: [] } },
        lineData: [],
        weeksEntries: [],
        monthsEntries: [],

    }

    componentDidMount() {

        const newState = {
            cat5Entries: [],
            cat4Entries: [],
            cat3Entries: [],
            cat2Entries: [],
            cat1Entries: [],
            allEntries: [],
            donutData: { data: { datasets: [], labels: [] } },
            lineData: [],
            weeksEntries: [],
            monthsEntries: [],
        }
        let currentUser = this.props.user.id;

        // fetching entries from specific categories of moods and setting in state so the graphs can use the data
        API.getSpecificEntryCategory(5)
            .then(cat5 => newState.cat5Entries = cat5)
            .then(() => API.getSpecificEntryCategory(4))
            .then(cat4 => newState.cat4Entries = cat4)
            .then(() => API.getSpecificEntryCategory(3))
            .then(cat3 => newState.cat3Entries = cat3)
            .then(() => API.getSpecificEntryCategory(2))
            .then(cat2 => newState.cat2Entries = cat2)
            .then(() => API.getSpecificEntryCategory(1))
            .then(cat1 => newState.cat1Entries = cat1)
            .then(() => API.getAllEntries())
            .then(e => {
                const data = e
                return Object.keys(data).map(key => {
                    return { id: key, ...data[key] }
                })
            })
            .then(e => {
                let desiredResults = e.filter(item => item.userId === currentUser)
                return desiredResults;
            })
            .then(allentries => newState.allEntries = allentries)
            .then(() => this.setState(newState))
            .then(() => console.log(this.state.allEntries))

            // Create data necessary for the donut graph
            .then(() => this.getDonutData())
            .then(donutdata => this.setState({ donutData: donutdata }))
            // Calculate which entries were from this week
            .then(() => this.entriesThisWeek())
            .then(weeksentries => this.setState({ weeksEntries: weeksentries }))
            .then(() => this.entriesThisMonth())
            .then(monthsentries => this.setState({ monthsEntries: monthsentries }))
            .then(() => this.getLineData())
            .then(linedata => this.setState({ lineData: linedata }));
    }

    assignData = () => {
        const lineInfo = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Average Mood',
                    fill: true,
                    data: this.state.lineData,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    showLine: true,
                }
            ],
        }
        return lineInfo;
    }

    getDonutData = () => {
        if (this.state.cat5Entries) {
            let donutdata = {
                labels: ['Great', 'Good', 'Neutral', 'Not Great', 'Bad'],
                datasets: [{
                    data: [this.state.cat5Entries.length, this.state.cat4Entries.length, this.state.cat3Entries.length, this.state.cat2Entries.length, this.state.cat1Entries.length],
                    backgroundColor: ['#8FC6BB', '#BADED2', '#F4D28E', '#E8C5C1', '#DB968D']
                }]
            }

            return donutdata;
        }
    }

    entriesThisWeek = () => {
        let weeksEntries = [];
        const today = moment(new Date());
        const from_date = moment().startOf('week');
        const to_date = moment().endOf('week');

        console.log(`"entries this week:" ${this.state.weeksEntries}`)

        this.state.allEntries.map(entry => {
            if (moment(entry.dateLogged).isBetween(from_date, to_date)) {
                return weeksEntries.push(today)
            }
            return weeksEntries;
        })
    }

    entriesThisMonth = () => {
        let monthsEntries = [];
        const today = moment(new Date());
        const from_date = moment().startOf('month');
        const to_date = moment().endOf('month');


        this.state.allEntries.map(entry => {
            if (moment(entry.dateLogged).isBetween(from_date, to_date)) {
                return monthsEntries.push(today)
            }
            return monthsEntries;
        })
    }

    getLineData = () => {

        let group1Entries = [];
        let group2Entries = [];
        let group3Entries = [];
        let group4Entries = [];
        let group5Entries = [];
        let group6Entries = [];

        // use moment to find dates between other dates
        const from_date1 = moment().month(0).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
        const to_date1 = moment(from_date1).endOf('month');
        const from_date2 = moment().month(1).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
        const to_date2 = moment(from_date2).endOf('month');
        const from_date3 = moment().month(2).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
        const to_date3 = moment(from_date3).endOf('month');
        const from_date4 = moment().month(3).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
        const to_date4 = moment(from_date4).endOf('month');
        const from_date5 = moment().month(4).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
        const to_date5 = moment(from_date5).endOf('month');
        const from_date6 = moment().month(5).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
        const to_date6 = moment(from_date6).endOf('month');

        if (this.state.allEntries) {
            // for each entry, sort into array for the particular month
            this.state.allEntries.map(entry => {
                if (moment(entry.dateLogged).isBetween(from_date1, to_date1)) {
                    group1Entries.push(entry.moodCategoryId)
                } else if (moment(entry.dateLogged).isBetween(from_date2, to_date2)) {
                    group2Entries.push(entry.moodCategoryId)
                } else if (moment(entry.dateLogged).isBetween(from_date3, to_date3)) {
                    group3Entries.push(entry.moodCategoryId)
                } else if (moment(entry.dateLogged).isBetween(from_date4, to_date4)) {
                    group4Entries.push(entry.moodCategoryId)
                } else if (moment(entry.dateLogged).isBetween(from_date5, to_date5)) {
                    group5Entries.push(entry.moodCategoryId)
                } else if (moment(entry.dateLogged).isBetween(from_date6, to_date6)) {
                    group6Entries.push(entry.moodCategoryId)
                }
            })


            // add up values in each month's array
            let group1value = group1Entries.reduce((a, b) => a + b, 0)
            let group2value = group2Entries.reduce((a, b) => a + b, group1value)
            let group3value = group3Entries.reduce((a, b) => a + b, group2value)
            let group4value = group4Entries.reduce((a, b) => a + b, group3value)
            let group5value = group5Entries.reduce((a, b) => a + b, group4value)
            let group6value = group6Entries.reduce((a, b) => a + b, group5value)

            // find value for the month data point by taking total sum of moodCategoryId and dividing by total entries so far
            let janLog = (group1value / (group1Entries.length));
            let febLog = (group2value / (group1Entries.length + group2Entries.length));
            let marLog = (group3value / (group1Entries.length + group2Entries.length + group3Entries.length))
            let aprLog = (group4value / (group1Entries.length + group2Entries.length + group3Entries.length + group4Entries.length))
            let mayLog = (group5value / (group1Entries.length + group2Entries.length + group3Entries.length + group4Entries.length + group5Entries.length))
            let junLog = (group6value / (group1Entries.length + group2Entries.length + group3Entries.length + group4Entries.length + group5Entries.length + group6Entries.length))

            const linedata = [janLog, febLog, marLog, aprLog, mayLog, junLog]

            return linedata;
        }
    }



    render() {
        return (
            <>
                <div className="overall-stats-container">
                    <div className="quick-hits-container">
                        <div className="quick-hit">
                            <h4 className="stat-number">{(this.state.allEntries !== undefined) ? (this.state.allEntries.length) : (0)}</h4>
                            <p>Total Entries</p>
                        </div>
                        <div className="stats-divider"></div>
                        <div className="quick-hit">
                            <h4 className="stat-number">{(this.state.weeksEntries !== undefined) ? (this.state.weeksEntries.length) : (0)}</h4>
                            <p>Entries this Week</p>
                        </div>
                        <div className="stats-divider"></div>
                        <div className="quick-hit">
                            <h4 className="stat-number">{(this.state.monthsEntries !== undefined) ? (this.state.monthsEntries.length) : (0)}</h4>
                            <p>Entries this Month</p>
                        </div>
                    </div>

                </div >
                <div className="carousel-container" >
                    <Carousel widgets={[IndicatorDots]} showArrows={true} >
                        <article key={1} className="stats-card">
                            <h2>Breakdown of Check ins</h2>
                            <Doughnut data={this.state.donutData}
                                id="donut-chart"
                                height={275}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    legend: {
                                        display: false,
                                    },
                                    elements: {
                                        arc: {
                                            borderWidth: 0
                                        }
                                    },
                                    tooltips: {
                                        titleFontSize: 30,
                                        bodyFontSize: 30
                                    }
                                }} />
                        </article>
                        <article key={2} className="stats-card">
                            <h2>Average Mood (last 6 months)</h2>
                            <Line
                                className="linegraph"
                                data={this.assignData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    legend: {
                                        display: false,
                                        labels: {
                                            fontColor: 'black'
                                        }
                                    },
                                    scales: {
                                        xAxes: [{
                                            ticks: {
                                                display: true,
                                                fontFamily: 'Roboto Condensed'
                                            },
                                            gridLines: {
                                                display: false,
                                                drawBorder: true
                                            }
                                        }],
                                        yAxes: [{
                                            ticks: {
                                                display: true,
                                                callback: function (label) {
                                                    switch (label) {
                                                        case 1:
                                                            return 'Bad';
                                                        case 2:
                                                            return 'Not Great';
                                                        case 3:
                                                            return 'Neutral';
                                                        case 4:
                                                            return 'Good';
                                                        case 5:
                                                            return 'Great';
                                                    }
                                                },
                                                max: 5,
                                                min: 1,
                                                stepSize: 1,
                                                fontFamily: 'Roboto Condensed'
                                            },
                                            gridLines: {
                                                display: false,
                                                drawBorder: true
                                            }
                                        }]
                                    },
                                    title: {
                                        display: false,
                                        text: "Average Mood [Past 6 Months]"
                                    },

                                }} />
                        </article>
                    </Carousel>
                </div>

            </>
        );
    }
}
