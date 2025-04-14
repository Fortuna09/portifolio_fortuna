import React from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SobreMim from "./components/SobreMim";
import Skills from "./components/Skills";
import Projetos from "./components/Projetos";
import Footer from "./components/Footer";
import "./App.css";
import "./reset.css";

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <SobreMim />
      <Skills />
      <Projetos />
      <Footer />
    </div>
  );
}

export default App;
