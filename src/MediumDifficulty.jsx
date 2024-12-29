import React from "react";
import { useState } from "react";
import "./Easy.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import Loading from "./Loading.jsx";

function MediumDifficulty() {
  const navigate = useNavigate();
  const [currentScoreMedium, setCurrentScoreMedium] = useState(0);
  const [bestScoreMedium, setBestScoreMedium] = useState(
    localStorage.getItem("bestScoreMedium") || 0
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
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true); // Set loading to true while fetching images

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
        setLoading(false); // Set loading to false after fetching images
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
      setCurrentScoreMedium(0);
      setClickedImages(new Set());
      setGameOver(false);
      setGameWon(false);
      shuffleImages();
      return; // Allow clicking to restart immediately
    }

    if (clickedImages.has(imageId)) {
      setCurrentScoreMedium(0);
      if (currentScoreMedium > bestScoreMedium) {
        setBestScoreMedium(currentScoreMedium);
        localStorage.setItem("bestScoreMedium", currentScoreMedium);
      }
      setGameOver(true);
      toggleMessageDivVisibility();
    } else {
      setClickedImages((prev) => new Set(prev).add(imageId));
      const newScoreMedium = currentScoreMedium + 1;
      if (newScoreMedium === 8) {
        setGameWon(true);
        setCurrentScoreMedium(0);
        toggleMessageDivVisibility();
        return;
      }
      setCurrentScoreMedium(newScoreMedium);
      setFlipAll((prev) => !prev);
      shuffleImages();
    }
  };

  const resetGame = () => {
    setCurrentScoreMedium(0);
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
    setLoading(true); // Show loading before navigating
    setTimeout(() => {
      navigate("/homepage");
      setLoading(false); // Set loading to false once we navigate
    }, 1000); // Simulate a delay for the loading animation
  };

  const tryAgain = () => {
    resetGame();
    toggleMessageDivVisibility();
  };

  return (
    <>
      {/* Display loading spinner if the loading state is true */}
      {loading && <Loading />}

      <div className="scoreDiv">
        <h1 className="scoreHeader">Current Score: {currentScoreMedium}</h1>
        <h1 className="scoreHeader">Best Score: {bestScoreMedium}</h1>
        <div className="imagesDivMedium">
          {images.map((image, index) => (
            <img
              className={`mediumDiffImages ${flipAll ? "flipped" : ""}`}
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

export default MediumDifficulty;
