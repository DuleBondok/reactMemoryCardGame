import React from "react";
import "./App.css";

function Loading() {
  return (
    <div className="loadingDiv">
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}

export default Loading;
