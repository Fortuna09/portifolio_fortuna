import { LINKS } from '../links';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Rafael Fortuna</p>
        <ul className="footer-links">
          <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub</a></li>
          <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn</a></li>
          <li><a href={`mailto:${LINKS.email}`} className="text-link">E-mail</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
