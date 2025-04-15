import React, { useEffect, useRef, useState } from "react";
import "../styles/SobreMim.css"; // Criamos esse CSS a seguir

function SobreMim() {
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
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section
      id="sobre-mim"
      ref={ref}
      className={`section sobre-mim-section ${isVisible ? "visible" : ""}`}
    >
      <h2>Sobre Mim</h2>
      <p>
        Sou Rafael Fortuna, desenvolvedor frontend apaixonado por criar
        interfaces intuitivas e criativas.
      </p>
    </section>
  );
}

export default SobreMim;