import React from 'react'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';

import MoocherPage from "./components/page";

const Home = () => (
    <div className = "p-3 mb-5 bg-white">
        <h1>Home page</h1>
    </div>)

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/page/:name" component={MoocherPage}/>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}
