import { useState, useEffect } from "react";
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
  const [emFoco, setEmFoco] = useState(null);

  // Busca os projetos do GitHub ao montar o componente
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const repos = await fetchGitHubRepos();

        if (repos.length === 0) {
          setProjetos(projetosDataFallback);
          console.warn(`Nenhum repositório encontrado com a tag "${PORTFOLIO_TOPIC}". Usando dados de fallback.`);
        } else {
          const projects = await Promise.all(repos.map(repo => repoToProject(repo)));
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

  // O projeto marcado com "destaque" no portfolio.json ganha um bloco próprio;
  // depois vêm os premiados e, por fim, os demais
  const principal = projetos.find((p) => p.destaque);
  const outros = projetos
    .filter((p) => p !== principal)
    .sort((a, b) => Number(Boolean(b.premio)) - Number(Boolean(a.premio)));

  const imagem = (proj, chave) => (
    <a
      className="proj-imagem"
      href={proj.linkDemo || proj.linkRepo}
      target="_blank"
      rel="noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      data-umami-event="Abriu projeto"
      data-umami-event-projeto={proj.titulo}
      data-umami-event-destino={proj.linkDemo ? 'online (imagem)' : 'código (imagem)'}
    >
      <img
        src={emFoco === chave && proj.gif ? proj.gif : proj.imagem}
        alt=""
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${proj.titulo.replace(/\s+/g, '-').toLowerCase()}`;
        }}
      />
    </a>
  );

  const detalhes = (proj) => (
    <>
      <p className="proj-tech">{proj.tecnologia.join(', ')}</p>
      <p className="proj-objetivo">{proj.objetivo}</p>

      {proj.pontosFortes?.length > 0 && (
        <ul className="proj-pontos">
          {proj.pontosFortes.map((ponto) => (
            <li key={ponto}>{ponto}</li>
          ))}
        </ul>
      )}

      {proj.desafio && (
        <p className="proj-desafio">
          <strong>Desafio:</strong> {proj.desafio}
        </p>
      )}
    </>
  );

  return (
    <section id="projetos" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Projetos</h2>
          <p>Projetos pessoais e de hackathon, carregados direto do meu GitHub.</p>
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

        {!loading && principal && (
          <article
            className="proj-principal"
            onMouseEnter={() => setEmFoco('principal')}
            onMouseLeave={() => setEmFoco(null)}
          >
            <div className="principal-topo">
              <span>Projeto principal</span>
              {principal.linkDemo && (
                <a className="principal-status" href={principal.linkDemo} target="_blank" rel="noreferrer" data-umami-event="Abriu projeto" data-umami-event-projeto={principal.titulo} data-umami-event-destino="online">
                  <span className="status-ponto" aria-hidden="true" />
                  No ar em {principal.linkDemo.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>

            {imagem(principal, 'principal')}

            <div className="principal-texto">
              <div className="principal-intro">
                <h3>{principal.titulo}</h3>
                {detalhes(principal)}
              </div>

              <div className="principal-acoes">
                {principal.linkDemo && (
                  <a className="btn btn-primary" href={principal.linkDemo} target="_blank" rel="noreferrer" data-umami-event="Abriu projeto" data-umami-event-projeto={principal.titulo} data-umami-event-destino="online">
                    Abrir o app
                  </a>
                )}
                <a className="btn btn-secondary" href={principal.linkRepo} target="_blank" rel="noreferrer" data-umami-event="Abriu projeto" data-umami-event-projeto={principal.titulo} data-umami-event-destino="código">
                  Código no GitHub
                </a>
              </div>
            </div>
          </article>
        )}

        {!loading && (
          <ol className="proj-lista">
              {outros.map((proj) => {
                const chave = proj.linkRepo || proj.titulo;

                return (
                  <li
                    key={chave}
                    id={proj.linkRepo?.split('/').pop()}
                    className="proj"
                    onMouseEnter={() => setEmFoco(chave)}
                    onMouseLeave={() => setEmFoco(null)}
                  >
                    {imagem(proj, chave)}

                    <div className="proj-texto">
                      {proj.premio && <p className="proj-nota">{proj.premio}</p>}
                      <h3>{proj.titulo}</h3>
                      {detalhes(proj)}

                      <p className="proj-links">
                        {proj.linkDemo && (
                          <a href={proj.linkDemo} target="_blank" rel="noreferrer" data-umami-event="Abriu projeto" data-umami-event-projeto={proj.titulo} data-umami-event-destino="online">Ver online</a>
                        )}
                        <a href={proj.linkRepo} target="_blank" rel="noreferrer" data-umami-event="Abriu projeto" data-umami-event-projeto={proj.titulo} data-umami-event-destino="código">Código no GitHub</a>
                      </p>
                    </div>
                  </li>
                );
              })}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Projetos;