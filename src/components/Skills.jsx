import React, { useEffect, useRef, useState } from "react";
import "../styles/Skills.css";

const skillsData = [
  {
    category: "Front-End",
    skills: ["HTML5", "CSS3", "Sass", "JavaScript (ES6+)", "TypeScript", "React", "Vue.js", "Redux", "Vuex"]
  },
  {
    category: "Back-End",
    skills: ["Node.js", "Express.js", "RESTful APIs"]
  },
  {
    category: "Bancos de Dados",
    skills: [ "SQL", "NoSQL", "MongoDB", "Mongoose", "PostgreSQL", "Firebase", "MySQL"]
  },
  {
    category: "Design e UI/UX",
    skills: ["Figma", "Design Responsivo", "Prototipagem"]
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
        <h2>Minha Caixa de Ferramentas</h2>
        <p className="skills-subtitle">
          As tecnologias e ferramentas que utilizo para transformar ideias em produtos digitais.
        </p>
        <div className="skills-categories">
          {skillsData.map((category, index) => (
            <div 
              className="skill-category" 
              key={category.category}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <h3>{category.category}</h3>
              <div className="skills-cloud">
                {category.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>{skill}</span>
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