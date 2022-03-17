import { getNowPlaying } from "lib/spotify";

export default async function handler(req, res) {
  const song = await getNowPlaying();

  if (song.status === 204 || song.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  if (song.item === null) {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const currentlyPlayingType = song.item.type;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).json({
    isPlaying,
    isPodcast: currentlyPlayingType === "episode",
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
  });
}
