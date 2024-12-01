const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const artistsRouter = require("./routes/artists"); // Import Artists Router

const app = express();

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Handle PUT/DELETE requests
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// View engine setup
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Neo-Soul & Spoken Word Archive" });
});

app.get("/artists", (req, res) => {
  fetch("http://localhost:3000/api/artists")
    .then((response) => response.json())
    .then((artists) => {
      res.render("artists", { artists });
    });
});

app.get("/artists/new", (req, res) => {
  res.render("addArtist");
});

// Use the artists router for all artist-related API routes
app.use("/api/artists", artistsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
