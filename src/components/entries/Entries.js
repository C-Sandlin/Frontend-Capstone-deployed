import React, { Component } from "react";
import EntryCss from "./EntryCss.css"
import moment from "moment";
import { FiClock, FiCalendar } from "react-icons/fi";
import { MdBrightness1 } from "react-icons/md"



export default class Entries extends Component {

    formatDate = (dateLogged) => {
        let month = moment(dateLogged).format("MMMM Do YYYY");
        return month
    }

    formatTime = (dateLogged) => {
        let time = moment(dateLogged).format("hh:mm A");
        return time
    }

    render() {
        return (
            <div className="entries-container">
                {
                    this.props.allEntries.map(entry => {
                        return (
                            <div key={entry.id} className="entry-overall-container">
                                <div className="entry-info-container">
                                    <div className="entry-entry-container">
                                        <p className="entry-mood">{entry.selectedMood}</p>
                                        <p className="entry-text">"{entry.description}"</p>
                                    </div>
                                </div>
                                <div className="entry-date-container">
                                    <p className="entry-mood-category"><MdBrightness1 style={(entry.moodCategoryId === 5) ? ({ color: '#E4E4E4', margin: '5px', marginBottom: '8px' }) : (entry.moodCategoryId === 4) ? ({ color: '#BADED2', margin: '5px', marginBottom: '8px' }) : (entry.moodCategoryId === 3) ? ({ color: '#F4D28E', margin: '5px', marginBottom: '8px' }) : (entry.moodCategoryId === 2) ? ({ color: '#ECAEA3', margin: '5px', marginBottom: '8px' }) : (entry.moodCategoryId === 1) ? ({ color: '#D3524E', margin: '5px', marginBottom: '8px' }) : ("")} /> Mood Category: {
                                        (entry.moodCategoryId === 5) ? ("Great") : (entry.moodCategoryId === 4) ? ("Good") : (entry.moodCategoryId === 3) ? ("Neutral") : (entry.moodCategoryId === 2) ? ("Not Great") : (entry.moodCategoryId === 1) ? ("Bad") : ("")
                                    }</p>
                                    <p className="entry-date-day"><FiCalendar style={{ margin: '5px', marginBottom: '8px' }} />{this.formatDate(entry.dateLogged)}</p>
                                    <p className="entry-date-time"><FiClock style={{ margin: '5px', marginBottom: '8px' }} />{this.formatTime(entry.dateLogged)}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}