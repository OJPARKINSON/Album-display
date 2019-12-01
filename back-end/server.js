
const express = require('express');
var bodyParser = require('body-parser');
const axios =  require('axios');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors())
let at = ""

app.post("/callback", async (req, res) => {
    at = req.body.code
    res.send({ name: await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + at,
                Accept: "application/json" 
            },
            responseType: "json"
        })
    .then(async response => response.data.display_name)
    .catch(err => console.log(err))});
});

app.get('/album', async (req, res) => { 
    console.log(await currentTrack())
    res.send({album: await currentTrack()});
});

async function currentTrack() {
    return axios({
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + at,
            Accept: "application/json" 
        }
    })
    .then(response => response.data)
    .catch(err => console.log(err));
}  

app.listen(5000);