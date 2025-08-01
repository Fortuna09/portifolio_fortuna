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
      linkRepo: "https://github.com/Fortuna09/Alpha",
      linkDemo: "https://alpha-feedback.netlify.app/",
    },
    {
      titulo: "Gerador de paleta de cores",
      objetivo: "Criar uma ferramenta front-end para gerar paletas de cores harmoniosas, baseada em algoritmos de teoria das cores (complementares, análogas, tríades).",
      desafio: "O desafio central foi traduzir a lógica matemática da teoria das cores em algoritmos com JavaScript para manipular valores de cor (HSL/RGB) e gerar as paletas de forma dinâmica e interativa para o usuário.",
      tecnologia: "Vue.js 3, Vuex, Sass, JavaScript (ES6+).",
      imagem: "./Projeto3.png",
      linkRepo: "https://github.com/Fortuna09/color-palette-gen",
      linkDemo: "",
    },
    {
      titulo: "Task Flow",
      objetivo: "Desenvolver uma Single Page Application (SPA) para gerenciamento de tarefas, permitindo ao usuário criar, organizar e priorizar atividades de forma intuitiva.",
      desafio: "Implementar o gerenciamento de estado reativo com Vuex para garantir a sincronização de dados entre componentes. A persistência das tarefas foi realizada com a localStorage API, oferecendo uma experiência de uso contínua mesmo após fechar o navegador.",
      tecnologia: "Vue.js 3, Vuex, Vue Router, Sass, localStorage API.",
      imagem: "./Projeto4.png",
      linkRepo: "https://github.com/Fortuna09/Task-Flow",
      linkDemo: "",
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
                <div className="projeto-botoes">
                  <a href={proj.linkDemo} target="_blank" rel="noreferrer" className="botao-demo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                    Demonstração
                  </a>
                  <a href={proj.linkRepo} target="_blank" rel="noreferrer" className="botao-repo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                    Repositório
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Projetos;