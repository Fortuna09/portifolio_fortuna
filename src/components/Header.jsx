import { useState, useEffect } from 'react';
import { LINKS } from '../links';
import '../styles/TopBar.css';

const navItems = [
  { id: 'sobre-mim', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'contato', label: 'Contato' },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);

      // A última seção é curta e nunca chega ao topo da tela: no fim da página, ela é a ativa
      const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (noFim) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      const atual = navItems.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom >= 120;
      });
      setActiveSection(atual ? atual.id : '');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container top-bar-inner">
        <a href="#" className="logo">Rafael Fortuna</a>

        <nav aria-label="Seções">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={LINKS.curriculo} download={LINKS.curriculoNome} className="top-bar-cv">
          Currículo
        </a>
      </div>
    </header>
  );
}

export default Header;
