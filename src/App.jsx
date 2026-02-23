import React, { useState, useEffect } from 'react';

//components
import Header from './components/Header';
import MainContent from './components/MainContent';
import SobreMim from './components/SobreMim';
import Skills from './components/Skills';
import Projetos from './components/Projetos';
import Contato from './components/Contato'
import Footer from './components/Footer';
//css global
import './App.css';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const spotlightStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.04), transparent 80%)`
  };

  return (
    <div className="App" style={spotlightStyle}>
      {/* Starfield Layers - Parallax Effect */}
      <div className="stars-layer stars-small"></div>
      <div className="stars-layer stars-medium"></div>
      <div className="stars-layer stars-large"></div>
      
      {/* Nebula Clouds - Static aesthetic background */}
      <div className="nebula-layer">
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
      </div>
      
      {/* Subtle Tech Grid Overlay */}
      <div className="tech-grid"></div>
      
      <Header />
      <main>
        <MainContent />
        <SobreMim />
        <Projetos />  
        <Skills />
        <Contato />       
      </main>
      <Footer />
    </div>
  );
}

export default App;