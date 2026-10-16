import { LINKS } from '../links';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Rafael Fortuna</p>
        <ul className="footer-links">
          <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-link" data-umami-event="Abriu GitHub" data-umami-event-local="rodapé">GitHub</a></li>
          <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-link" data-umami-event="Abriu LinkedIn" data-umami-event-local="rodapé">LinkedIn</a></li>
          <li><a href={`mailto:${LINKS.email}`} className="text-link" data-umami-event="Clicou no e-mail" data-umami-event-local="rodapé">E-mail</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
