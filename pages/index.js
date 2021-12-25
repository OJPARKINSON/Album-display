import NowPlaying from '../components/NowPlaying'
import { useState } from 'react'

export default function Index() {
    const [palette, setPalette] = useState({})
    const { LightVibrant } = palette

    return (
        <div
            style={{ backgroundColor: LightVibrant?.hex && LightVibrant?.hex }}
            className="m-0 p-0 w-screen h-screen flex items-center justify-center text-center"
        >
            <NowPlaying setPalette={setPalette} />
        </div>
    )
}
