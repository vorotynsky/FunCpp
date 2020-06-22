import React, { Component } from 'react';

import NavBar from './components/navbar'
import {AppRouter} from "./router";

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="mx-auto my-3" style={{width: "80%"}}>
                    <AppRouter />
                </div>
            </div>
        )
    }
}

export default App;
