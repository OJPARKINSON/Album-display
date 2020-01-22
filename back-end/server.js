var express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    SpotifyStrategy = require('passport-spotify').Strategy,
    axios =  require('axios'),
    cors = require('cors'),
    morgan = require('morgan'),
    redis = require("redis"),
    client = redis.createClient(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    socket = require('socket.io-client')('http://localhost');

const app = express();

app.use(express.static('public'))
    .use(cookieParser())
    .use(bodyParser())
    .use(session({ secure: true, secret: 'keyboard cat', saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors())
    .use(morgan('dev'));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
    
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
    new SpotifyStrategy(
      {
        clientID: '889c56fec9944ecfb7e0a4af6a50cfd1',
        clientSecret: '019a580b524c4bbe9ef0992b9d78670c',
        callbackURL: 'http://localhost:8888/callback'
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
        client.set(profile.id, `${accessToken} ${refreshToken}`);
        process.nextTick(function() {
            return done(null, profile);
        });
    }
    )
);

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
    client.del(req.session)
    req.session.albumCache = null;
    req.logout();
    res.redirect('http://localhost:3000/');
  });

app.get('/album', async (req, res) => {
    if (req.session.passport === undefined) {
        res.send({error: 'Session failed'})
        return null
    }
    client.get(req.session.passport.user, (err, reply) => {
        if (!err) {
            axios({
                url: "https://api.spotify.com/v1/me/player/currently-playing",
                method: "get",
                headers: {
                    'Authorization': 'Bearer ' + reply.split(' ')[0],
                    Accept: "application/json" 
                }
            })
            .then(response => { 
                // console.log(response.data.item.album.id);
                // console.log(req.session.albumCache);
                if (response.status === 204) {
                        res.send({error: "Please make sure music is playing"});
                } else if (req.session.albumCache === response.data.item.album.id) {
                    res.sendStatus(204);
                } else {
                    req.session.albumCache = response.data.item.album.id;
                    res.send({url: response.data.item.album.images[0].url, name: response.data.item.album.name});
                }
            })
            .catch(error => console.log(error));     
        } else {
            res.send({error: err})
        }
        
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('http://localhost:3000/');
  }

app.listen(8888);