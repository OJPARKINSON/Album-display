const TWITTER_ID = process.env.TWITTER_ID;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;

const fetchTweets = async (pagination_token) => {
  let qp = {
    expansions: "author_id,attachments.media_keys",
    "media.fields": "url",
  };
  if (pagination_token) {
    qp.pagination_token = pagination_token;
  }
  const queryParams = new URLSearchParams(qp);

  return fetch(
    `https://api.twitter.com/2/users/${TWITTER_ID}/liked_tweets?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${TWITTER_API_KEY}`,
      },
    }
  ).then((res) => res.json());
};

export const getTweets = async () => {
  if (!TWITTER_ID || !TWITTER_API_KEY) {
    return [];
  }

  let tweets;
  let pagination_token = null;

  for (let i = 0; i <= 3; i++) {
    const loopTweets = await fetchTweets(pagination_token);

    console.log(pagination_token);

    if (loopTweets?.meta?.next_token !== undefined) {
      pagination_token = loopTweets.meta.next_token;
    }

    tweets = { ...tweets, ...loopTweets };
  }

  return await tweets.data
    .reduce((allTweets, tweet) => {
      if (tweet.author_id === "2907774137") {
        return [
          tweet?.attachments?.media_keys.map((key) =>
            tweets.includes.media.find((media) => media.media_key === key)
          )[0] || [],
          ...allTweets,
        ];
      } else {
        return allTweets;
      }
    }, [])
    .reverse();
};
