import {useCallback, useState} from "react";

export const useHttp = () => {
    const [load, setLoad] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoad(true)
        let data = null
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const res = await fetch(url, {method, body, headers})
            data = await res.json()

            if (!res.ok)
                throw new Error("Request error")

            setLoad(false)
        } catch (e) {
            throw e
        }
        return data;
    }, [])

    return { request, load }
}