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
          <h2>Sobre <span>Mim</span></h2>
          <p>
            Olá, sou Rafael Fortuna. Desenvolvedor de Software focado em aplicações web e mobile, com experiência em projetos reais envolvendo performance, integração com APIs e dados em tempo real.<br /><br />

            Já atuei na construção de sistemas com foco em usabilidade e eficiência, resolvendo problemas como renderização de grandes volumes de dados, comunicação em tempo real e consistência de informações entre usuários.<br /><br />

            Busco oportunidades para evoluir tecnicamente e contribuir com soluções que gerem impacto real para o usuário.
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
