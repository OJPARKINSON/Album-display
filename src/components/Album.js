import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const Album = () => {
    const [urlHook, setUrlHook] = useState();
    useEffect(() => {
        Axios({
            url: '/album', 
            method: 'get',
            responseType: "json"
        })
        .then(res => { console.log(res.data); setUrlHook(res.data)})
        .catch(error => console.log(error))
    }, [])
    return urlHook ?  (
        <div>
            <img src={urlHook.url} alt="" />
            {urlHook.name}
            {urlHook.error ? (<div><h2>Error: {urlHook.error}, please login again</h2> <a href="http://localhost:3000/">Login</a></div>) :  <a href="http://localhost:8888/logout">Logout</a>}
           
        </div>
    ) : (
        "Loading..."
    )
}

export default Album