import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Projetos.css";

function Projetos() {
  const projetos = [
    {
      titulo: "Projeto 1",
      descricao: "Projeto React com API",
      imagem: "../src/assets/projetos/Projeto1.png",
      link: "https://github.com/Fortuna09/Alpha",
    },
    {
      titulo: "Projeto 2",
      descricao: "HTML, CSS e JS, com API",
      imagem: "../src/assets/projetos/Projeto2.png",
      link: "https://github.com/Fortuna09/spotfy_screen",
    },
    // adicione mais projetos aqui
  ];

  return (
    <section id="projetos" className="section projetos-section">
      <h2>Meus Projetos</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={900}
        slidesPerView={1}
      >
        {projetos.map((proj, index) => (
          <SwiperSlide key={index}>
            <div className="projeto-card">
              <img src={proj.imagem} alt={proj.titulo} />
              <h3>{proj.titulo}</h3>
              <p>{proj.descricao}</p>
              <a href={proj.link} target="_blank" rel="noreferrer">
                Ver Projeto
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Projetos;
