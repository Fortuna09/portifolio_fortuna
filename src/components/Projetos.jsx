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
      titulo: "Envio de Feedbacks",
      descricao: "Projeto React com API",
      imagem: "./Projeto1.png",
      link: "https://github.com/Fortuna09/Alpha",
    },
    {
      titulo: "Gerador de paleta de cores",
      descricao: "Vue.js",
      imagem: "./Projeto3.png",
      link: "https://github.com/Fortuna09/color-palette-gen",
    },
    {
      titulo: "Task Flow - Gerenciador de tarefas simples",
      descricao: "Vue.js",
      imagem: "./Projeto4.png",
      link: "https://github.com/Fortuna09/Task-Flow",
    },
    //mais projetos aqui
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
              <div className="projeto-info">
                <h3>{proj.titulo}</h3>
                <p>{proj.descricao}</p>
                <a href={proj.link} target="_blank" rel="noreferrer">
                  Ver Projeto
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Projetos;
