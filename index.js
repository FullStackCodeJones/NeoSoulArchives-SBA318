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

//Static Files
//Serves the static files like CSS, and Images
app.use(express.static(path.join(__dirname, "public")));

//Setting up EJS as the template engine for dynamic HTML rendering
app.set("view engine", "ejs");

//Routes

//Home Route: Displays a Welcome Page
app.get("/", (req, res) => {
  res.render("index", { title: "Neo-Soul & Spoken Word Archive" });
});

//Start The Server On Port 3000
const PORT = 3000; //Defines The Port Number
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
