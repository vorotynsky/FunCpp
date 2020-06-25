import React from 'react'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';

import MoocherPage from "./components/page";
import {Home} from "./components/home";
import {BalanceOperations} from "./components/money";
import {Donation} from "./components/donate";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/page/:name" component={MoocherPage}/>
                <Route path="/balance" component={BalanceOperations} />
                <Route path="/donation/:id" component={Donation} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}
