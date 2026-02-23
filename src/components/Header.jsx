import React, { useState, useEffect } from "react";
import "../styles/TopBar.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['sobre-mim', 'projetos', 'skills', 'contato'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'sobre-mim', label: 'Sobre Mim' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'skills', label: 'Skills' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <header className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="logo">
        <span className="logo-text">RF</span>
        <span className="logo-dot"></span>
      </a>

      <nav className="navigation">
        <ul className="nav_selector">
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
