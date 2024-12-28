import { useState } from "react";
import "./App.css";
import githubClick from "./Functions";
import ReactHowler from "react-howler";
import backgroundMusic from "/public/music.mp3";

function HomePage() {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  const [content, setContent] = useState("original");

  const showOriginalContent = () => {
    setContent("original");
  };

  const showNewContent = () => {
    setContent("new");
  };

  const showDifficultyContent = () => {
    setContent("difficulty");
  };

  return (
    <>
      <ReactHowler src={backgroundMusic} playing={isPlaying} loop />
      <div className="mainHomePageDiv">
        <img src="public/paris2.jpg" className="parisImg"></img>
        <div className="gameNameDiv">
          <img src="public/metropolitan.png" className="gameNameIcon"></img>
          <h1 className="gameNameHeader">CAPITAL CITIES</h1>
        </div>
        <h1 className="gameDescriptionHeader">Memory Card Game</h1>
        <div className="footerDiv">
          <img
            src="public/github.png"
            className="githubIcon"
            id="githubIcon"
            onClick={githubClick}
          ></img>
          <h1 className="footerText">DuleBondok @ 2024</h1>
        </div>
        <div className="homeCommandsDiv">
          {content === "original" && (
            <>
              <h1
                className="homeCommandsHeader"
                onClick={showDifficultyContent}
              >
                START GAME
              </h1>
              <h1 className="homeCommandsHeader" onClick={showNewContent}>
                HOW TO PLAY
              </h1>
              <img
                src={isPlaying ? "/public/sound.png" : "/public/noSound.png"}
                onClick={toggleMusic}
                className="soundIcon"
              ></img>
            </>
          )}
          {content === "new" && (
            <>
              <h1 className="howToHeader">
                Try not to click on the same city twice!
              </h1>
              <button className="howToCloseBtn" onClick={showOriginalContent}>
                OKAY!
              </button>
            </>
          )}
          {content === "difficulty" && (
            <>
              <h1 className="chooseDiffHeader">Choose difficulty</h1>
              <button className="easyDiffBtn">EASY</button>
              <button className="mediumDiffBtn">MEDIUM</button>
              <button className="hardDiffBtn">HARD</button>
              <img
                className="backIcon"
                src="/public/back.png"
                onClick={showOriginalContent}
              ></img>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
