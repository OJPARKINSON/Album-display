
var express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    SpotifyStrategy = require('passport-spotify').Strategy;
const axios =  require('axios');
const cors = require('cors');
var morgan = require('morgan');
// const redis = require('redis');

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


// const redisClient = redis.createClient({host : 'localhost', port : 6379});
// redisClient.on('ready',function() {
//     console.log("Redis is ready");
// });
// redisClient.on('error',function() {
//     console.log("Error in Redis");
// });

app.use(cors())
    .use(express.static(__dirname + '/public'))
    .use(morgan('dev'))
    .use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
    .use(passport.initialize())
    .use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
var at = ""
passport.use(
    new SpotifyStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: 'http://localhost:8888/callback'
      },
      function(accessToken, refreshToken, expires_in, profile, done) {

        at = accessToken
        process.nextTick(function() {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
        });
    }
    )
);

app.get('/auth',
    passport.authenticate('spotify', {
    scope: ['user-read-private user-read-playback-state streaming user-read-email user-read-private user-read-currently-playing'],
    failureRedirect: '/',
    showDialog: true
  })
);

app.get('/login', 
    passport.authenticate('spotify', {
        scope: ['user-read-private user-read-playback-state streaming user-read-email user-read-private user-read-currently-playing'],
    })
);

app.get('/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('http://localhost:3000/album');
    }
);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('http://localhost:3000/');
  });

app.get('/album', ensureAuthenticated, async (req, res) => { 
    res.send(await currentTrack());
    //error is 204 NO CONTENT

});

function currentTrack() {
    return axios({
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + at,
            Accept: "application/json" 
        }
    })
    .then(response =>{return {url: response.data.item.album.images[0].url, name: response.data.item.album.name}})
    .catch(error => console.log(error));
}  

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

app.listen(8888);