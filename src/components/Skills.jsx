import React, { useEffect, useRef, useState } from "react";
import "../styles/Skills.css";

function Skills() {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className={`section skills-section ${isVisible ? "visible" : ""}`}
    >
      <div className="skills-container">
        <div className="skills-image">
          <img src="./js.webp" alt="js" />
        </div>
        <div className="skills-text">
          <h2>Skills</h2>
          <ul>
            <li>HTML, CSS, JavaScript, TypeScript</li>
            <li>React, Vue</li>
            <li>SQL e NoSQL</li>
            <li>Git e GitHub</li>
            <li>Figma, UI/UX</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;
