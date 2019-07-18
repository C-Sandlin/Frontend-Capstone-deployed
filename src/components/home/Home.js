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
import { getUserFromLocalStorage, logout } from '../login/LoginHandler';
import API from "../db/API";
import moment from "moment";
import { serviceId, userId, accessToken, templateId } from "../db/hiddenKey"



class Home extends Component {
    state = {
        user: getUserFromLocalStorage(),
        moodCategoryId: "",
        copingLabel: "Select a mood category for this coping mechanism",
        addTitle: "",
        addUrl: "",
        addInfo: "",
        addInfo2: "",
        addCopingMoodCategoryId: "",
        label: "I'm feeling...",
    }

    //ComponentDidMount - for when you want something to happen as soon as the DOM is rendered, and not before.
    componentDidMount() {
        const newState = {
            user: getUserFromLocalStorage(),
            moodCategoryId: "",
            selectedMood: "",
            description: "",
            label: "I'm feeling...",
            dropdownOpen: false,
            loader: false,
            check: false,
            copingLabel: "Select a mood category for this coping mechanism",
            addTitle: "",
            addUrl: "",
            addInfo: "",
            addInfo2: "",
            addCopingMoodCategoryId: "",
        }

    }

    // All other functions to be passed down

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

            //
            // .then(() => this.checkLast5Entries())

            // after the animation ends, redirect to coping mechanisms
            .then(() => setTimeout(() => this.props.history.push('/coping'), 3200))
    }

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






    render() {
        return (
            <>
                <Route exact path="/" render={(props) => <Login {...props} onLogin={(user) => this.setState({ user: user })} />} />
                <Route path="/register" render={(props) => <Register {...props} onRegister={(user) => this.setState({ user: user })} />} />
                <Route exact path="/regulate" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Regulate {...props} {...this.props} user={this.state.user} onLogout={logout} resetState={this.resetState} />
                        </>)
                        : (<Redirect to="/" />)
                }} />
                <Route exact path="/regulate/new" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <NewRegulate
                                {...props}
                                {...this.props}
                                user={this.state.user}
                                logNewEntry={this.logNewEntry}
                                select={this.select}
                                toggleDropdown={this.toggleDropdown}
                                dropdownOpen={this.state.dropdownOpen}
                                label={this.state.label}
                                description={this.state.description}
                                moodCategoryId={this.state.moodCategoryId}
                                changeDesc={this.changeDesc}
                                loader={this.state.loader}
                                check={this.state.check}
                                newUserLoginNavigateToEntries={this.newUserLoginNavigateToEntries}
                            />
                        </>)
                        : (<Redirect to="/" />)
                }} />
                <Route exact path="/entries" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Entries
                                {...props}
                                user={this.state.user}
                                onLogout={logout}
                            />
                        </>)
                        : (<Redirect to="/" />)
                }} />
                <Route exact path="/coping" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Coping
                                {...props}
                                {...this.props}
                                user={this.state.user}
                                addTitle={this.state.addTitle}
                                addUrl={this.state.addUrl}
                                addInfo={this.state.addInfo}
                                addInfo2={this.state.addInfo2}
                                moodCategoryId={this.state.moodCategoryId}
                                onLogout={logout}
                                toggleDropdown={this.toggleDropdown}
                                dropdownOpen={this.state.dropdownOpen}
                                handleFieldChange={this.handleFieldChange}
                                toggleExpansion={this.toggleExpansion}
                                selectMoodCat={this.selectMoodCat}
                                editSelectMoodCat={this.editSelectMoodCat}
                                copingLabel={this.state.copingLabel}
                                editModal={this.state.editModal}
                                showAllCards={this.showAllCards}

                            />
                        </>)
                        : (<Redirect to="/" />)
                }} />
                <Route exact path="/stats" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Stats {...props}
                                user={this.state.user}
                                onLogout={logout}
                            />
                        </>)
                        : (<Redirect to="/" />)
                }} />
                <Route exact path="/support" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <FindHelp
                                {...props}
                                user={this.state.user}
                                onLogout={logout}
                            />
                        </>)
                        : (<Redirect to="/" />)
                }} />
                <Route exact path="/profile" render={(props) => {
                    return this.state.user ? (
                        <>
                            <TopNav resetState={this.resetState} user={this.state.user} />
                            <Profile {...props} user={this.state.user} onLogout={logout} />
                        </>)
                        : (<Redirect to="/" />)
                }} />
            </>
        );
    }
}
export default withRouter(Home);