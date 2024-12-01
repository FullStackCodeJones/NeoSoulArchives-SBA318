//Importing the Express Library
const express = require("express");

//Creating a Router Instance for HAndling Artist Related Routes
const router = express.Router();

//Temporary In Memory Storage for Artist Database

let artists = [
  { id: 1, name: "Erykah Badu", genre: "Neo-Soul" },
  { id: 2, name: "Jill Scott", genre: "Neo-Soul" },
  { id: 3, name: "Common", genre: "Neo-Soul" },
  { id: 4, name: "Floetry", genre: "Neo-Soul" },
  { id: 5, name: "Musiq Soulchild" },
];
