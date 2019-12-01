
const express = require('express');
var bodyParser = require('body-parser');
const axios =  require('axios');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/login', (req, res) => {
    var scopes = 'user-read-private user-read-playback-state user-read-email user-read-currently-playing';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=4cc28fd1578a4f3aba9b5567f06a09d9' +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/callback'));
});
    

app.post("/callback", async (req, res) => {
    console.log(req.body.code);
    res.send(await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + await req.body.code,
                Accept: "application/json" 
            },
            responseType: "json"
        })
    .then(async response => {await  currentTrack(await req.body.code); return response.data})
    .catch(err => console.log(err)));
});

async function currentTrack(at) {
    axios({
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + at,
            Accept: "application/json" 
        }
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

app.listen(5000);