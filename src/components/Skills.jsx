import '../styles/Skills.css';

const skillsData = [
  { category: 'Front-end', skills: ['Angular (Standalone Components)', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'RxJS'] },
  { category: 'Back-end', skills: ['C#', '.NET', 'Node.js', 'Express'] },
  { category: 'APIs e integrações', skills: ['REST', 'WebSockets', 'Firebase', 'Supabase'] },
  { category: 'Bancos de dados', skills: ['PostgreSQL', 'SQL Server', 'MongoDB'] },
  { category: 'Testes e documentação', skills: ['Jasmine', 'Swagger / OpenAPI'] },
  { category: 'Ferramentas', skills: ['Git', 'GitHub', 'Docker', 'Linux', 'CI/CD'] },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Habilidades</h2>
        </div>

        <dl className="skills-list">
          {skillsData.map((grupo) => (
            <div className="skills-row" key={grupo.category}>
              <dt>{grupo.category}</dt>
              <dd>{grupo.skills.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Skills;
