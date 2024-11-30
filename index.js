//Import Required Modules
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

//Sets Up Express App
const app = express();

//Middleware
//Parse URL encoded data from forms
app.use(bodyParser.urlencoded({ extended: true }));

//Uses method override to handle the PUT/DELETE requests
app.use(methodOverride("_method"));
