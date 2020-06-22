import React, {useEffect, useState} from 'react'


const MoocherPage = (props) => {
        const [page, setPage] = useState({name: "Не найден", bio: ''})

        let url = '/api/page/' + props.match.params.name

        useEffect(() => {
            fetch(url, { method: 'GET', headers: [] })
                .then(data => data.json())
                .then(page => setPage(page))
                .catch(err => console.log('fetch error'))
        }, [])

        return (
            <div className="shadow p-3 mb-5 bg-white rounded">
                <h2 className="lead">{page.name}</h2>
                <br />
                <p className="text-break">{page.bio}</p>
            </div>
        )
}

export default MoocherPage
