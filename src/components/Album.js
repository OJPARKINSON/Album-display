import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import * as Vibrant from 'node-vibrant'


const Album = () => {
    const [urlHook, setUrlHook] = useState();
    const [colour, setColour] = useState();
    useEffect(() => {
        setInterval(() => {
            Axios({
                url: '/album', 
                method: 'get',
                responseType: "json"
            })
            .then(res => { return (res.status === 204 ) ?  undefined :  setUrlHook(res.data), Vibrant.from(res.data.url).getPalette((err, palette) => setColour(palette))})
            .catch(error => console.log(error))
        }, 3000);

    }, []);
    
    return urlHook ?  (
        <div className="container" style={colour ? ({backgroundColor: `rgb(${colour.Muted.rgb})`}) : null}>
            <img src={urlHook.url} alt="" />
            <h2>{urlHook.name}</h2>
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