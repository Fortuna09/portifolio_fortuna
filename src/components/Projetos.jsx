import { useState, useEffect } from "react";
import { ExternalIcon, GitHubIcon } from "./icons";
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
    tecnologia: ["Angular", "Node.js", "Chart.js", "Mongoose", "MongoDB", "Swagger"],
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
  const branch = repo.default_branch || 'master';
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
      finalImage = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoNameLower}/${branch}/${cleanPath}?t=${timestamp}`;
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
      finalGif = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoNameLower}/${branch}/${cleanGifPath}?t=${timestamp}`;
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
    destaque: Boolean(customData?.destaque),
    pontosFortes: customData?.pontosFortes || [],
    premio: customData?.premio || null,
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
  const [hoverDestaque, setHoverDestaque] = useState(false);
  const [todasAsTags, setTodasAsTags] = useState(['Todos']);

  // O projeto em destaque sai da grade (efeitos abaixo) para não aparecer duas vezes
  const projetoDestaque = projetos.find(p => p.destaque);

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
    const grade = projetos.filter(p => !p.destaque);
    const tags = ['Todos', ...new Set(grade.flatMap(p => p.tags || []))];
    setTodasAsTags(tags);
    setProjetosFiltrados(grade);
  }, [projetos]);

  // Filtra projetos quando o filtro ativo muda
  useEffect(() => {
    const grade = projetos.filter(p => !p.destaque);
    if (filtroAtivo === 'Todos') {
      setProjetosFiltrados(grade);
    } else {
      const filtrados = grade.filter(projeto =>
        projeto.tags?.includes(filtroAtivo)
      );
      setProjetosFiltrados(filtrados);
    }
  }, [filtroAtivo, projetos]);

  return (
    <section id="projetos" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Projetos</span>
          <h2>Projetos que construí</h2>
          <p>
            Carregados direto do meu GitHub, com o que cada um resolve e o principal desafio
            técnico.
          </p>
        </div>

        {loading && (
          <div className="projetos-loading" role="status">
            <span className="loading-spinner" aria-hidden="true" />
            Carregando projetos do GitHub…
          </div>
        )}

        {error && (
          <p className="projetos-aviso">
            Não foi possível conectar ao GitHub agora. Exibindo projetos salvos.
          </p>
        )}

        {!loading && (
          <>
            {projetoDestaque && (
              <article
                className="destaque-card"
                onMouseEnter={() => setHoverDestaque(true)}
                onMouseLeave={() => setHoverDestaque(false)}
              >
                <div className="destaque-media">
                  <img
                    src={hoverDestaque && projetoDestaque.gif ? projetoDestaque.gif : projetoDestaque.imagem}
                    alt={projetoDestaque.titulo}
                    loading="lazy"
                  />
                </div>

                <div className="destaque-info">
                  <div className="selos">
                    <span className="selo selo-destaque">Em destaque</span>
                    {projetoDestaque.linkDemo && (
                      <span className="selo selo-no-ar"><span className="selo-ponto" />No ar</span>
                    )}
                    {projetoDestaque.premio && (
                      <span className="selo selo-premio">{projetoDestaque.premio}</span>
                    )}
                  </div>

                  <h3>{projetoDestaque.titulo}</h3>
                  <p className="destaque-objetivo">{projetoDestaque.objetivo}</p>

                  {projetoDestaque.pontosFortes.length > 0 && (
                    <ul className="destaque-pontos">
                      {projetoDestaque.pontosFortes.map((ponto) => (
                        <li key={ponto}>{ponto}</li>
                      ))}
                    </ul>
                  )}

                  <ul className="tech-list">
                    {projetoDestaque.tecnologia.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>

                  <div className="destaque-acoes">
                    {projetoDestaque.linkDemo && (
                      <a href={projetoDestaque.linkDemo} target="_blank" rel="noreferrer" className="btn btn-primary">
                        <ExternalIcon />
                        Acessar o app
                      </a>
                    )}
                    <a href={projetoDestaque.linkRepo} target="_blank" rel="noreferrer" className="btn btn-secondary">
                      <GitHubIcon />
                      Ver código
                    </a>
                  </div>
                </div>
              </article>
            )}

            <div className="projetos-toolbar">
              <div className="filter-buttons" role="group" aria-label="Filtrar por tecnologia">
                {todasAsTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`filter-btn ${filtroAtivo === tag ? 'active' : ''}`}
                    aria-pressed={filtroAtivo === tag}
                    onClick={() => setFiltroAtivo(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="projetos-count">
                {projetosFiltrados.length} {projetosFiltrados.length === 1 ? 'projeto' : 'projetos'}
              </p>
            </div>

            <div className="projetos-grid">
              {projetosFiltrados.map((proj, index) => (
                <article
                  className="projeto-card"
                  key={proj.linkRepo || index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="projeto-media">
                    <img
                      src={hoveredIndex === index && proj.gif ? proj.gif : proj.imagem}
                      alt={proj.titulo}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${proj.titulo.replace(/\s+/g, '-').toLowerCase()}`;
                      }}
                    />
                    {proj.premio && <span className="selo selo-premio projeto-media-selo">{proj.premio}</span>}
                    {proj.gif && <span className="gif-hint">Passe o mouse para ver em ação</span>}
                  </div>

                  <div className="projeto-body">
                    <h3>{proj.titulo}</h3>
                    <p className="projeto-objetivo">{proj.objetivo}</p>

                    {proj.desafio && (
                      <div className="projeto-desafio">
                        <span>Desafio técnico</span>
                        <p>{proj.desafio}</p>
                      </div>
                    )}

                    <ul className="tech-list">
                      {proj.tecnologia.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>

                    <div className="projeto-links">
                      {proj.linkDemo && (
                        <a href={proj.linkDemo} target="_blank" rel="noreferrer" className="text-link">
                          <ExternalIcon />
                          Demo
                        </a>
                      )}
                      <a href={proj.linkRepo} target="_blank" rel="noreferrer" className="text-link">
                        <GitHubIcon />
                        Código
                      </a>
                      {proj.stars > 0 && <span className="projeto-stars">★ {proj.stars}</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {projetosFiltrados.length === 0 && (
              <div className="no-projects">
                <p>Nenhum projeto com a tecnologia "{filtroAtivo}".</p>
                <button type="button" className="btn btn-secondary" onClick={() => setFiltroAtivo('Todos')}>
                  Ver todos os projetos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Projetos;