
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
    .then( response => response.data.display_name)
    .catch(err => err.message)});
});

app.get('/album', async (req, res) => { 
    res.send(await currentTrack());
    //error is 204 NO CONTENT

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
    .then(response =>{return {url: response.data.item.album.images[0].url, name: response.data.item.album.name, error: ''}})
    .catch(error => {console.log(error); return {url: "", name: "", error: error.message}});
}  

app.listen(5000);