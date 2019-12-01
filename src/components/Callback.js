import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';

const Callback = (props) => {
    const [responseHook, setResponseHook] = useState();
    useEffect(() => {
        Axios({
            url: '/callback', 
            method: 'POST',
            data: {
                code: props.history.location.hash.replace('#access_token=', '').replace("&token_type=Bearer&expires_in=3600", "")
            },
            responseType: "json"
        })
        .then(res => setResponseHook(res.data.name))
        .catch(error => console.log(error))
    }, [props.history.location.hash])
    
    return (
        <div>
            <h1>callback</h1>
            <p>{responseHook ? <Redirect to="/album" /> : 'Loading'}</p>
        </div>
    )
}

export default Callback;
