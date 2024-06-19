import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './component/NavBar';
import DonerRegister from './pages/DonerRegister';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/register" element={<DonerRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

