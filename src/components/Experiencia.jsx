import '../styles/Experiencia.css';

const experiencias = [
  {
    empresa: 'Uaisoft',
    cargo: 'Desenvolvedor Full Stack',
    periodo: 'mai 2026 — atual',
    projeto: 'Projeto Olimpo',
    stack: 'Angular, TypeScript, C#, .NET e APIs REST',
    entregas: [
      'Estruturei o novo sistema web da empresa em Angular, definindo a arquitetura inicial com Standalone Components.',
      'Modernizei o simulador de notas fiscais de entrada do ERP, que não era atualizado desde 2021, reescrevendo-o para o novo framework da empresa.',
      'Participo das decisões de arquitetura na migração gradual do ERP de desktop para a web e sou referência técnica para Suporte, Requisitos e QA.',
    ],
  },
  {
    empresa: 'FAPEMIG',
    cargo: 'Desenvolvedor Front-End',
    periodo: 'dez 2024 — mai 2026',
    projeto: 'Projeto Astro 3D',
    stack: 'Angular, TypeScript, PostgreSQL, APIs REST e Linux',
    entregas: [
      'Desenvolvi a interface de uma plataforma de visualização e análise de dados astronômicos, integrada a APIs científicas da NASA/SOHO.',
      'Implementei uma estratégia de cache que reduziu em mais de 80% as requisições a APIs externas.',
      'Reescrevi algoritmos de Python para TypeScript, levando o processamento para o navegador e diminuindo a dependência do servidor.',
    ],
  },
  {
    empresa: 'Polygon Soluções Computacionais',
    cargo: 'Desenvolvedor Front-End',
    periodo: 'abr 2024 — out 2024',
    projeto: 'Projeto Diet Smart',
    stack: 'React, TypeScript, Firebase, APIs REST e WebSockets',
    entregas: [
      'Desenvolvi interfaces responsivas para uma plataforma de acompanhamento nutricional.',
      'Reduzi cerca de 60% das re-renderizações da interface com virtualização de listas.',
      'Implementei funcionalidades em tempo real com WebSockets e Firebase e corrigi inconsistências de fuso horário que afetavam os agendamentos.',
    ],
  },
];

function Experiencia() {
  return (
    <section id="experiencia" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Experiência</h2>
        </div>

        <ol className="exp-lista">
          {experiencias.map((exp) => (
            <li className="exp-item" key={exp.empresa}>
              <p className="exp-periodo">{exp.periodo}</p>
              <div>
                <h3>
                  {exp.cargo} <span className="exp-empresa">· {exp.empresa}</span>
                </h3>
                <p className="exp-contexto">
                  {exp.projeto}, com {exp.stack}
                </p>
                <ul className="exp-entregas">
                  {exp.entregas.map((entrega) => (
                    <li key={entrega}>{entrega}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Experiencia;
