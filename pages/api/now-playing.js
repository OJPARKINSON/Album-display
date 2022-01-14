import { getNowPlaying } from "../../lib/spotify";

export default async function handler(req, res) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json();

  if (song.is_playing === false) {
    return res.status(200).json({ isPlaying: false });
  }

  const { is_playing, item, currently_playing_type } = song;
  const { name, artists, album, external_urls } = item || {};

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=10"
  );

  return res.status(200).json({
    isPlaying: is_playing,
    isPodcast: currently_playing_type === "episode",
    title: name,
    artist: artists?.map(({name}) => name).join(", ") || null,
    album: album?.name,
    albumImageUrl: album?.images?.[0]?.url,
    songUrl: external_urls?.spotify,
  });
}
