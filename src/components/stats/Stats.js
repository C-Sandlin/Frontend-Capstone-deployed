import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import Statscss from "./Statscss.css"
import moment from "moment"
import Carousel from 're-carousel'
import IndicatorDots from './indicator-dots'
import cardCss from '../coping/cardCss.css'




export default class Stats extends React.Component {

    assignData = () => {
        const lineInfo = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Average Mood',
                    fill: true,
                    data: this.props.lineData,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    showLine: true,
                }
            ],
        }
        return lineInfo
    }

    render() {
        return (
            <>
                <div className="overall-stats-container">
                    <div className="quick-hits-container">
                        <div className="quick-hit">
                            <h4 className="stat-number">{this.props.allEntries.length}</h4>
                            <p>Total Entries</p>
                        </div>
                        <div className="stats-divider"></div>
                        <div className="quick-hit">
                            <h4 className="stat-number">{this.props.weeksEntries.length}</h4>
                            <p>Entries this Week</p>
                        </div>
                        <div className="stats-divider"></div>
                        <div className="quick-hit">
                            <h4 className="stat-number">{this.props.monthsEntries.length}</h4>
                            <p>Entries this Month</p>
                        </div>
                    </div>

                </div >
                <div className="carousel-container" >
                    <Carousel widgets={[IndicatorDots]} showArrows={true} >
                        <article key={1} className="stats-card">
                            <h2>Breakdown of Check ins</h2>
                            <Doughnut data={this.props.donutData}
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
