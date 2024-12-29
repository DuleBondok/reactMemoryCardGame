import React from "react";
import { useState } from "react";
import "./Easy.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import Loading from "./Loading.jsx";

function HardDifficulty() {
  const navigate = useNavigate();
  const [currentScoreHard, setCurrentScoreHard] = useState(0);
  const [bestScoreHard, setBestScoreHard] = useState(
    localStorage.getItem("bestScoreHard") || 0
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
  const idImg5 = 1199330;
  const idImg6 = 2405537;
  const idImg7 = 7246962;
  const idImg8 = 7244801;
  const idImg9 = 1673913;
  const idImg10 = 4052654;
  const idImg11 = 7401458;
  const idImg12 = 5774045;

  const PIXABAY_API_KEY = "40104432-dc1a4d1ee09039528f96981ac";
  const API_URLS = [
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg1}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg2}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg3}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg4}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg5}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg6}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg7}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg8}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg9}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg10}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg11}`,
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${idImg12}`,
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
      setCurrentScoreHard(0);
      setClickedImages(new Set());
      setGameOver(false);
      setGameWon(false);
      shuffleImages();
      return;
    }

    if (clickedImages.has(imageId)) {
      setCurrentScoreHard(0);
      if (currentScoreHard > bestScoreHard) {
        setBestScoreHard(currentScoreHard);
        localStorage.setItem("bestScoreHard", currentScoreHard);
      }
      setGameOver(true);
      toggleMessageDivVisibility();
    } else {
      setClickedImages((prev) => new Set(prev).add(imageId));
      const newScoreHard = currentScoreHard + 1;
      if (newScoreHard === 12) {
        setGameWon(true);
        setCurrentScoreHard(0);
        toggleMessageDivVisibility();
        return;
      }
      setCurrentScoreHard(newScoreHard);
      setFlipAll((prev) => !prev);
      shuffleImages();
    }
  };

  const resetGame = () => {
    setCurrentScoreHard(0);
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
        <h1 className="scoreHeader">Current Score: {currentScoreHard}</h1>
        <h1 className="scoreHeader">Best Score: {bestScoreHard}</h1>
        <div className="imagesDivHard">
          {images.map((image, index) => (
            <img
              className={`hardDiffImages ${flipAll ? "flipped" : ""}`}
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

export default HardDifficulty;
