import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/auth";
import {useHttp} from "../hooks/http.hook";

export const Login = () => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [data, form] = useState({username: '', password: ''})

    const loginHandler = async () => {
        try {
            const token = await request('/auth/jwt/create/', 'POST', {...data})
            auth.login(token)
        } catch(e) {
            alert('Ошибка входа в систему')
            console.log(e)
        }
    }

    const registerHandler = async () => {
        try {
            await request('/auth/users/', 'POST', {...data})
        } catch (e) {
            alert('Ошибка в регистарции')
           console.log(e)
        }
    }

    const changeHandler = e => {
        form({...data, [e.target.name]: e.target.value})
    }

    if (!!auth.token)
        return <p className="h5">Привет!</p>

    return (
        <div>
            <div className="form-group">
                <label htmlFor="username">Login</label>
                <input type="text" className="form-control" name="username" aria-describedby="username" onChange={changeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" onChange={changeHandler} />
            </div>
            <button type="submit" className="btn btn-primary mr-2" onClick={registerHandler}>Зарегестрироваться</button>
            <button type="submit" className="btn btn-outline-primary ml-2" onClick={loginHandler}>Войти</button>
        </div>
    )
}


export const Logout = () =>  {
    const auth = useContext(AuthContext);
    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
    }

    if (!auth.token)
        return <div />
    else return (
        <a type="button" className="btn btn-light" href="/" onClick={logoutHandler}>Выйти</a>
    )
}
