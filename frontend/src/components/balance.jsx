import React, {useContext, useEffect, useState} from "react";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/auth";

export const Balance = () => {
    const auth = useContext(AuthContext)
    const {request} = useAuth(auth.token)
    const [balance, setState] = useState({balance: 0})

    useEffect(() => {
        request('/api/money/balance')
            .then(balance => setState(balance))
            .catch(() => setState({balance: 0}))
    }, [request])

    return (
        <div>
            <a href="/balance">
                баланс: { balance.balance }
            </a>
        </div>
    )
}

