import React from "react";
import {Login} from "./auth";
import Donations from "./donationsHistory";

export const Home = () => {
    return (
        <div className = "p-3 mb-5 bg-white">
            <h1>Welcome to Moocher Alerts!</h1>
            <Login />
            <Donations />
        </div>
    )
}
