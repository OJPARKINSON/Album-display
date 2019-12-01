import React from 'react'
import Axios from 'axios'

const callback = props => {
    Axios({
        url: '/callback', 
        method: 'POST',
        data: {
            code: props.history.location.hash.replace('#access_token=', '').replace("&token_type=Bearer&expires_in=3600", "")
        },
        responseType: "json"
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
    return (
        <div>
            <h1>callback</h1>
            <p>{props.history.location.hash.replace('#access_token=', '').replace("&token_type=Bearer&expires_in=3600", "")}</p>
        </div>
    )
}

export default callback;
