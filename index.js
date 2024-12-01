// Imports
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const artistsRouter = require("./routes/artists"); // Import Artists Router

const app = express();

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride("_method")); // Support PUT/DELETE via query params
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
app.use(express.json()); // JSON

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong! Please try again later.");
});

// View Engine Setup
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Neo-Soul & Spoken Word Archive" });
});

// Artists Routes
app.use("/artists", artistsRouter); // Forward `/artists` routes to artistsRouter

// Catch-All Route for 404s
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
