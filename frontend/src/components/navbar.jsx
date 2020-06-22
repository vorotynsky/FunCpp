import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar sticky-top navbar-light bg-light">
                <a className="navbar-brand" href="/">Moocher Alerts</a>
            </nav>
        )
    }
}

export default NavBar;
