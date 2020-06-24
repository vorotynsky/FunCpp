import React, { Component } from 'react';
import {Logout} from "./auth";
import {Balance} from "./balance";

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar sticky-top navbar-light bg-light">
                <a className="navbar-brand" href="/">Moocher Alerts</a>
                <Balance />
                <Logout />
            </nav>
        )
    }
}

export default NavBar;
