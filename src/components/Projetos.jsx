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
      titulo: "Alpha - Cadastro Full-Stack",
      objetivo: "Desenvolver uma aplicação full-stack para cadastro de usuários, composta por um formulário de alta performance no front-end e uma API RESTful para persistência segura dos dados.",
      desafio: "Construir uma arquitetura cliente-servidor robusta. O destaque foi a implementação de validação de dados em duas camadas: no front-end com React Hook Form + Zod para feedback instantâneo ao usuário, e no back-end para garantir a integridade dos dados no MongoDB. A API foi inteiramente documentada com Swagger para facilitar o consumo e os testes.",
      tecnologia: "React.js, React Router, React Hook Form + Zod (validação), Axios (requisições HTTP), Bootstrap + CSS personalizado, Node.js + Express.js, Mongoose (ORM para MongoDB), Dotenv (variáveis de ambiente), CORS (Cross-Origin Resource Sharing), Swagger (documentação da API), MongoDB Atlas.",
      imagem: "./Projeto1.png",
      link: "https://github.com/Fortuna09/Alpha",
    },
    {
      titulo: "Gerador de paleta de cores",
      objetivo: "Criar uma ferramenta front-end para gerar paletas de cores harmoniosas, baseada em algoritmos de teoria das cores (complementares, análogas, tríades).",
      desafio: "O desafio central foi traduzir a lógica matemática da teoria das cores em algoritmos com JavaScript para manipular valores de cor (HSL/RGB) e gerar as paletas de forma dinâmica e interativa para o usuário.",
      tecnologia: "Vue.js 3, Vuex, Sass, JavaScript (ES6+).",
      imagem: "./Projeto3.png",
      link: "https://github.com/Fortuna09/color-palette-gen",
    },
    {
      titulo: "Task Flow",
      objetivo: "Desenvolver uma Single Page Application (SPA) para gerenciamento de tarefas, permitindo ao usuário criar, organizar e priorizar atividades de forma intuitiva.",
      desafio: "Implementar o gerenciamento de estado reativo com Vuex para garantir a sincronização de dados entre componentes. A persistência das tarefas foi realizada com a localStorage API, oferecendo uma experiência de uso contínua mesmo após fechar o navegador.",
      tecnologia: "Vue.js 3, Vuex, Vue Router, Sass, localStorage API.",
      imagem: "./Projeto4.png",
      link: "https://github.com/Fortuna09/Task-Flow",
    },
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
                <div className="tecnologias-container">
                  {proj.tecnologia.split(/, | - /).map((tech) => (
                    tech && <span key={tech} className="tech-tag">{tech.trim()}</span>
                  ))}
                </div>
                <p>
                  <strong>Objetivo:</strong> {proj.objetivo}
                </p>
                <p>
                  <strong>Desafio:</strong> {proj.desafio}
                </p>
                <a href={proj.link} target="_blank" rel="noreferrer">
                  Ver Repositório
                </a>
                {/* Futuramente o botão da demo virá aqui ao lado */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Projetos;
