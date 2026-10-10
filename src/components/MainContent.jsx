import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import { LINKS } from '../links';
import '../styles/MainContent.css';

const fatos = [
  { titulo: 'Hoje', valor: 'Desenvolvedor Full Stack na Uaisoft' },
  { titulo: 'Formação', valor: 'Ciência da Computação na UNIFAL, conclusão em 2026' },
  { titulo: 'Onde', valor: 'Remoto, São Paulo ou Belo Horizonte' },
];

function MainContent() {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">Desenvolvedor Front-End</p>
          <h1 id="hero-titulo">Rafael Fortuna</h1>
          <p className="hero-lead">
            Construo interfaces com Angular, React e TypeScript para sistemas ERP, plataformas
            SaaS e aplicações científicas. Também trabalho no back-end com C#, .NET e Node.js, o
            que me deixa participar das decisões de arquitetura de ponta a ponta.
          </p>

          <div className="hero-actions">
            <a href="#projetos" className="btn btn-primary">
              Ver projetos
              <ArrowRightIcon />
            </a>
            <a href={LINKS.curriculo} download={LINKS.curriculoNome} className="btn btn-secondary" data-umami-event="Baixou currículo" data-umami-event-local="início">
              <DownloadIcon />
              Baixar currículo
            </a>
          </div>

          <ul className="hero-links">
            <li>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-link" data-umami-event="Abriu GitHub" data-umami-event-local="início">
                <GitHubIcon /> GitHub
              </a>
            </li>
            <li>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-link" data-umami-event="Abriu LinkedIn" data-umami-event-local="início">
                <LinkedInIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${LINKS.email}`} className="text-link" data-umami-event="Clicou no e-mail" data-umami-event-local="início">
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
