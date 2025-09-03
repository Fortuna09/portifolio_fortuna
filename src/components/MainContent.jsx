import React from "react";
import "../styles/MainContent.css";

function MainContent() {
  return (
    <div className="main-content">
      <div className="content">
        <div className="profile-image">
          <img
            src="https://avatars.githubusercontent.com/u/132229277?s=400&u=f78d2b63deac2b56d959714a14cb931692ae8f81&v=4"
            alt="Rafael Fortuna"
          />
        </div>
        <div className="profile-info">
          <h1>Rafael Fortuna</h1>
          <p>Desenvolvedor Web</p>
          <a href="/public/Rafael-Silva-Fortuna.pdf" download="Rafael-Silva-Fortuna.pdf">
            Baixar meu Currículo
          </a>
        </div>

      </div>
    </div>
  );
}

export default MainContent;
