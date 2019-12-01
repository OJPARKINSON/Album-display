import React from 'react'

export default function Home() {

    return (
        <a href='https://accounts.spotify.com/authorize?response_type=token&client_id=//&scope=user-read-private user-read-playback-state user-read-email user-read-currently-playing&redirect_uri=http://localhost:3000/callback'>Spotify login </a>
    )
}