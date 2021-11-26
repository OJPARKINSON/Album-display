import { Strategy } from "passport-spotify";
import session from "express-session";
import passport from "passport";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import next from "next";

import {
  ensureAuthenticated,
  ensureNotExpired,
  getUnixDate,
} from "./units/index.js";

dotenv.config();

var port = process.env.PORT || 3001;
var authCallbackPath = "/callback";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const host = process.env.host || "localhost";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000, // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true,
  };
  server.use(session(sessionConfig));

  const spotifyStrategy = new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: host + port + authCallbackPath,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function () {
        const expiryTime = expires_in * 1000 + getUnixDate();

        return done(null, { profile, accessToken, refreshToken, expiryTime });
      });
    }
  );

  passport.use(spotifyStrategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // 5 - adding Passport and authentication routes
  server.use(passport.initialize());
  server.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  server.use("/auth", authRouter);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
