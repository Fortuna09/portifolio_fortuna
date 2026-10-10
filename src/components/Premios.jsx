import '../styles/Premios.css';

const premios = [
  {
    data: 'ago 2026',
    titulo: '3º lugar no Hackathon Reply 2026',
    local: 'Belo Horizonte · premiação em equipe',
    descricao:
      'O desafio era montar uma orquestração de agentes de IA que funcionasse como uma linha de produção de software: alguém descreve o que precisa e os agentes entregam a tela pronta e testada. Com a minha equipe, desenvolvemos o Squad Forge, em que três agentes (PO, Dev e QA) dividem o trabalho e nenhuma tela é liberada sem passar pelo QA.',
    projeto: '#squad-forge',
    foto: './premio-hackathon-reply.jpg',
    fotoAlt: 'Rafael segurando o cheque simbólico do 3º lugar no Hackathon Reply 2026',
  },
];

function Premios() {
  return (
    <section id="premios" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Prêmios</h2>
        </div>

        <ol className="premios-lista">
          {premios.map((premio) => (
            <li className="premio-item" key={premio.titulo}>
              <p className="premio-data">{premio.data}</p>
              <div>
                <h3>{premio.titulo}</h3>
                <p className="premio-local">{premio.local}</p>
                <p className="premio-descricao">{premio.descricao}</p>
                {premio.projeto && (
                  <a className="premio-link" href={premio.projeto}>
                    Ver o projeto
                  </a>
                )}
                <img className="premio-foto" src={premio.foto} alt={premio.fotoAlt} loading="lazy" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Premios;
