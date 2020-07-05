import React, {createContext, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/auth";
import {Donate} from "./donate";

const MoocherPage = (props) => {
    const context = useContext(AuthContext)
    const {request, load, me} = useAuth(context.token)
    const http = useHttp().request

    const [page, setPage] = useState({name: "Не найден", bio: '', pk: null})
    const [found, setFound] = useState(false)
    const url = '/api/page/' + props.match.params.name

    useEffect(() => {
        http(url)
            .then(page => {
                setFound(true)
                setPage(page)
            })
            .catch(() => {
                setFound(false)
                console.log('fetch error')
            })
    }, [http, request, url, load])



    const canCreate = !!me.id && !found
    if (page.user === me.id){
        const editHandler = async () => {
            try {
                await request(url, 'POST', page)
            } catch (e) {
                console.log(e)
            }
        }

        const createHandler = async () => {
            const p = ({...page, name: me.username})
             try {
                await request(url, 'POST', p)
            } catch (e) {
                console.log(e)
            }
        }

        const changeHandler = (e) => {
            setPage({...page, [e.target.name]: e.target.value})
        }

        const deleteHandler = async () => {
            try {
                await request(url, 'DELETE', page)
            } catch (e) {
                console.log(e)
            }
        }

        const Edit = () => (
            <div>
                <button type="submit" className="btn btn-primary mr-2" onClick={editHandler}>Изменить</button>
                <button type="submit" className="btn btn-danger mr-2" onClick={deleteHandler}>Удалить</button>
            </div>
        )

        const Create = () => (
            <button type="submit" className="btn btn-primary mr-2" onClick={createHandler}>Создать</button>
        )

        return (
            <div>
                <div className="form-group">
                    <input type="text" className="form-control" name="name" aria-describedby="name"
                           onChange={changeHandler} value={page.name}/>
                </div>
                <div className="form-group">
                    <input type="bio" className="form-control" name="bio" onChange={changeHandler} value={page.bio} />
                </div>
                {!canCreate && <Edit />}
                {canCreate && <Create />}
            </div>
        )

    }
    else {
        return (
            <div className="shadow p-3 mb-5 bg-white rounded">
                <h2 className="lead">{page.name}</h2>
                <br />
                <p className="text-break">{page.bio}</p>
                {<Donate moocher={page.name} />}
            </div>
        )
    }
}

export default MoocherPage
