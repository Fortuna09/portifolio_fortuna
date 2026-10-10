import '../styles/SobreMim.css';

function SobreMim() {
  return (
    <section id="sobre-mim" className="section">
      <div className="container sobre-grid">
        <div className="section-head">
          <h2>Sobre mim</h2>
        </div>

        <div className="sobre-texto">
          <p>
            Sou desenvolvedor front-end e trabalho principalmente com Angular, React e TypeScript,
            construindo interfaces escaláveis, arquitetura de componentes e integração com APIs
            REST. Já passei por sistemas ERP, plataformas SaaS e aplicações para pesquisa
            científica.
          </p>
          <p>
            Também atuo no back-end com C#, .NET e Node.js e com bancos de dados. Isso me permite
            participar das decisões de arquitetura de ponta a ponta e conversar direto com os
            times de back-end, sem depender de intermediação para entender ou ajustar uma
            integração.
          </p>
          <p>
            Gosto de melhorias que dá para medir: já reduzi em mais de 80% as requisições a APIs
            externas com uma estratégia de cache, cortei cerca de 60% das re-renderizações de uma
            aplicação React e modernizei um sistema que não era atualizado desde 2021.
          </p>
          <p>
            Estudo Ciência da Computação na UNIFAL, com conclusão prevista para 2026, e tenho
            inglês avançado.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SobreMim;
