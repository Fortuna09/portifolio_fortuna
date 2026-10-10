import '../styles/Skills.css';

const skillsData = [
  {
    category: 'Front-end',
    skills: ['Angular 16+', 'React', 'TypeScript', 'JavaScript', 'RxJS', 'Signals', 'HTML5', 'CSS3', 'Sass/SCSS', 'Tailwind CSS'],
  },
  {
    category: 'Back-end e integração',
    skills: ['Node.js', 'Express', 'C#/.NET', 'Python', 'APIs REST', 'Webhooks', 'Firebase', 'Supabase', 'Testes unitários'],
  },
  {
    category: 'Bancos de dados',
    skills: ['PostgreSQL', 'SQL', 'MongoDB', 'Firebase Realtime'],
  },
  {
    category: 'DevOps e ferramentas',
    skills: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Azure DevOps', 'n8n', 'Metodologias ágeis'],
  },
  {
    category: 'UI/UX',
    skills: ['Figma', 'Design responsivo', 'Design systems', 'shadcn/ui', 'Acessibilidade'],
  },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Habilidades</span>
          <h2>Tecnologias que uso no dia a dia</h2>
        </div>

        <dl className="skills-list">
          {skillsData.map((grupo) => (
            <div className="skills-row" key={grupo.category}>
              <dt>{grupo.category}</dt>
              <dd>
                <ul>
                  {grupo.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Skills;
