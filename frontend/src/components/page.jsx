import React, {createContext, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/auth";
import {Donate} from "./donate";

const MoocherPage = (props) => {
    const context = useContext(AuthContext)
    const {request, load, me} = useAuth(context.token)
    const http = useHttp().request

    const [page, setPage] = useState({name: "Не найден", bio: '', id: null})
    const url = '/api/page/' + props.match.params.name

    useEffect(() => {
        http(url)
            .then(page => setPage(page))
            .catch(() => console.log('fetch error'))
    }, [http, request, url, load])

    console.log(page)
    console.log(me)

    if (page.user === me.id){

        const changeHandler = (e) => {
            setPage({...page, [e.target.name]: e.target.value})
        }
        
        const editHandler = async () => {
            try {
                await request(url, 'POST', page)
            } catch (e) {
                console.log(e)
            }
        }

        return (
            <div>
                <div className="form-group">
                    <input type="text" className="form-control" name="name" aria-describedby="name"
                           onChange={changeHandler} value={page.name}/>
                </div>
                <div className="form-group">
                    <input type="bio" className="form-control" name="bio" onChange={changeHandler} value={page.bio} />
                </div>
                <button type="submit" className="btn btn-primary mr-2" onClick={editHandler}>Изменить</button>
            </div>
        )

    }
    else {
        return (
            <div className="shadow p-3 mb-5 bg-white rounded">
                <h2 className="lead">{page.name}</h2>
                <br />
                <p className="text-break">{page.bio}</p>
                {load && <Donate moocher={page.name} />}
            </div>
        )
    }
}

export default MoocherPage
