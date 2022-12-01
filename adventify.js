const express = require("express");
const fs = require("fs");
const csvParser = require('csv-parser')
const app = express();
const port = 8080;
const pageURL = "http://localhost:8080";

app.use("/static", express.static(__dirname + "/Adventify_Tracks"));

app.get("/", function (req, res) {
    var day = new Date().toISOString().split("T")[0].split("-");
    var image = `/track_${day[2]}.svg`;
    var csv = fs.readFileSync("./Adventify_Tracks/tracks.csv", "utf8")
    csv = csv.split("\r\n")
    console.log(csv[parseInt(day[2], 10)])
    var link = csv[parseInt(day[2], 10)]
    res.setHeader("Content-Type", "text/html");
    res.write(
        `<body style=background:#191415;font-family:Arial,Helvetica,sans-serif></body><h1 style= font-size:64px;color:#1DB955;text-align:center>Adventify</h1><div style=text-align:center><a href="${link}"><img src="${pageURL + "/static" + image}"/></a></div> <p style = color:white;text-align:center;font-size:24px>only ${25-day[2]} day(s) until Christmas!</p>`
    );
    res.end();
});

app.get("/about", function (req, res) {
    res.send("I made this lol");
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
