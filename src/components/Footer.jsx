import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Entre em contato:{" "}
        <a href="fortunarafael9@gmail.com">
          <img src="../../public/icon_email.png" alt="Email" />fortunarafael9@gmail.com</a> |{" "}

        <a href="https://github.com/Fortuna09" target="_blank" rel="noopener noreferrer">
          <img src="../../public/icon_github.png" alt="GitHub" />GitHub</a> |{" "}

        <a href="https://www.linkedin.com/in/rafael-fortuna-990184264/" target="_blank" rel="noopener noreferrer">
          <img src="../../public/icon_linkedin.png" alt="LinkedIn" />LinkedIn</a>
      </p>
    </footer>
  );
}

export default Footer;
