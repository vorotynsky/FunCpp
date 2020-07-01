import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth";
import {useAuth} from "../hooks/auth.hook";

export const Donation = (props) => {
    const {request} = useHttp()
    const [donation, setDonation] = useState(
        {name: "Не найден", transaction: {money: "Ой"}, message: "Увы и ах!"})

    useEffect(() => {
        request('/api/money/donation/' + props.match.params.id)
            .then(data => setDonation(data))
            .catch(() => { alert('Ошибка') })
    }, [props, request])

    console.log(donation)

    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <h2 className="lead">
                {donation.name}
                <span className="badge badge-info ml-2">{donation.transaction.money}</span>
            </h2>
            <br />
            <p className="text-break">{donation.message}</p>
       </div>
    )
}

export const Donate = (props) => {
    const [donation, setDonation] = useState({moocher: props.moocher, name:"", money:0, message:""})
    const auth = useContext(AuthContext)
    const {request} = useAuth(auth.token)

    const changeHandler = e => {
        setDonation({...donation, [e.target.name]: e.target.value})
    }

    const donateHandler = async () => {
        try {
            donation.moocher = props.moocher
            await request('/api/money/donate/', 'POST', donation)
        } catch (e) {
            console.log(e)
            alert('Ошибка')
        }
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor="name">Псевдоним</label>
                <input type="text" className="form-control" name="name" aria-describedby="name" onChange={changeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="money">Сумма</label>
                <input type="money" className="form-control" name="money" onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="message">Сообщение</label>
                <input type="message" className="form-control" name="message" onChange={changeHandler} />
            </div>
            <button type="submit" className="btn btn-primary mr-2" onClick={donateHandler}>Отправить</button>
        </div>
    )
}
