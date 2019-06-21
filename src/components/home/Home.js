import React, { Component } from "react";
import { withRouter } from 'react-router'
import TopNav from '../nav/TopNav';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from '../login/Login';
import Register from '../login/Register';
import Regulate from '../regulate/Regulate'
import Coping from '../coping/Coping'
import Stats from '../stats/Stats'
import FindHelp from '../findhelp/FindHelp'
import Profile from '../profile/Profile'
import NewRegulate from '../regulate/NewRegulate'
import Entries from '../entries/Entries'
import { getUserFromLocalStorage, logout } from '../login/LoginHandler'
import API from "../db/API"
import moment from "moment";
import * as emailjs from "emailjs-com"
import { serviceId, userId, accessToken, templateId } from "../db/hiddenKey"


let greatArray;
const greatOpt = [];
const goodOpt = [];
const okayOpt = [];
const notSoGreatOpt = [];
const badOpt = [];



class Home extends Component {
    state = {
        user: getUserFromLocalStorage(),
        greatMoods: [],
        goodMoods: [],
        okayMoods: [],
        notSoGreatMoods: [],
        badMoods: [],
        moodOpts: [],
        allCopingMechs: [],
        greatCopingMechs: [],
        goodCopingMechs: [],
        okayCopingMechs: [],
        notSoGreatCopingMechs: [],
        badCopingMechs: [],
        addModal: false,
        copingLabel: "Select a mood category for this coping mechanism",
        addTitle: "",
        addUrl: "",
        addInfo: "",
        addInfo2: "",
        addCopingMoodCategoryId: "",
        allEntries: [],
        donutData: { data: { datasets: [], labels: [] } },
        weeksEntries: [],
        monthsEntries: [],
        lineData: [],
    }

    //ComponentDidMount - for when you want something to happen as soon as the DOM is rendered, and not before.
    componentDidMount() {
        const newState = {
            user: getUserFromLocalStorage(),
            greatMoods: [],
            goodMoods: [],
            okayMoods: [],
            notSoGreatMoods: [],
            badMoods: [],
            moodOpts: [],
            moodCategoryId: "",
            selectedMood: "",
            description: "",
            label: "I'm feeling...",
            dropdownOpen: false,
            loader: false,
            check: false,
            allCopingMechs: [],
            greatCopingMechs: [],
            goodCopingMechs: [],
            okayCopingMechs: [],
            notSoGreatCopingMechs: [],
            badCopingMechs: [],
            addModal: false,
            copingLabel: "Select a mood category for this coping mechanism",
            addTitle: "",
            addUrl: "",
            addInfo: "",
            addInfo2: "",
            addCopingMoodCategoryId: "",
            allEntries: [],
            locationResults: [],
            cat5Entries: [],
            cat4Entries: [],
            cat3Entries: [],
            cat2Entries: [],
            cat1Entries: [],
            donutData: { data: { datasets: [], labels: [] } },
            weeksEntries: [],
            monthsEntries: [],
            lineData: [],
        }


        //Fetch moods from local API by specifying which category to fetch. Then, put those returned promises into new state, and finally setting the state.
        API.getSpecificMood(5)
            .then(greatmoods => newState.greatMoods = greatmoods)
            .then(() => API.getSpecificMood(4))
            .then(goodmoods => newState.goodMoods = goodmoods)
            .then(() => API.getSpecificMood(3))
            .then(okaymoods => newState.okayMoods = okaymoods)
            .then(() => API.getSpecificMood(2))
            .then(notsogreatmoods => newState.notSoGreatMoods = notsogreatmoods)
            .then(() => API.getSpecificMood(1))
            .then(badmoods => newState.badMoods = badmoods)

            //Fetch coping mechs from local API. Put those returned promises into new state and set the state.
            .then(() => API.getSpecificCopingMech(5))
            .then(greatCopingMechs => newState.greatCopingMechs = greatCopingMechs)
            .then(() => API.getSpecificCopingMech(4))
            .then(goodCopingMechs => newState.goodCopingMechs = goodCopingMechs)
            .then(() => API.getSpecificCopingMech(3))
            .then(okayCopingMechs => newState.okayCopingMechs = okayCopingMechs)
            .then(() => API.getSpecificCopingMech(2))
            .then(notSoGreatCopingMechs => newState.notSoGreatCopingMechs = notSoGreatCopingMechs)
            .then(() => API.getSpecificCopingMech(1))
            .then(badCopingMechs => newState.badCopingMechs = badCopingMechs)

            //Fetch all coping mechs, put into state, and set state
            .then(() => API.getAllCopingMechs())
            .then(results => newState.allCopingMechs = results)

            //Fetch all entries, put into state, and set state
            .then(() => API.getAllEntries())
            .then(results => newState.allEntries = results)

            //Fetch locations from API, 
            .then(() => API.hereMaps())
            .then(results => newState.locationResults = results.results.items)

            //Fetch Logged Entries sorted by MoodCategoryId
            .then(() => API.getSpecificEntryCategory(5))
            .then(cat5 => newState.cat5Entries = cat5)
            .then(() => API.getSpecificEntryCategory(4))
            .then(cat4 => newState.cat4Entries = cat4)
            .then(() => API.getSpecificEntryCategory(3))
            .then(cat3 => newState.cat3Entries = cat3)
            .then(() => API.getSpecificEntryCategory(2))
            .then(cat2 => newState.cat2Entries = cat2)
            .then(() => API.getSpecificEntryCategory(1))
            .then(cat1 => newState.cat1Entries = cat1)

            .then(() => this.setState(newState))

            // Create data necessary for the donut graph
            .then(() => this.getDonutData())
            .then(() => this.entriesThisWeek())
            .then(() => this.entriesThisMonth())
            .then(() => this.getLineData())
    }

    // All other functions to be passed down
    toggleAddModal = () => {
        this.setState(prevState => ({
            addModal: !prevState.addModal
        }));
    }

    toggleExpansion = () => {
        this.setState({ showinfo: !this.state.showinfo })
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    selectMoodCat = (event, value) => {
        this.setState({
            copingLabel: event.target.innerText,
            addCopingMoodCategoryId: value
        })
    }

    changeDesc = (e) => {
        this.setState({ description: e.target.value })
    }

    showAllCards = () => {
        this.setState({ moodCategoryId: "" })
    }

    resetState = () => {
        const origState = {
            dateLogged: "",
            moodCategoryId: "",
            selectedMood: "",
            description: "",
            label: "I'm feeling...",
            loader: false,
            check: false,
        }
        this.setState(origState)
    }

    logNewEntry = () => {

        this.setState({ loader: true })

        let newEntryObj = {
            userId: this.state.user.id,
            dateLogged: moment(),
            moodCategoryId: this.state.moodCategoryId,
            selectedMood: this.state.selectedMood,
            description: this.state.description
        }

        API.submitEntry(newEntryObj)
            .then(() => API.getAllEntries())
            .then(results => this.setState({ allEntries: results }))
            // refetching entries from specific categories of moods and setting in state
            .then(() => API.getSpecificEntryCategory(5))
            .then(cat5 => this.setState({ cat5Entries: cat5 }))
            .then(() => API.getSpecificEntryCategory(4))
            .then(cat4 => this.setState({ cat4Entries: cat4 }))
            .then(() => API.getSpecificEntryCategory(3))
            .then(cat3 => this.setState({ cat3Entries: cat3 }))
            .then(() => API.getSpecificEntryCategory(2))
            .then(cat2 => this.setState({ cat2Entries: cat2 }))
            .then(() => API.getSpecificEntryCategory(1))
            .then(cat1 => this.setState({ cat1Entries: cat1 }))

            // Create data necessary for the donut graph
            .then(() => this.getDonutData())
            .then(() => this.entriesThisWeek())
            .then(() => this.entriesThisMonth())

            //
            .then(() => this.checkLast5Entries())

            // after the animation ends, redirect to coping mechanisms
            .then(() => setTimeout(() => this.props.history.push('/coping'), 3200))
    }

    checkLast5Entries = () => {
        API.getLast5Entries()
            .then(entries => {
                let last5Array = entries.filter(entry => entry.moodCategoryId <= 2)
                console.log(last5Array)
                return last5Array;
            })
            .then(last5Array => {
                if (last5Array.length === 5) {
                    let data = {
                        service_id: serviceId,
                        template_id: templateId,
                        user_id: userId,
                        template_params: {
                            'to_name': 'Shelby',
                            'from_name': 'Colin Sandlin'
                        }
                    }
                    API.sendEmail(data)
                } else {
                    console.log("youre good")
                }
            })
    }

    // serviceID, userID, accessToken, templateID

    select = (event, value) => {
        this.setState({
            label: event.target.innerText,
            selectedMood: event.target.innerText,
            moodCategoryId: value
        })
    }

    toggleDropdown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    submitNewCmEntry = (value) => {
        const newState = {
            allCopingMechs: [],
            addModal: false
        }
        const newObj = {
            userId: this.state.user.id,
            title: this.state.addTitle,
            url: this.state.addUrl,
            info: this.state.addInfo,
            info2: this.state.addInfo2,
            moodCategoryId: this.state.addCopingMoodCategoryId,
            score: 0
        }
        console.log("new entry", newObj)
        API.submitMech(newObj)
            .then(() => API.getAllCopingMechs())
            .then(copingMechs => newState.allCopingMechs = copingMechs)
            .then(() => this.setState(newState))

    }

    // Fetch and get all coping mechanisms to display on the All coping mechanisms page
    loadCms = () => {
        const newState = {
            allCopingMechs: []
        }
        API.getAllCopingMechs()
            .then(copingMechs => newState.allCopingMechs = copingMechs)
            .then(() => API.getSpecificCopingMech(5))
            .then(greatCopingMechs => newState.greatCopingMechs = greatCopingMechs)
            .then(() => API.getSpecificCopingMech(4))
            .then(goodCopingMechs => newState.goodCopingMechs = goodCopingMechs)
            .then(() => API.getSpecificCopingMech(3))
            .then(okayCopingMechs => newState.okayCopingMechs = okayCopingMechs)
            .then(() => API.getSpecificCopingMech(2))
            .then(notSoGreatCopingMechs => newState.notSoGreatCopingMechs = notSoGreatCopingMechs)
            .then(() => API.getSpecificCopingMech(1))
            .then(badCopingMechs => newState.badCopingMechs = badCopingMechs)
            .then(() => this.setState(newState))
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

            this.setState({ donutData: donutdata })
        }
    }

    entriesThisWeek = () => {
        let weeksEntries = [];
        const today = moment(new Date());
        const from_date = moment().startOf('week');
        const to_date = moment().endOf('week');

        this.state.allEntries.map(entry => {
            if (moment(entry.dateLogged).isBetween(from_date, to_date)) {
                weeksEntries.push(today)
            }
        })
        this.setState({ weeksEntries: weeksEntries })
    }

    entriesThisMonth = () => {
        let monthsEntries = [];
        const today = moment(new Date());
        const from_date = moment().startOf('month');
        const to_date = moment().endOf('month');

        this.state.allEntries.map(entry => {
            if (moment(entry.dateLogged).isBetween(from_date, to_date)) {
                monthsEntries.push(today)
            }
        })
        this.setState({ monthsEntries: monthsEntries })
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
            let group3value = group2Entries.reduce((a, b) => a + b, group2value)
            let group4value = group2Entries.reduce((a, b) => a + b, group3value)
            let group5value = group2Entries.reduce((a, b) => a + b, group4value)
            let group6value = group2Entries.reduce((a, b) => a + b, group5value)

            // find value for the month data point by taking total sum of moodCategoryId and dividing by total entries so far
            let janLog = (group1value / (group1Entries.length));
            let febLog = (group2value / (group1Entries.length + group2Entries.length));
            let marLog = (group3value / (group1Entries.length + group2Entries.length + group3Entries.length))
            let aprLog = (group4value / (group1Entries.length + group2Entries.length + group3Entries.length + group4Entries.length))
            let mayLog = (group5value / (group1Entries.length + group2Entries.length + group3Entries.length + group4Entries.length + group5Entries.length))
            let junLog = (group6value / (group1Entries.length + group2Entries.length + group3Entries.length + group4Entries.length + group5Entries.length + group6Entries.length))

            const linedata = [janLog, febLog, marLog, aprLog, mayLog, junLog]

            this.setState({ lineData: linedata })
        }
    }


    render() {
        return (
            <>
                <Route path="/login" render={(props) => <Login {...props} onLogin={(user) => this.setState({ user: user })} />} />
                <Route path="/register" render={(props) => <Register {...props} onRegister={(user) => this.setState({ user: user })} />} />
                <Route exact path="/regulate" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Regulate {...props} {...this.props} user={this.state.user} onLogout={logout} resetState={this.resetState} />
                        </>)
                        : (<Redirect to="/login" />)
                }} />
                <Route exact path="/regulate/new" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <NewRegulate
                                {...props}
                                {...this.props}
                                greatMoods={this.state.greatMoods}
                                goodMoods={this.state.goodMoods}
                                okayMoods={this.state.okayMoods}
                                notSoGreatMoods={this.state.notSoGreatMoods}
                                badMoods={this.state.badMoods}
                                user={this.state.user}
                                logNewEntry={this.logNewEntry}
                                select={this.select}
                                toggleDropdown={this.toggleDropdown}
                                dropdownOpen={this.state.dropdownOpen}
                                label={this.state.label}
                                description={this.state.description}
                                selectedMood={this.state.selectedMood}
                                moodCategoryId={this.state.moodCategoryId}
                                changeDesc={this.changeDesc}
                                loader={this.state.loader}
                                check={this.state.check}
                            />
                        </>)
                        : (<Redirect to="/login" />)
                }} />
                <Route exact path="/entries" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Entries
                                {...props}
                                user={this.state.user}
                                onLogout={logout}
                                allEntries={this.state.allEntries} />
                        </>)
                        : (<Redirect to="/login" />)
                }} />
                <Route exact path="/coping" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Coping
                                {...props}
                                {...this.props}
                                moodCategoryId={this.state.moodCategoryId}
                                onLogout={logout}
                                greatCopingMechs={this.state.greatCopingMechs}
                                goodCopingMechs={this.state.goodCopingMechs}
                                okayCopingMechs={this.state.okayCopingMechs}
                                notSoGreatCopingMechs={this.state.notSoGreatCopingMechs}
                                badCopingMechs={this.state.badCopingMechs}
                                selectedMood={this.state.selectedMood}
                                allCopingMechs={this.state.allCopingMechs}
                                toggleDropdown={this.toggleDropdown}
                                dropdownOpen={this.state.dropdownOpen}
                                handleFieldChange={this.handleFieldChange}
                                toggleAddModal={this.toggleAddModal}
                                toggleExpansion={this.toggleExpansion}
                                selectMoodCat={this.selectMoodCat}
                                editSelectMoodCat={this.editSelectMoodCat}
                                submitNewCmEntry={this.submitNewCmEntry}
                                copingLabel={this.state.copingLabel}
                                addModal={this.state.addModal}
                                editModal={this.state.editModal}
                                loadCms={this.loadCms}
                                showAllCards={this.showAllCards}

                            />
                        </>)
                        : (<Redirect to="/login" />)
                }} />
                <Route exact path="/stats" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Stats {...props}
                                user={this.state.user}
                                onLogout={logout}
                                allEntries={this.state.allEntries}
                                cat5Entries={this.state.cat5Entries}
                                cat4Entries={this.state.cat4Entries}
                                cat3Entries={this.state.cat3Entries}
                                cat2Entries={this.state.cat2Entries}
                                cat1Entries={this.state.cat1Entries}
                                donutData={this.state.donutData}
                                weeksEntries={this.state.weeksEntries}
                                monthsEntries={this.state.monthsEntries}
                                lineData={this.state.lineData}
                            />
                        </>)
                        : (<Redirect to="/login" />)
                }} />
                <Route exact path="/support" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <FindHelp
                                {...props}
                                user={this.state.user}
                                onLogout={logout}
                                locationResults={this.state.locationResults}
                            />
                        </>)
                        : (<Redirect to="/login" />)
                }} />
                <Route exact path="/profile" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Profile {...props} user={this.state.user} onLogout={logout} />
                        </>)
                        : (<Redirect to="/login" />)
                }} />
            </>
        );
    }
}
export default withRouter(Home);