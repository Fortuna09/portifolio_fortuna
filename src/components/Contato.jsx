import { LinkedInIcon, MailIcon } from './icons';
import { LINKS } from '../links';
import '../styles/Contato.css';

const assunto = encodeURIComponent('Contato pelo portfólio');
const mailto = `mailto:${LINKS.email}?subject=${assunto}`;

function Contato() {
  return (
    <section id="contato" className="section">
      <div className="container">
        <div className="contato-card">
          <div>
            <span className="section-label">Contato</span>
            <h2>Vamos conversar</h2>
            <p>
              Estou aberto a oportunidades como desenvolvedor front-end ou full-stack. O jeito mais
              rápido de falar comigo é por e-mail ou pelo LinkedIn.
            </p>
          </div>

          <div className="contato-acoes">
            <a href={mailto} className="btn btn-primary">
              <MailIcon />
              {LINKS.email}
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contato;
