import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/api/login",
  passport.authenticate("spotify", {
    scope: [process.env.SCOPE],
  })
);

router.get(
  "/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect("/album");
  }
);

router.get("/api/logout", function (req, res) {
  req.session.albumCache = null;
  req.logout();
  res.redirect("/");
});

router.get(
  "/api/getAlbum",
  ensureNotExpired,
  ensureAuthenticated,
  (req, res) => {
    return axios({
      url: "https://api.spotify.com/v1/me/player/currently-playing",
      method: "get",
      headers: {
        Authorization: "Bearer " + req.user.accessToken,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          res.send({ error: "Please make sure music is playing" });
        } else {
          const url = response.data.item.album.images[0].url;
          const name = response.data.item.album.name;
          res.send({ url, name });
        }
      })
      .catch((error) => console.log(error));
  }
);

export default router;
