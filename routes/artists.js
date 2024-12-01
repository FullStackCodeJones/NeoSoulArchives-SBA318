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
// GET: Fetch all artists (with optional genre filter)
router.get("/", (req, res) => {
  const { genre } = req.query;
  const filteredArtists = genre
    ? artists.filter(
        (artist) => artist.genre.toLowerCase() === genre.toLowerCase()
      )
    : artists;
  res.render("artists", { artists: filteredArtists });
});

// POST: Add a new artist
router.post("/", (req, res) => {
  const { name, genre, bio, popularSong } = req.body;
  if (!name || !genre || !bio || !popularSong) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newArtist = { id: artists.length + 1, name, genre, bio, popularSong };
  artists.push(newArtist);
  res.redirect("/artists");
});

// PUT: Update an artist
router.put("/:id", (req, res) => {
  const artistId = parseInt(req.params.id);
  const artist = artists.find((a) => a.id === artistId);

  if (!artist) return res.status(404).json({ message: "Artist not found." });

  const { name, genre, bio, popularSong } = req.body;
  if (!name || !genre || !bio)
    return res
      .status(400)
      .json({ message: "Name, genre, and bio are required." });

  artist.name = name || artist.name;
  artist.genre = genre || artist.genre;
  artist.bio = bio || artist.bio;
  artist.popularSong = popularSong || artist.popularSong;

  res.redirect("/artists");
});

// DELETE: Remove an artist
router.delete("/:id", (req, res) => {
  const artistId = parseInt(req.params.id);
  const artistIndex = artists.findIndex((a) => a.id === artistId);

  if (artistIndex === -1)
    return res.status(404).json({ message: "Artist not found." });

  artists.splice(artistIndex, 1);
  res.redirect("/artists");
});

module.exports = router;
