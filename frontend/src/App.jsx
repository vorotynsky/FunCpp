import React from 'react';

import NavBar from './components/navbar'
import {AppRouter} from "./router";
import {AuthContext} from "./context/auth";
import {useToken} from "./hooks/auth.hook";

export const App = () => {
    const {token, login, logout} = useToken()

    return (
       <AuthContext.Provider value={{ token, login, logout }}>
           <NavBar />
           <div className="mx-auto my-3" style={{width: "80%"}}>
               <AppRouter />
           </div>
       </AuthContext.Provider>
   )
}

export default App;
