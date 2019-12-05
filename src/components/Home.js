import React from 'react'

export default function Home() {
    return (
        <a href='https://accounts.spotify.com/authorize?response_type=token&client_id=889c56fec9944ecfb7e0a4af6a50cfd1&scope=user-read-private user-read-playback-state user-read-email user-read-currently-playing&redirect_uri=http://localhost:3000/callback'>Spotify login </a>
    )
}