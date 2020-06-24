import React from 'react'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';

import MoocherPage from "./components/page";
import {Home} from "./components/home";
import {BalanceOperations} from "./components/money";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/page/:name" component={MoocherPage}/>
                <Route path="/balance" component={BalanceOperations} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}
