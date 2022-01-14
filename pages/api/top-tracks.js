import { getTopTracks } from "lib/spotify";

export default async function handler(req, res) {
  const response = await getTopTracks();
  const { items } = await response.json();

  const tracks = items
    .slice(0, 10)
    .map(({ artists, name, external_urls: { spotify } }) => ({
      artist: artists.map((_artist) => _artist.name).join(", "),
      songUrl: spotify,
      title: name,
    }));

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json({ tracks });
}
