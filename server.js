const express = require('express')
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy
const axios =  require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const refresh = require('passport-oauth2-refresh');

require('dotenv').config();

var port = 8888;
var authCallbackPath = '/callback';

const app = express();

app.use(express.static('public'))
    .use(cookieParser())
    .use(morgan('tiny'))
    .use(session({ secure: true, secret: 'keyboard cat', saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors());

    
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
    
const strategy = new SpotifyStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:' + port + authCallbackPath,
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
        process.nextTick(function() {
            return done(null, {profile, accessToken} );
        });
    }
);
        
refresh.use(strategy);
passport.use(strategy);

app.get('/login', 
    passport.authenticate('spotify', {
        scope: ['user-read-private user-read-playback-state streaming user-read-email user-read-private user-read-currently-playing']
    }),
    
);

app.get('/callback',
    passport.authenticate('spotify', { failureRedirect: 'http://localhost:3000/' }),
    function(req, res) {
        res.redirect('http://localhost:3000/album');
    }
);

app.get('/logout', function(req, res) {
    req.session.albumCache = null;
    req.logout();
    res.redirect('http://localhost:3000/');
  });

app.get('/album', ensureAuthenticated, async (req, res) => {
    console.log()
    return axios({
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + req.user.accessToken,
            Accept: "application/json"
        }
    })
        .then(async response => {
            if (response.status === 204) {
                res.send({error: "Please make sure music is playing"});
            } else if (req.session.albumCache === response.data.item.album.id) {
                res.sendStatus(204);
            } else {
                const img = response.data.item.album.images[0].url
                req.session.dateUpdated = response.headers.date
                req.session.albumCache = response.data.item.album.id;
                res.send({url: img, name: response.data.item.album.name});
            }
        })
        .catch(error => console.log(error)) 
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('http://localhost:3000/');
  }

app.listen(8888);