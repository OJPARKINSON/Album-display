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
        .then(res => setUrlHook(res.data))
        .catch(error => console.log(error))
    }, [])
    return urlHook ?  (
        <div>
            <img src={urlHook.url} alt="" />
            {urlHook.name}
            {urlHook.error ? urlHook.error : null}
        </div>
    ) : (
        "error"
    )
}

export default Album