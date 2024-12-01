// Importing the Express Library
const express = require("express");

// Creating a Router Instance for Handling Artist Related Routes
const router = express.Router();

// Temporary In-Memory Storage for Artist Database
let artists = [
  {
    id: 1,
    name: "Erykah Badu",
    genre: "Neo-Soul",
    bio: "Queen Mother of Neo-Soul",
    popularSong: "Next Life Time",
  },
  {
    id: 2,
    name: "Jill Scott",
    genre: "Neo-Soul",
    bio: "Sweet Soothing Songstress of Neo-Soul",
    popularSong: "Golden",
  },
  {
    id: 3,
    name: "Common",
    genre: "Neo-Soul",
    bio: "The Conscious Voice of Neo-Soul",
    popularSong: "Don't Forget Who You Are",
  },
  {
    id: 4,
    name: "Floetry",
    genre: "Neo-Soul",
    bio: "Seductresses of Neo-Soul",
    popularSong: "Say Yes",
  },
  {
    id: 5,
    name: "Musiq Soulchild",
    genre: "Neo-Soul",
    bio: "Cool Philly Cat of Neo-Soul",
    popularSong: "Love",
  },
];

// GET Route: Fetch Artists (with optional filtering by genre)
router.get("/", (req, res) => {
  const { genre } = req.query; // Capture genre filter from query parameters

  // If the genre is provided in the query string, filter the artists by genre
  const filteredArtists = genre
    ? artists.filter(
        (artist) => artist.genre.toLowerCase() === genre.toLowerCase()
      ) // Case insensitive genre filtering
    : artists; // If no genre is provided, return all artists

  res.json(filteredArtists);
});

// POST Route: Add New Artist
router.post("/", (req, res) => {
  const newArtist = {
    id: artists.length + 1, // Assigns A New ID
    name: req.body.name,
    genre: req.body.genre,
    bio: req.body.bio,
    popularSong: req.body.popularSong,
  };

  artists.push(newArtist);
  res.status(201).json(newArtist);
});

// PUT Route: Update Artist
router.put("/:id", (req, res) => {
  const artistId = parseInt(req.params.id);
  const artist = artists.find((a) => a.id === artistId);

  if (!req.body.name || !req.body.genre || !req.body.bio) {
    return res.status(400).json({ message: "Missing Required Fields" });
  }

  // Update the artist details with the new values from the request body
  artist.name = req.body.name || artist.name;
  artist.genre = req.body.genre || artist.genre;
  artist.bio = req.body.bio || artist.bio;
  artist.popularSong = req.body.popularSong || artist.popularSong;

  res.json(artist);
});

// DELETE Route: Remove Artist
router.delete("/:id", (req, res) => {
  const artistId = parseInt(req.params.id); // Gets ID from the URL
  const artistIndex = artists.findIndex((a) => a.id === artistId);

  if (artistIndex === -1) {
    return res.status(404).json({ message: "Artist Not Found" });
  }

  const deletedArtist = artists.splice(artistIndex, 1); // Removes an Artist from the Array
  res.json(deletedArtist);
});

// Route for /performances
router.get("/performances", (req, res) => {
  res.send("Performance Page");
});

// Export the Router so that it can be used in index.js
module.exports = router;
