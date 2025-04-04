import React from "react";
import "./App.css";
import "./reset.css";

function App() {
  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-content">
          <img src="/R_logo.png" className="logo-girando" alt="logo" />
          <h1>Rafael Fortuna</h1>
        </div>

        <div className="navigation">
          <ul className="nav_selector">
            <li>
              <button>Projetos</button>
            </li>
            <li>
              <button>Certificados</button>
            </li>
            <li>
              <button>Contatos</button>
            </li>
          </ul>
        </div>
      </div> 

      <div className="main-content">
        <div className="content">
          <h2>Olá, sou o Rafael Fortuna</h2>
          <p>Desenvolvedor Frontend</p>
          <p>Estou sempre aprendendo e buscando novos desafios.</p>
        </div>

      </div>

      <div className="footer">

      </div>

      
    </div>
    


  );
}

export default App;
