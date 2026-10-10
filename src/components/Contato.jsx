import { LINKS } from '../links';
import '../styles/Contato.css';

const assunto = encodeURIComponent('Contato pelo portfólio');

function Contato() {
  return (
    <section id="contato" className="section">
      <div className="container contato-grid">
        <div className="section-head">
          <h2>Contato</h2>
        </div>

        <div>
          <p className="contato-texto">
            Estou aberto a oportunidades como desenvolvedor front-end ou full-stack, remoto ou em
            São Paulo e Belo Horizonte. O jeito mais rápido de falar comigo é por e-mail.
          </p>
          <a href={`mailto:${LINKS.email}?subject=${assunto}`} className="contato-email" data-umami-event="Clicou no e-mail" data-umami-event-local="contato">
            {LINKS.email}
          </a>
          <p className="contato-outros">
            Ou pelo{' '}
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" data-umami-event="Abriu LinkedIn" data-umami-event-local="contato">LinkedIn</a>
            {' '}e pelo{' '}
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" data-umami-event="Abriu GitHub" data-umami-event-local="contato">GitHub</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contato;
