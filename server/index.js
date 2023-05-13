const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Allow cross-origin resource sharing (CORS)
app.use(cors());

// Serve static files from the songs directory
app.use(express.static(path.join(__dirname, "songs")));

// Route for retrieving song data
app.get("/api/songs", (req, res) => {
  const songs = [
        {
          title: "vive la france",
          artist: "Aamu Kuu",
          audio: "/songs/viva_la_france.wav",
          img: "/songs/viva_la_france.jpg"
        },
        {
          title: "red cup",
          artist: "Gud",
          audio: "/songs/red_cup.mp3",
          img: "/songs/red_cup.webp"
        }
        ,
        {
          title: "No Mercy (feat. Yung Lean)",
          artist: "Yung Bans",
          audio: "/songs/no_mercy.mp3",
          img: "/songs/no_mercy.jpg"
        }
        ,
        {
          title: "Monster (Gud remix)",
          artist: "Gud",
          audio: "/songs/monster.mp3",
          img: "/songs/monster.jpg"
        }
        ,
        {
          title: "Cash Flow",
          artist: "Nadia Tehran",
          audio: "/songs/cash_flow.mp3",
          img: "/songs/cash_flow.png",
        }
        ,
        {
          title: "cream soda",
          artist: "YEAR0001",
          audio: "/songs/cream_soda.mp3",
          img: "/songs/cream_soda.png",
        },
        {
          title: "hahah",
          artist: "bladee",
          audio: "/songs/hahah.mp3",
          img: "/songs/hahah.png",
        },
        {
          title: "Summer rain",
          artist: "woesum (feat. yung lean)",
          audio: "/songs/summer_rain.mp3",
          img: "/songs/summer_rain.jpg",
        },
        {
          title: "Moon Dancer",
          artist: "Axel Boman",
          audio: "/songs/moon_dancer.mp3",
          img: "/songs/moon_dancer.png",
        },
        {
          title: "rented starship",
          artist: "gud",
          audio: "/songs/rented_starship.mp3",
          img: "/songs/rented_starship.jpg",
        },
        {
          title: "This is it",
          artist: "Baba Stiltz",
          audio: "/songs/this_is_it.mp3",
          img: "/songs/this_is_it.png",
        },
        {
          title: "hello",
          artist: "Axel Boman",
          audio: "/songs/hello.mp3",
          img: "/songs/hello.png",
        },
        {
          title: "Nice Guy",
          artist: "Yayoyanoh",
          audio: "/songs/nice_guy.mp3",
          img: "/songs/nice_guy.jpg",
        },
        {
          title: "Steve Jobs",
          artist: "bladee",
          audio: "/songs/steve_jobs.mp3",
          img: "/songs/steve_jobs.jpg",
        },
        {
          title: "Bliss (Feat. FKA twigs)",
          artist: "Yung Lean",
          audio: "/songs/bliss.mp3",
          img: "/songs/bliss.jpg",
        },
        {
          title: "drama",
          artist: "Bladee",
          audio: "/songs/drama.mp3",
          img: "/songs/drama.png",
        },
        {
          title: "augment",
          artist: "ESP",
          audio: "/songs/augment.mp3",
          img: "/songs/augment.png",
        },
        {
          title: "creep",
          artist: "yung sherman",
          audio: "/songs/creep.mp3",
          img: "/songs/creep.jpg",
        },
        {
          title: "obedient (ft. Ecco2k)",
          artist: "Bladee",
          audio: "/songs/obedient.mp3",
          img: "/songs/steve_jobs.jpg",
        },
        {
          title: "be nice to me",
          artist: "Bladee",
          audio: "/songs/nice.mp3",
          img: "/songs/nice.jpg",
        },
        {
          title: "legendary member",
          artist: "Thaiboy digital (feat. bladee, ecco2k, yung lean)",
          audio: "/songs/legendary_member.mp3",
          img: "/songs/legendary_member.webp",
        }
      ];

      res.json(songs);
    });
    
    // Route for serving audio files
    app.get("/songs/:song", (req, res) => {
      const song = req.params.song;
      const filePath = path.join(__dirname, "songs", song);
    
      res.sendFile(filePath);
    });
    
    // Start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });