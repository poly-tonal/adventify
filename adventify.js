const express = require("express");
const cors = require('cors');
const fs = require("fs");
const csvParser = require('csv-parser')
const app = express();
const port = 80;
const sslport = 443;
const pageURL = "https://adventify.app";

const http = require('http');
const https = require('https');

app.use(cors())
app.use("/static", express.static(__dirname + "/Adventify_Tracks"));

app.get("/", function (req, res) {
    var day = new Date().toISOString().split("T")[0].split("-");
    var image = `/track_${day[2]}.svg`;
    var csv = fs.readFileSync("/Adventify_Tracks/tracks.csv", "utf8")
    csv = csv.split("\n")
    //console.log(csv[parseInt(day[2], 10)])
    var link = csv[parseInt(day[2], 10)]
    res.setHeader("Content-Type", "text/html");
    res.write(
        `<head><title>Adventify</title><link rel="icon" type="image/x-icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/96/sparkles_2728.png"></head><body style=background:#191415;font-family:Arial,Helvetica,sans-serif></body><h1 style= font-size:64px;color:#1DB955;text-align:center>Adventify</h1><div style=text-align:center><a href="${link}"><img src="${pageURL + "/static" + image}"/></a></div> <p style = color:white;text-align:center;font-size:24px>only ${25-day[2]} day(s) until Christmas!</p>`
    );
    res.end();
});

app.get("/about", function (req, res) {
    res.send(`<head><title>Adventify</title><link rel="icon" type="image/x-icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/96/sparkles_2728.png"></head><body style="background:#191415;font-family:Arial,Helvetica,sans-serif"><h1 style="font-size:64px;color:#1DB955;text-align:center">Adventify</h1><p style="color:white;text-align:center;font-size:24px">Adventify is not affiliated, associated, authorised, endorsed by, or in any way officially connected with Spotify Technology S.A, or any of its subsidiaries or its affiliates. The official Spotify website can be found at <a href="https://www.spotify.com/">Spotify.com</a>.</p></body>`);
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/adventify.app/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/adventify.app/fullchain.pem'),
}, app);

httpServer.listen(port, () => {
        console.log(`HTTP running on ${port}`);
});

httpsServer.listen(sslport, () => {
    console.log(`HTTP running on ${sslport}`);
});