import React from 'react'
import Axios from 'axios'

export default function Home() {
    async function login() {
        await Axios({
            method: 'get',
            url: '/login',
        })
        .then(res => console.log(res))
        .catch(err => console.log("Error: ",  err));
    }
    return (
        <input type="button" onClick={async () => await login()} value="Spotify login" />
    )
}