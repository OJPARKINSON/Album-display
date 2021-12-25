import fetch from "node-fetch";

export const getUnixDate = () => {
  return new Date().getTime();
};

export const refresh = (req, res) => {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    body: `grant_type=refresh_token&refresh_token=${req.user.refreshToken}`,
    json: true,
  })
    .then((response) => response.json())
    .then((data) => {
      const { expires_in, access_token } = data;
      const expiryTime = getUnixDate() + expires_in * 1000;
      return { accessToken: access_token, expiryTime };
    })
    .catch((err) => {
      console.log(err);
    });
};

export const ensureNotExpired = async (req, res, next) => {
  if (req.user?.expiryTime <= getUnixDate()) {
    console.log("refreshing");
    try {
      const { expiryTime, accessToken } = await refresh(req);
      req.user.expiryTime = expiryTime;
      req.user.accessToken = accessToken;
    } catch (err) {
      console.log(err);
    }
  }
  return next();
};

export const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
