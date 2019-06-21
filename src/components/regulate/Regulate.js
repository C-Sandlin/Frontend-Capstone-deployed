import React, { Component } from "react";
import logo from "../../logo.svg"
import Regulatecss from "./Regulate.css"
import { TiSocialTwitter } from "react-icons/ti"
import { Modal, ModalBody } from 'reactstrap';


export default class Regulate extends Component {

    state = {
        modal: false,
    }



    newRegulateEntry = () => {
        this.props.resetState();
        this.props.history.push('/regulate/new')
    }



    render() {
        const username = this.props.user.username;
        return (
            <>
                <div className="main-regulate-container">
                    <img id="home-logo" src={logo} alt="regulate-logo"></img>
                    {/* <p className="home-tagline">help you, be you.</p> */}
                    <button className="button" onClick={this.newRegulateEntry}>Check in.</button>
                </div>
            </>
        )
    }
}
