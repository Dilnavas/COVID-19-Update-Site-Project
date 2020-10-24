//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const https = require ("https");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");





