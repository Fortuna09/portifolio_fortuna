import React, { useState, useEffect } from "react";
import "../styles/Projetos.css";

const projetosData = [
  {
    titulo: "PoloData - Dashboard de Análise de Dados",
    objetivo: "Desenvolver uma interface de dashboard responsiva e interativa para a visualização e análise de dados de vendas, faturamento e clientes, oferecendo insights de forma clara e intuitiva.",
    desafio: "O desafio foi integrar uma biblioteca de gráficos de forma performática, construir uma arquitetura de componentes modulares e garantir a responsividade completa das visualizações de dados em telas menores.",
    tecnologia: "React.js, Chart.js (ou Recharts), Material-UI (ou Tailwind CSS), CSS Grid, Flexbox, Design Responsivo",
    imagem: "/projeto2-foto.png",
    gif: "/projeto2-gif.gif",
    linkRepo: "https://github.com/Fortuna09/Polo",
    linkDemo: "https://polodata.netlify.app/",
    tags: ["React.js", "Dashboard", "Data-Viz", "Front-end"]
  },
  {
    titulo: "Alpha - Cadastro Full-Stack",
    objetivo: "Desenvolver uma aplicação full-stack para cadastro de usuários, composta por um formulário de alta performance no front-end e uma API RESTful para persistência segura dos dados.",
    desafio: "Construir uma arquitetura cliente-servidor robusta com validação de dados em duas camadas (front-end e back-end) e documentação completa da API com Swagger.",
    tecnologia: "React.js, React Hook Form, Zod, Axios, Node.js, Express.js, Mongoose, MongoDB, Swagger",
    imagem: "/Projeto1.png",
    gif: null,
    linkRepo: "https://github.com/Fortuna09/Alpha",
    linkDemo: "https://alpha-feedback.netlify.app/",
    tags: ["React.js", "Node.js", "Full-Stack"]
  },
  {
    titulo: "Gerador de paleta de cores",
    objetivo: "Criar uma ferramenta front-end para gerar paletas de cores harmoniosas, baseada em algoritmos de teoria das cores.",
    desafio: "Traduzir a lógica matemática da teoria das cores em algoritmos com JavaScript para manipular valores HSL/RGB e gerar paletas de forma dinâmica e interativa.",
    tecnologia: "Vue.js 3, Vuex, Sass, JavaScript (ES6+)",
    imagem: "/Projeto3.png",
    gif: null,
    linkRepo: "https://github.com/Fortuna09/color-palette-gen",
    linkDemo: "",
    tags: ["Vue.js"]
  },
  {
    titulo: "Task Flow",
    objetivo: "Desenvolver uma Single Page Application (SPA) para gerenciamento de tarefas, permitindo ao usuário criar, organizar e priorizar atividades de forma intuitiva.",
    desafio: "Implementar o gerenciamento de estado reativo com Vuex para garantir a sincronização de dados e persistir as tarefas com a localStorage API.",
    tecnologia: "Vue.js 3, Vuex, Vue Router, Sass, localStorage API",
    imagem: "/Projeto4.png",
    gif: null,
    linkRepo: "https://github.com/Fortuna09/Task-Flow",
    linkDemo: "",
    tags: ["Vue.js"]
  },
];

const todasAsTags = ['Todos', ...new Set(projetosData.flatMap(p => p.tags))];


function Projetos() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  const [projetosFiltrados, setProjetosFiltrados] = useState(projetosData);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (filtroAtivo === 'Todos') {
      setProjetosFiltrados(projetosData);
    } else {
      const filtrados = projetosData.filter(projeto =>
        projeto.tags.includes(filtroAtivo)
      );
      setProjetosFiltrados(filtrados);
    }
  }, [filtroAtivo]);

  return (
    <section id="projetos" className="section projetos-section">
      <h2>Meus Projetos</h2>

      <div className="filter-buttons">
        {todasAsTags.map(tag => (
          <button
            key={tag}
            className={`filter-btn ${filtroAtivo === tag ? 'active' : ''}`}
            onClick={() => setFiltroAtivo(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="projetos-grid">
        {projetosFiltrados.map((proj, index) => (
          <div
            className="projeto-card"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={hoveredIndex === index && proj.gif ? proj.gif : proj.imagem}
              alt={proj.titulo}
            />
            <div className="projeto-info">
              <h3>{proj.titulo}</h3>
              <div className="tecnologias-container">
                {proj.tecnologia.split(/, /).map((tech) => (
                  tech && <span key={tech} className="tech-tag">{tech.trim()}</span>
                ))}
              </div>
              <p><strong>Objetivo:</strong> {proj.objetivo}</p>
              <p><strong>Desafio:</strong> {proj.desafio}</p>
              <div className="projeto-botoes">
                {proj.linkDemo && (
                  <a href={proj.linkDemo} target="_blank" rel="noreferrer" className="botao-demo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                    Demonstração
                  </a>
                )}
                <a href={proj.linkRepo} target="_blank" rel="noreferrer" className="botao-repo">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                  Repositório
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projetos;