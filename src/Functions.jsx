import React, { useState } from "react";
import ReactHowler from "react-howler";
import backgroundMusic from "/public/music.mp3";

function githubClick() {
  window.open("https://github.com/DuleBondok", "_blank");
}

function playMusic() {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };
}

export default githubClick;
