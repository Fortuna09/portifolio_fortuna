import React, { useState, useEffect } from "react";
import "../styles/Projetos.css";

// =============================================================================
// CONFIGURAÇÃO DA API
// =============================================================================
const GITHUB_USERNAME = "Fortuna09";
const PORTFOLIO_TOPIC = "portfolio";

// =============================================================================
// Dados de fallback 
// =============================================================================
const projetosDataFallback = [
  {
    titulo: "Alpha Desk - Envio de feedback e análise de dados",
    objetivo: "Desenvolver uma aplicação full-stack para cadastro de usuários, composta por um formulário de alta performance, e gráficos para analisar as métricas no front-end e uma API RESTful para persistência segura dos dados.",
    desafio: "Construir uma arquitetura cliente-servidor robusta com validação de dados em duas camadas (front-end e back-end) e documentação completa da API com Swagger.",
    tecnologia: "Angular.js, Node.js, Chart.js, Mongoose, MongoDB, Swagger",
    imagem: "/projeto1-foto.png",
    gif: "/projeto1-gif.gif",
    linkRepo: "https://github.com/Fortuna09/alpha-feedback-angular",
    linkDemo: "https://alpha-feedback.netlify.app/",
    tags: ["Angular", "TypeScript", "Node.js", "Dashboard", "Full-Stack"]
  },
];

// =============================================================================
// Funções de API do GitHub
// =============================================================================

/**
 * Busca todos os repositórios públicos que contêm a tag 'portfolio'
 */
async function fetchGitHubRepos() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos = await response.json();

  // Filtra apenas os repos que têm a tag 'portfolio'
  return repos.filter(repo =>
    repo.topics && repo.topics.includes(PORTFOLIO_TOPIC)
  );
}

/**
 * Tenta buscar o arquivo portfolio.json de um repositório específico
 * Este arquivo pode conter dados customizados como objetivo, desafio, gif, etc.
 */
async function fetchPortfolioJson(repoName) {
  const repoLower = repoName.toLowerCase();
  const timestamp = new Date().getTime();
  
  // Lista de tentativas: master e main
  const branches = ['master', 'main'];
  
  for (const branch of branches) {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoLower}/${branch}/portfolio.json?t=${timestamp}`
      );
      
      if (response.ok) {
        return await response.json();
      }
    } catch {
      continue;
    }
  }
  return null; // Se não achou em nenhuma branch, retorna null
}

/**
 * Primeira letra dos topics maiuscula
 */
const capitalize = (str) => {
  if (typeof str !== 'string' || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converte um repositório do GitHub para o formato do portfólio
 */
async function repoToProject(repo) {
  // Busca o JSON. Se der 404, customData será null.
  const customData = await fetchPortfolioJson(repo.name);
  const repoNameLower = repo.name.toLowerCase();
  const timestamp = new Date().getTime();

  const githubTechs = repo.topics
    ?.filter(t => t !== PORTFOLIO_TOPIC)
    .map(capitalize);

  const finalTechs = customData?.tecnologia
    ? (Array.isArray(customData.tecnologia) ? customData.tecnologia : customData.tecnologia.split(',').map(t => t.trim()))
    : (githubTechs && githubTechs.length > 0 ? githubTechs : [repo.language || "JavaScript"]);

  // --- LÓGICA DE IMAGEM ---
  let finalImage = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;
  if (customData?.imagem) {
    if (customData.imagem.startsWith('http')) {
      finalImage = customData.imagem;
    } else {
      const cleanPath = customData.imagem.startsWith('/') ? customData.imagem.slice(1) : customData.imagem;
      finalImage = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoNameLower}/master/${cleanPath}?t=${timestamp}`;
    }
  }

  // --- LÓGICA DO GIF (Onde estava o problema) ---
  let finalGif = null;
  if (customData?.gif) {
    if (customData.gif.startsWith('http')) {
      finalGif = customData.gif;
    } else {
      const cleanGifPath = customData.gif.startsWith('/') ? customData.gif.slice(1) : customData.gif;
      // Monta a URL RAW para o GIF
      finalGif = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoNameLower}/master/${cleanGifPath}?t=${timestamp}`;
    }
  }

  return {
    titulo: customData?.titulo || repo.name.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    objetivo: customData?.objetivo || repo.description || "Projeto desenvolvido para demonstrar habilidades técnicas.",
    desafio: customData?.desafio || "Implementar uma solução funcional seguindo boas práticas de desenvolvimento.",
    tecnologia: finalTechs,
    imagem: finalImage,
    gif: finalGif, 
    linkRepo: repo.html_url,
    linkDemo: customData?.linkDemo || repo.homepage || "",
    tags: customData?.tags || githubTechs || [repo.language || "Code"],
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
}

// =============================================================================
// Componente Principal
// =============================================================================

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [projetosFiltrados, setProjetosFiltrados] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [todasAsTags, setTodasAsTags] = useState(['Todos']);

  // Busca os projetos do GitHub ao montar o componente
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const repos = await fetchGitHubRepos();

        if (repos.length === 0) {
          // Se não encontrou repos com a tag, usa o fallback
          setProjetos(projetosDataFallback);
          console.warn(`Nenhum repositório encontrado com a tag "${PORTFOLIO_TOPIC}". Usando dados de fallback.`);
        } else {
          // Converte todos os repos para o formato do portfólio
          const projectPromises = repos.map(repo => repoToProject(repo));
          const projects = await Promise.all(projectPromises);
          setProjetos(projects);
        }

        setError(null);
      } catch (err) {
        console.error("Erro ao buscar projetos do GitHub:", err);
        setError(err.message);
        setProjetos(projetosDataFallback);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Atualiza as tags disponíveis quando os projetos mudam
  useEffect(() => {
    const tags = ['Todos', ...new Set(projetos.flatMap(p => p.tags || []))];
    setTodasAsTags(tags);
    setProjetosFiltrados(projetos);
  }, [projetos]);

  // Filtra projetos quando o filtro ativo muda
  useEffect(() => {
    if (filtroAtivo === 'Todos') {
      setProjetosFiltrados(projetos);
    } else {
      const filtrados = projetos.filter(projeto =>
        projeto.tags?.includes(filtroAtivo)
      );
      setProjetosFiltrados(filtrados);
    }
  }, [filtroAtivo, projetos]);

  return (
    <section id="projetos" className="section projetos-section">
      <h2>Meus Projetos</h2>

      {/* Loading */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Buscando projetos do GitHub...</p>
        </div>
      )}

      {error && (
        <p className="error-message">
          Não foi possível conectar ao GitHub. Exibindo projetos salvos.
        </p>
      )}

      {!loading && (
        <>
          {/* Filtros */}
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

          {/* Contador de projetos */}
          <p className="projetos-count">
            <span className="count-number">{projetosFiltrados.length}</span> 
            {projetosFiltrados.length === 1 ? ' projeto encontrado' : ' projetos encontrados'}
          </p>

          <div className="projetos-grid">
            {projetosFiltrados.map((proj, index) => (
              <article
                className="projeto-card"
                key={proj.linkRepo || index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Imagem com overlay */}
                <div className="projeto-image-container">
                  <img
                    src={hoveredIndex === index && proj.gif ? proj.gif : proj.imagem}
                    alt={proj.titulo}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${proj.titulo.replace(/\s+/g, '-').toLowerCase()}`;
                    }}
                  />
                  {proj.gif && (
                    <div className="gif-indicator">
                      <span>▶</span> Coloque o mouse para ver o GIF
                    </div>
                  )}
                  {proj.stars > 0 && (
                    <div className="stars-badge">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {proj.stars}
                    </div>
                  )}
                </div>

                <div className="projeto-info">
                  <h3>{proj.titulo}</h3>
                  
                  {/* Tags de tecnologia */}
                  <div className="tecnologias-container">
                    {proj.tecnologia.slice(0, 5).map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  {/* Objetivo */}
                  <div className="projeto-descricao">
                    <span className="info-label">Objetivo:</span>
                    <p>{proj.objetivo}</p>
                  </div>

                  {/* Desafio */}
                  {proj.desafio && (
                    <div className="projeto-descricao">
                      <span className="info-label">Desafio:</span>
                      <p>{proj.desafio}</p>
                    </div>
                  )}

                  {/* Tecnologias usadas */}
                  <div className="projeto-tecnologias">
                    <span className="info-label">Tecnologias:</span>
                    <p>{Array.isArray(proj.tecnologia) ? proj.tecnologia.join(', ') : proj.tecnologia}</p>
                  </div>

                  {/* Botões */}
                  <div className="projeto-botoes">
                    {proj.linkDemo && (
                      <a href={proj.linkDemo} target="_blank" rel="noreferrer" className="botao-demo">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        Demo
                      </a>
                    )}
                    <a href={proj.linkRepo} target="_blank" rel="noreferrer" className="botao-repo">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Código
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mensagem se não houver projetos */}
          {projetosFiltrados.length === 0 && (
            <div className="no-projects">
              <svg className="no-projects-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
              <h3>Nenhum projeto encontrado</h3>
              <p>Não há projetos com a tag "{filtroAtivo}"</p>
              <button className="reset-filter-btn" onClick={() => setFiltroAtivo('Todos')}>
                Ver todos os projetos
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Projetos;