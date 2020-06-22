import {useCallback} from "react";

export const useHttp = () => {
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }
        const res = await fetch(url, {method, body, headers})
        const data = await res.json()

        if(!res.ok)
            throw new Error("Request error")

        return data;
    }, [])

    return { request }
}