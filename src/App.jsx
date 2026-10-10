import Header from './components/Header';
import MainContent from './components/MainContent';
import SobreMim from './components/SobreMim';
import Projetos from './components/Projetos';
import Skills from './components/Skills';
import Contato from './components/Contato';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <MainContent />
        <SobreMim />
        <Projetos />
        <Skills />
        <Contato />
      </main>
      <Footer />
    </>
  );
}

export default App;
