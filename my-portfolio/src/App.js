import React from 'react';
import Portfolio from './portfolio'; // This pulls in your file
import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Engineering from './pages/Engineering';
import Impact from './pages/Impact';
import Creative from './pages/Creative';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar (The Sundas Khalid style) */}
        <nav style={{ padding: "20px", display: "flex", gap: "20px", justifyContent: "center" }}>
          <Link to="/">Home</Link>
          <Link to="/engineering">Operations & Engineering</Link>
          <Link to="/impact">Social Impact</Link>
          <Link to="/creative">Media & Content</Link>
        </nav>

        {/* This tells React which "page" to show based on the URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/creative" element={<Creative />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

