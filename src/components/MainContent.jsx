import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import { LINKS } from '../links';
import '../styles/MainContent.css';

const fatos = [
  { titulo: 'Foco', valor: 'Front-end com Angular e React' },
  { titulo: 'Também atuo com', valor: 'Node.js e C#/.NET' },
  { titulo: 'Formação', valor: 'Ciência da Computação · UNIFAL' },
];

function MainContent() {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">Desenvolvedor de software</p>
          <h1 id="hero-titulo">Rafael Fortuna</h1>
          <p className="hero-lead">
            Desenvolvo interfaces web com Angular, React e TypeScript e levo os projetos até o
            back-end quando é preciso. Gosto de produto no ar, código legível e de resolver
            problemas de performance e de dados em tempo real.
          </p>

          <div className="hero-actions">
            <a href="#projetos" className="btn btn-primary">
              Ver projetos
              <ArrowRightIcon />
            </a>
            <a href={LINKS.curriculo} download className="btn btn-secondary">
              <DownloadIcon />
              Baixar currículo
            </a>
          </div>

          <ul className="hero-links">
            <li>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-link">
                <GitHubIcon /> GitHub
              </a>
            </li>
            <li>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
                <LinkedInIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${LINKS.email}`} className="text-link">
                <MailIcon /> {LINKS.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="hero-photo">
          <img
            src="https://avatars.githubusercontent.com/u/132229277?s=480&v=4"
            alt="Foto de Rafael Fortuna"
            width="280"
            height="280"
          />
        </div>
      </div>

      <div className="container">
        <dl className="hero-facts">
          {fatos.map((fato) => (
            <div key={fato.titulo}>
              <dt>{fato.titulo}</dt>
              <dd>{fato.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default MainContent;
