import React, { useEffect, useRef, useState } from "react";
import "../styles/Skills.css";

const skillsData = [
  {
    category: "Front-End",
    icon: "🎨",
    skills: ["React.js", "Angular 16+", "TypeScript", "JavaScript ES6+", "HTML5 & SEO", "CSS3", "Sass/SCSS", "Tailwind CSS", "RxJS", "Signals"]
  },
  {
    category: "Back-End & Integração",
    icon: "⚙️",
    skills: ["Node.js", "Python", "APIs REST", "Firebase", "Supabase", "Webhooks", "Testes Unitários"]
  },
  {
    category: "Bancos de Dados",
    icon: "🗄️",
    skills: ["PostgreSQL", "SQL", "MongoDB", "Firebase Realtime"]
  },
  {
    category: "DevOps & Ferramentas",
    icon: "🚀",
    skills: ["Git", "GitHub", "Docker", "Azure DevOps", "n8n", "Metodologias Ágeis", "CI/CD"]
  },
  {
    category: "UI/UX & Design",
    icon: "✨",
    skills: ["Figma", "Responsive Design", "shadcn/ui", "Design Systems", "Acessibilidade"]
  }
];

function Skills() {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); 
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className={`section skills-section ${isVisible ? "visible" : ""}`}
    >
      <div className="skills-content">
        <h2>Minha <span className="gradient-text">Caixa de Ferramentas</span></h2>
        <p className="skills-subtitle">
          Tecnologias e ferramentas que utilizo para criar soluções completas
        </p>
        <div className="skills-grid">
          {skillsData.map((category, index) => (
            <div 
              className="skill-card" 
              key={category.category}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="skill-card-header">
                <span className="skill-icon">{category.icon}</span>
                <h3>{category.category}</h3>
              </div>
              <div className="skills-tags">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    className="skill-tag" 
                    key={skill}
                    style={{ animationDelay: `${(index * 100) + (skillIndex * 50)}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;