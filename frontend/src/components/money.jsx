import React, {useContext, useState} from "react";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/auth";

const Money = (props) => {
    const [op, setOp] = useState({money: 0, type: props.optype})
    const auth = useContext(AuthContext)
    const {request} = useAuth(auth.token)

    const changeHandler = e => {
        if (e.target.name !== 'money')
            throw new Error('you can change only money.')
        setOp({type: props.optype, money: e.target.value})
    }

    const sendHandle = async () => {
        try {
            await request('/api/money/transaction/', 'POST', op)
        } catch (e) {
            console.log(e)
            alert('Ошибка')
        }
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor="money">{props.title}</label>
                <input type="number" className="form-control" name="money" aria-describedby="username" onChange={changeHandler}/>
            </div>
            <button type="submit" className="btn btn-primary mr-2" onClick={sendHandle}>Подтвердить</button>
        </div>
    )
}

export const BalanceOperations = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Money optype="W" title="Вывести деньги"/>
                </div>
                <div className="col">
                    <Money optype="P" title="Положить деньги" />
                </div>
            </div>
        </div>
    )
}
