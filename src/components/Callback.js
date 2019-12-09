import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';

const Callback = (props) => {
    const [responseHook, setResponseHook] = useState();
    return (
        <div>
            <h1>callback</h1>
            <p>{responseHook ? <Redirect to="/album" /> : 'Loading'}</p>
        </div>
    )
}

export default Callback;
