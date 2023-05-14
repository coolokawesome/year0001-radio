const express = require("express");
const cors = require("cors");
const path = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "songs")));

const url = "mongodb+srv://admin:admin@year-0001.1brin7c.mongodb.net/year-0001-database?retryWrites=true&w=majority";

const dbName = "year-0001-database";

console.log('logged 1.')
// Connect to MongoDB
MongoClient.connect("mongodb+srv://admin:admin@year-0001.1brin7c.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true }, (err, client) => {
  console.log('tryna connect.')
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const songsCollection = db.collection("year-0001-songs");

  // API endpoints
  app.get("/api/songs", (req, res) => {
    songsCollection.find().toArray((err, songs) => {
      if (err) {
        console.error("Error retrieving songs:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(songs);
    });
  });
  

  app.get("/songs/:song", (req, res) => {
    const song = req.params.song;
    const filePath = path.join(__dirname, "songs", song);
    res.sendFile(filePath);
  });

  const PORT = process.env.PORT || 19956;
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    console.log('here');
  } catch (error) {
    console.error('Error starting the server:', error);
  }
});
