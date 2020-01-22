import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const Album = () => {
    const [urlHook, setUrlHook] = useState();
    useEffect(() => {
        setInterval(() => {
            Axios({
                url: '/album', 
                method: 'get',
                responseType: "json"
            })
            .then(res => { console.log(res.status, res.data); return (res.status === 204 ) ?  undefined :  setUrlHook(res.data)})
            .catch(error => console.log(error))
        }, 1000);

    }, [])
    

    return urlHook ?  (
        <div>
            <img src={urlHook.url} alt="" />
            {urlHook.name}
            {urlHook.error ? (<div><h2>Error: {urlHook.error}, please login again</h2> <a href="http://localhost:3000/">Login</a></div>) :  <a href="http://localhost:8888/logout">Logout</a>}
        </div>
    ) : (
        <div>
            <h1>"Loading..."</h1>
            <a href="http://localhost:8888/logout">Logout</a>
        </div>
    )
}

export default Album