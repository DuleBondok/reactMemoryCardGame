import React from "react";
import { useState } from "react";
import "./Easy.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import Loading from "./Loading.jsx";

function EasyDifficulty() {
  const navigate = useNavigate();
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || 0
  );

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flipAll, setFlipAll] = useState(false);
  const [clickedImages, setClickedImages] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isMessageDivVisible, setMessageDivVisible] = useState(false);

  const idImg1 = 417962;
  const idImg2 = 7370008;
  const idImg3 = 4678594;
  const idImg4 = 279015;

  const PIXABAY_API_KEY = "40104432-dc1a4d1ee09039528f96981ac";
  const API_URLS = [
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg1}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg2}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg3}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg4}`,
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        const fetchedImages = await Promise.all(
          API_URLS.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Failed to fetch images");
            }
            const data = await response.json();
            if (data.hits && data.hits.length > 0) {
              return data.hits[0];
            } else {
              throw new Error("No images found for a query");
            }
          })
        );

        setImages(fetchedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const shuffleImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setImages(shuffled);
  };

  const handleImageClick = (imageId) => {
    if (gameOver || gameWon) {
      setCurrentScore(0);
      setClickedImages(new Set());
      setGameOver(false);
      setGameWon(false);
      shuffleImages();
      return;
    }

    if (clickedImages.has(imageId)) {
      setCurrentScore(0);
      if (currentScore > bestScore) {
        setBestScore(currentScore);
        localStorage.setItem("bestScore", currentScore);
      }
      setGameOver(true);
      toggleMessageDivVisibility();
    } else {
      setClickedImages((prev) => new Set(prev).add(imageId));
      const newScore = currentScore + 1;
      if (newScore === 4) {
        setGameWon(true);
        setCurrentScore(0);
        toggleMessageDivVisibility();
        return;
      }
      setCurrentScore(newScore);
      setFlipAll((prev) => !prev);
      shuffleImages();
    }
  };

  const resetGame = () => {
    setCurrentScore(0);
    setClickedImages(new Set());
    setGameOver(false);
    setGameWon(false);
    shuffleImages();
  };

  const toggleMessageDivVisibility = () => {
    setMessageDivVisible(!isMessageDivVisible);
  };

  const menuFromLost = () => {
    setMessageDivVisible(!isMessageDivVisible);
    setLoading(true);
    setTimeout(() => {
      navigate("/homepage");
      setLoading(false);
    }, 1000);
  };

  const tryAgain = () => {
    resetGame();
    toggleMessageDivVisibility();
  };

  return (
    <>
      {loading && <Loading />}

      <div className="scoreDiv">
        <h1 className="scoreHeader">Current Score: {currentScore}</h1>
        <h1 className="scoreHeader">Best Score: {bestScore}</h1>
        <div className="imagesDiv">
          {images.map((image, index) => (
            <img
              className={`easyDiffImages ${flipAll ? "flipped" : ""}`}
              key={index}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => handleImageClick(image.id)}
            />
          ))}
        </div>
      </div>

      <button className="backFromEasyBtn" onClick={() => navigate("/homepage")}>
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front"> MENU </span>
      </button>

      <div
        className={`wholeScreenCoverDiv ${isMessageDivVisible ? "" : "hidden"}`}
      >
        <div className="gameOverDiv">
          <h1 className="gameOverHeader">
            {gameWon ? "You won!" : gameOver ? "You lost!" : ""}
          </h1>
          <div className="gameOverButtonsDiv">
            <button className="menuFromLostBtn" onClick={menuFromLost}>
              MENU
            </button>
            <button className="playAgainBtn" onClick={tryAgain}>
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EasyDifficulty;
