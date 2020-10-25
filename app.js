//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const https = require ("https");
const ejs = require("ejs");
const { json } = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const url = "https://api.covid19api.com/summary";
let chunksOne = [];
let chunksTwo = [];

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/analytics", function (req , res) {
    https.get(url,function (response) {
        console.log(response.statusCode);
        response.on("data", function(data){
            chunksOne.push(data); 
        }).on("end", function(){
            let data   = Buffer.concat(chunksOne);
            let fetchData = JSON.parse(data);
            console.log(fetchData.Global);
            res.render("analytics", {data: fetchData.Global});
        })   
      chunksOne = [];   
    });
});

app.get("/countryWise", function (req, res) {
    https.get(url, function (response) {
        response.on("data", function(data){
            chunksTwo.push(data);
        }).on("end", function() {
            let data = Buffer.concat(chunksTwo);
            let fetchData = JSON.parse(data);
            console.log(fetchData.Countries);
            res.render("countrydata", {countryData: fetchData.Countries});
        })
        chunksTwo = [];
    });
    
});

app.listen(3000, function () {
    console.log("Server started on port 3000.");
});