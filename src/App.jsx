import React, { useState } from "react";
import HomePage from "./HomePage.jsx";
import EasyDifficulty from "./EasyDifficulty.jsx";
import MediumDifficulty from "./MediumDifficulty.jsx";
import HardDifficulty from "./HardDifficulty.jsx";
import Loading from "./Loading.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/easy-difficulty" element={<EasyDifficulty />} />
          <Route path="/medium-difficulty" element={<MediumDifficulty />} />
          <Route path="/hard-difficulty" element={<HardDifficulty />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
