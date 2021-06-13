import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const Album = () => {
    const [album, setAlbum] = useState();
    useEffect(() => {
        setInterval(() => {
            getAlbum(setAlbum);
        }, 7500);
    }, []);

    return album ?  (
        <>
        <div style={{ 
            "background-image": `url(${album.url})`, 
            "background-size": "cover",
            "background-repeat": "round", 
            "filter": "blur(1.5rem)",
            "margin": "0px",
            "height": "50vw",
            "padding": "0px"}}
        />
            <div className="container">
                <img src={album.url} alt="" />
                <h2>{album.name}</h2>
                {album.error ? (<div><h2>Error: {album.error}, please login again</h2> <a href="http://localhost:3000/">Login</a></div>) :  <a href="http://localhost:8888/logout">Logout</a>}

            </div>
        </>
    ) : (
        <div>
            <h1>"Loading..."</h1>
            <a href="http://localhost:8888/logout">Logout</a>
        </div>
    )
};

const getAlbum = (setAlbum) => {
    Axios({
        url: '/album', 
        method: 'get',
        responseType: "json"
    })
    .then(res => {
        if (res.status !== 204 ) {
            setAlbum(res.data);
        }
    })
    .catch(error => console.log(error))
}

export default Album