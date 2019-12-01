
const express = require('express');
var bodyParser = require('body-parser');
const axios =  require('axios');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors())
    
app.post("/callback", async (req, res) => {
    console.log(req.body.code);
    res.send({url: await currentTrack( await req.body.code)})
});

async function currentTrack(at) {
    return axios({
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        method: "get",
        headers: {
            'Authorization': 'Bearer ' + at,
            Accept: "application/json" 
        }
    })
    .then(response => response.data.item.album.images[0].url)
    .catch(err => console.log(err));
}

app.listen(5000);