import '../styles/SobreMim.css';

function SobreMim() {
  return (
    <section id="sobre-mim" className="section">
      <div className="container sobre-grid">
        <div className="section-head">
          <span className="section-label">Sobre</span>
          <h2>Sobre mim</h2>
        </div>

        <div className="sobre-texto">
          <p>
            Sou Rafael Fortuna, estudante de Ciência da Computação na Universidade Federal de
            Alfenas (UNIFAL) e desenvolvedor de software focado em aplicações web e mobile.
          </p>
          <p>
            Tenho experiência em projetos reais envolvendo performance, integração com APIs e
            dados em tempo real. Já atuei na construção de sistemas com foco em usabilidade e
            eficiência, resolvendo problemas como renderização de grandes volumes de dados,
            comunicação em tempo real e consistência de informações entre usuários.
          </p>
          <p>
            Busco oportunidades para evoluir tecnicamente e contribuir com soluções que gerem
            impacto real para o usuário.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SobreMim;
