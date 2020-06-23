import { createContext } from 'react'

let nothing = () => { }

export const AuthContext = createContext({
    token: null,
    login: nothing,
    logout: nothing,
})
