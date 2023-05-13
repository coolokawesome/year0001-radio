import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import logo from './imgs/logo.png'
import Play from './imgs/icons/play.png'
import Pause from './imgs/icons/pause.png'
import Next from './imgs/icons/next.png'
import Back from './imgs/icons/back.png'

function App() {
  const sentence = "YEAR0001 RADIO";
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false)
  const [index, setIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index < sentence.length) {
        setOutput((prevOutput) => prevOutput + sentence[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          setDone(true)
        }, 4000)
      }
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [index, sentence]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/songs")
      .then((response) => {
        setSongs(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("err", error));
  }, []);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.audio.current.addEventListener("ended", handleSongEnd);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.audio.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [currentSongIndex]);

  const handleSongEnd = () => {
    if (currentSongIndex + 1 < songs.length) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.audio.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.audio.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
  };

  const handleNext = () => {
    if (currentSongIndex + 1 < songs.length) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const currentSong = songs[currentSongIndex] || {};

  return (
    <div className="App" >
      <header className="app-header">
        <div className="header-left">
          <img className="logo a-link" src={logo}></img>
        </div>
        <div className="header-right">
          <a href='https://github.com' target="_blank" className="footer-link a-link">REPO</a>
        </div>
      </header>
      {
        // title animation:
      }
        <h1>
          {output}
          {done == false ? <span
            style={{
              display: "inline-block",
              width: "18px",
              height: "25px",
              marginLeft: "5px",
              backgroundColor: "black",
              animation: "blink-animation 0.4s infinite ease-in-out",
            }}
          /> : 
          <></>}
        </h1>
      <div className="song-info-container">
        <div className="song-info-container-inner">
          <img className="song-img" src={currentSong.img} alt="Song Cover" />
          <h2 className="song-title">{currentSong.title}</h2>
          <h3 className="song-artist">{currentSong.artist}</h3>
        </div>
      </div>

      <main className="audio-player-container">
        <div className="audio-player">
          <AudioPlayer
            ref={audioRef}
            src={currentSong.audio}
            customControlsSection={["VOLUME_CONTROLS"]}
            onPlay={handlePlay}
            onPause={handlePause}
            showJumpControls={true}
          />
          <div className="media-controls-outer">
          <div className="media-controls">
            <button className='audio-button previous-button' onClick={handlePrevious}>
              <img src={Back}></img>
            </button>
            {isPlaying ? (
              <button className='audio-button previous-button' onClick={handlePause}>
              <img src={Pause}></img>
            </button>
            ) : (
              <button className='audio-button previous-button' onClick={handlePlay}>
              <img src={Play}></img>
            </button>
            )}
            <button className='audio-button previous-button' onClick={handleNext}>
              <img src={Next}></img>
            </button>
          </div>
          </div>
        </div>
      </main>
      <footer>
        <a target="_blank" class='a-link footer-link' href='https://google.com'>COOLOKAWESOME</a>
      </footer>
    </div>
  );
}

export default App;
