import React from "react";
//import "./Header.css"; // Opcional: cria se quiser separar o CSS

function Header() {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <img src="/R_logo.png" className="logo-girando" alt="logo" />
        <h1>Rafael Fortuna</h1>
      </div>

      <div className="navigation">
        <ul className="nav_selector">
          <li>
            <a href="#projetos">
              <button>Projetos</button>
            </a>
          </li>
          <li>
            <a href="#skills">
              <button>Skills</button>
            </a>
          </li>
          <li>
            <a href="#sobre-mim">
              <button>Sobre Mim</button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
