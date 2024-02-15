// src/App.jsx
import React from 'react';
import Homepage from './pages/HomePage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Homepage />
    </div>
  );
}

export default App;
