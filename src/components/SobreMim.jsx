import React, { useEffect, useRef, useState } from "react";
import "../styles/SobreMim.css"; // Criamos esse CSS a seguir

function SobreMim() {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section
      id="sobre-mim"
      ref={ref}
      className={`section sobre-mim-section ${isVisible ? "visible" : ""}`}
    >
      {" "}
      <div className="sobre-mim-container">
        <div className="sobre-mim-texto">
        <h2>Sobre Mim</h2>
        <p>
         Olá, sou Rafael Fortuna. Desenvolvedor de Software e estudante de Ciência da Computação na Universidade Federal de Alfenas (UNIFAL). <br /><br />
         Sou especializado em construir interfaces web e mobile. Utilizando tecnologias como React, JavaScript e TypeScript, transformo conceitos em experiências digitais funcionais e otimizadas.<br /><br />
         Neste portfólio, você encontrará uma amostra do meu trabalho, com projetos que refletem meu compromisso com código limpo, design intuitivo e a busca constante por soluções eficientes para o usuário.
        </p>
        </div>
        <div className="sobre-mim-imagem">
          <img src="./SobreMim.jpg" alt="code" />
        </div>
        
      </div>
    </section>
  );
}

export default SobreMim;
