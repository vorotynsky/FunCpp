import {useCallback, useEffect, useState} from 'react'
import {useHttp} from "./http.hook"

const STORAGE = 'moocherauth'

export const useToken = () => {
    const [token, setToken] = useState(null)
    const {request} = useHttp()

    const login = (token) => {
        setToken(token)
        localStorage.setItem(STORAGE, JSON.stringify(token))
    }
    const logout = () => {
        setToken(null)
        localStorage.removeItem(STORAGE)
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem(STORAGE))
        if (token) {
            request('/auth/jwt/refresh', 'POST', {'refresh': token.refresh})
                .then(data => login(data))
                .catch(() => logout())
        }

    }, [request])

    return { login, logout, token }
}

export const useAuth = (token) => {
    const [me, setMe] = useState({username: null, email:null, id:null})
    const http = useHttp().request

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        headers['Authorization'] = 'Bearer ' + token.access
        return await http(url, method, body, headers)
    }, [http, token])

    request('/auth/users/me/')
        .then(data => setMe(data))
        .catch(e => console.log(e))

    return { request, me }
}
