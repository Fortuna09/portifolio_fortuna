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
      descricao: "Este é um projeto em React que...",
      imagem: "/images/projeto1.png", // coloca o path do print
      link: "https://github.com/rafael/projeto1",
    },
    {
      titulo: "Projeto 2",
      descricao: "Este projeto usa API externa para...",
      imagem: "/images/projeto2.png",
      link: "https://github.com/rafael/projeto2",
    },
    {
      titulo: "Projeto 2",
      descricao: "Este projeto usa API externa para...",
      imagem: "../src/assets/SobreMim.jpg",
      link: "https://github.com/rafael/projeto2",
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
