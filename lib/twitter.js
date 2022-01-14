import querystring from "querystring";

const TWITTER_ID = process.env.TWITTER_ID;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;

export const getTweets = async () => {
  if (!TWITTER_ID || !TWITTER_API_KEY) {
    return [];
  }

  const queryParams = querystring.stringify({
    expansions: "author_id,attachments.media_keys",
    "media.fields": "url",
  });


  const response = await fetch(
    `https://api.twitter.com/2/users/${TWITTER_ID}/liked_tweets?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${TWITTER_API_KEY}`,
      },
    }
  );

  const tweets = await response.json();
    console.log(tweets);

  return tweets.data.reduce((allTweets, tweet) => {
    if (tweet.author_id === "2907774137") {
      return [
        tweet?.attachments?.media_keys.map(
          (key) =>
            tweets.includes.media.find((media) => media.media_key === key)
        )[0] || [],
        ...allTweets,
      ];
    } else {
      return allTweets;
    }
  }, []);
};
