import React from 'react';
import '../styles/Contato.css';

function Contato() {
  const email = "fortunadev9@gmail.com";
  const subject = encodeURIComponent("Contato pelo Portfólio");
  const body = encodeURIComponent("Olá Rafael,\n\nEstou entrando em contato após ver seu portfólio e gostaria de conversar sobre...");
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <section id="contato" className="section contato-section">
      <div className="contato-container">
        <div className="icon-container">
          <svg className="paper-plane-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </div>

        <h2>Pronto para Transformar Ideias em Realidade?</h2>
        <p>
          Seja para dar vida a um novo projeto, otimizar uma aplicação existente ou colaborar em equipe, estou pronto para aplicar minha paixão por tecnologia e design para alcançar seus objetivos. Adoraria ouvir sobre seus desafios.
        </p>
        <div className="contato-botoes">
          <a href={mailtoLink} className="botao-contato">
            Envie sua Mensagem
          </a>
          <a href="https://www.linkedin.com/in/rafael-fortuna-990184264/" target="_blank" rel="noopener noreferrer" className="botao-contato">
            Conecte-se no LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contato;