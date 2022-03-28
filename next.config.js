module.exports = {
  images: {
    domains: ["i.scdn.co", "pbs.twimg.com", "lastfm.freetls.fastly.net"],
  },
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,

    TWITTER_API_KEY: process.env.TWITTER_API_KEY,
    TWITTER_ID: process.env.TWITTER_ID,
  },
  reactStrictMode: true,
};
