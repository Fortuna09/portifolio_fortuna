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
          Sou Rafael Fortuna, apaixonado por tecnologia e fascinado pelo poder da programação para transformar ideias em soluções reais. 
          Tenho interesse especial por desenvolvimento web e mobile, com foco em criar interfaces intuitivas, responsivas e que proporcionem 
          uma boa experiência ao usuário.
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
