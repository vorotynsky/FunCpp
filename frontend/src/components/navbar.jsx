import React, {Component, useContext} from 'react';
import {Logout} from "./auth";
import {Balance} from "./balance";
import {AuthContext} from "../context/auth";

const NavBar = () => {
    const auth = useContext(AuthContext)
    const isAuth = !!auth.token

    return (
        <nav className="navbar sticky-top navbar-light bg-light">
            <a className="navbar-brand" href="/">Moocher Alerts</a>
            { isAuth && <Balance /> }
            { isAuth && <Logout /> }
        </nav>
    )
}

export default NavBar;
