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
        .then(res => setUrlHook(res.data.album.item.album.images[0].url))
        .catch(error => console.log(error))
    }, [])
    return (
        <img src={urlHook} alt="" />
    )
}

export default Album