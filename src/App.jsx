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
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(179, 66, 66, 0.15), transparent 80%)`
  };

  return (
    <div className="App" style={spotlightStyle}>
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