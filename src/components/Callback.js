import React, {useState, useEffect} from 'react'
import Axios from 'axios'

const Callback = (props) => {
    const [urlHook, setUrlHook] = useState();
    useEffect(() => {
        Axios({
            url: '/callback', 
            method: 'POST',
            data: {
                code: props.history.location.hash.replace('#access_token=', '').replace("&token_type=Bearer&expires_in=3600", "")
            },
            responseType: "json"
        })
        .then(res => {console.log(res.data.url); setUrlHook(res.data.url)})
        .catch(error => console.log(error))
    }, [])
    return (
        <div>
            <h1>callback</h1>
            <p>{props.history.location.hash.replace('#access_token=', '').replace("&token_type=Bearer&expires_in=3600", "")}</p>
            <img src={urlHook} alt="" />
        </div>
    )
}

export default Callback;
