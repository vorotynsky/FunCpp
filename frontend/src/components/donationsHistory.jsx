import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth";
import {useAuth} from "../hooks/auth.hook";

const Donations = () => {
    const auth = useContext(AuthContext)
    const {request} = useAuth(auth.token)
    const [donations, setDonations] = useState([])

    useEffect(() => {
        request('/api/money/donate/')
            .then(data => setDonations(data))
            .catch(e => console.log(e))
    }, [request])

    const element = item => {
        return (
            <div className="row">
                <div className="col">
                    <p>{item.name}</p>
                </div>
                <div className="col">
                    <p>{item.message}</p>
                </div>
                <div className="col">
                    <p>{item.transaction.money}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            {donations.map((item, i) => element(item))}
        </div>
    )
}

export default Donations
