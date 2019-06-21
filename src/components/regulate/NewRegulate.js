import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconContext } from "react-icons";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { TiSocialTwitter } from "react-icons/ti"
import Regulatecss from "./Regulate.css"
import checkin from "../../checkin-15.svg"




class NewRegulate extends Component {

    state = {
        moods: [],
        description: ""
    }

    getTimestamp = () => {
        const date = new Date()
        const date2 = date.toLocaleDateString()
        const timestamp = date.toLocaleTimeString()
        return `{date2}  at  {timestamp}`
    }

    render() {
        const username = this.props.user.username;

        return (

            <>
                <div className="main-container">
                    <img id="checkin-logo" src={checkin} alt="regulate-logo"></img>
                    <Dropdown isOpen={this.props.dropdownOpen} toggle={this.props.toggleDropdown} className="dropdown-container" style={{ marginTop: '20vh' }} >
                        <DropdownToggle className="regulate-dropdown" style={{ display: 'flex', color: "#4F6D74", flexDirection: 'row', backgroundColor: 'transparent', padding: '10px', width: '30vw', justifySelf: 'center', margin: 'auto', marginTop: '30px', border: '1px solid #4F6D74' }}>
                            <div className="button-container">
                                <div style={{ justifySelf: 'flex-start' }}>
                                    <p id="dropdown-lable">{this.props.label}</p>
                                </div>
                                <IconContext.Provider value={{ size: "2.2em" }}>
                                    <FiChevronDown style={{ color: "#2A404A", marginLeft: '20px' }} />
                                </IconContext.Provider>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu
                            className="dropdown-actual"
                            id="dropdown-menu"
                            right={true}
                            modifiers={{
                                setMaxHeight: { enabled: true, order: 890, fn: (data) => { return { ...data, styles: { ...data.styles, overflow: 'auto', maxHeight: 300 }, }; }, },
                            }}>
                            <DropdownItem header>Great</DropdownItem>
                            {
                                (this.props.greatMoods) ? (this.props.greatMoods.map(mood => {
                                    return <DropdownItem key={`${mood.id}--${mood.moodCategoryId}`} onClick={(e) => this.props.select(e, 5)} className="dropdown-item">{mood.name} </DropdownItem>
                                })) : null
                            }
                            <DropdownItem divider style={{ borderColor: '#466E75' }} />
                            <DropdownItem header>Good</DropdownItem>
                            {
                                (this.props.goodMoods) ? (this.props.goodMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={(e) => this.props.select(e, 4)}>{mood.name}</DropdownItem>
                                })) : null
                            }
                            <DropdownItem divider style={{ borderColor: '#466E75' }} />
                            <DropdownItem header>Neutral</DropdownItem>
                            {
                                (this.props.okayMoods) ? (this.props.okayMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={(e) => this.props.select(e, 3)} >{mood.name}</DropdownItem>
                                })) : null
                            }
                            <DropdownItem divider style={{ borderColor: '#466E75' }} />
                            <DropdownItem header>Not Great</DropdownItem>
                            {
                                (this.props.notSoGreatMoods) ? (this.props.notSoGreatMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={(e) => this.props.select(e, 2)} >{mood.name}</DropdownItem>
                                })) : null
                            }
                            <DropdownItem divider style={{ borderColor: '#466E75' }} />
                            <DropdownItem header>Bad</DropdownItem>
                            {
                                (this.props.badMoods) ? (this.props.badMoods.map(mood => {
                                    return <DropdownItem key={mood.id} onClick={(e) => this.props.select(e, 1)} >{mood.name}</DropdownItem>
                                })) : null
                            }
                        </DropdownMenu>
                    </Dropdown>

                    <input className="colin-input" type="text" placeholder="Notes - try to keep it shorter than a tweet" onChange={(e) => this.props.changeDesc(e)}></input>
                    <div className="main">
                        <button style={{ outline: 0 }} className="button" id="newreg-btn" onClick={this.props.logNewEntry} >Submit</button>
                        <div className={["loader", (this.props.loader ? "active" : '')].join(' ')} onAnimationEnd={() => this.setState({ check: true })}>
                            <div className={["check", (this.state.check ? "active" : '')].join(' ')}>
                                <FiCheck className="check-one" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewRegulate