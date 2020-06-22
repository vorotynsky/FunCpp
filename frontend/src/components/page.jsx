import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";

const MoocherPage = (props) => {
        const [page, setPage] = useState({name: "Не найден", bio: ''})
        const {request} = useHttp()

        useEffect(() => {
            request('/api/page/' + props.match.params.name)
                .then(page => setPage(page))
                .catch(() => console.log('fetch error'))
        }, [request, props])

        return (
            <div className="shadow p-3 mb-5 bg-white rounded">
                <h2 className="lead">{page.name}</h2>
                <br />
                <p className="text-break">{page.bio}</p>
            </div>
        )
}

export default MoocherPage
