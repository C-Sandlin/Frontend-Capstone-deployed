import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import { NavLink } from 'react-router-dom'
import logo from '../../logo.svg'
import secondaryLogo from '../../secondaryLogo-07.svg'
import index from "../../index.css"
import { stack as Menu } from 'react-burger-menu'

import { IconContext } from "react-icons";
import { FiUser, FiSearch, FiBarChart2, FiSun, FiShield, FiCornerDownLeft, FiBookOpen } from "react-icons/fi";
import { logout } from '../login/LoginHandler'


let topNavStyles = {
    backgroundColor: '#D1E8E0',
};



export default class TopNav extends React.Component {



    render() {


        return (
            <IconContext.Provider value={{ size: "1em" }}>
                <Navbar style={topNavStyles} light sticky="top">
                    <NavbarBrand href="/" className="mr-auto"><img src={logo} className="App-logo" alt="logo" /></NavbarBrand>
                </Navbar>
                <Menu left noOverlay disableAutoFocus>
                    <div>
                        <img src={secondaryLogo} className="secondaryLogo" alt="logo" />
                    </div>
                    <div className="prof-pic-container">
                        <img src={(this.props.user.profPic) ? (this.props.user.profPic) : ("http://petmedmd.com/images/user-profile.png")} className="prof-pic" alt="prof-pic" ></img>
                        <p>{this.props.user.username}</p>
                    </div>
                    <NavLink to="/regulate/new" className="menuItem" activeClassName="currentLink" onClick={this.props.resetState}><FiSun style={{ marginRight: "10px", marginBottom: "5px" }} />Check in</NavLink>
                    <NavLink to="/entries" className="menuItem" activeClassName="currentLink"><FiBookOpen style={{ marginRight: "10px", marginBottom: "5px" }} />Logged Checkins</NavLink>
                    <NavLink to="/coping" className="menuItem" activeClassName="currentLink"><FiShield style={{ marginRight: "10px", marginBottom: "5px" }} />My Toolbox</NavLink>
                    <NavLink to="/stats" className="menuItem" activeClassName="currentLink"><FiBarChart2 style={{ marginRight: "10px", marginBottom: "5px" }} />Statistics</NavLink>
                    <NavLink to="/support" className="menuItem" activeClassName="currentLink"><FiSearch style={{ marginRight: "10px", marginBottom: "5px" }} />Support</NavLink>
                    {/* <NavLink to="/profile" className="menuItem" activeClassName="currentLink"><FiUser style={{ marginRight: "10px", marginBottom: "5px" }} />User Profile</NavLink> */}
                    <NavLink to="/login" onClick={logout} className="menuItem" activeClassName="currentLink"><FiCornerDownLeft style={{ marginRight: "10px", marginBottom: "5px" }} />Logout</NavLink>
                </Menu>
            </IconContext.Provider >
        );
    }
}

