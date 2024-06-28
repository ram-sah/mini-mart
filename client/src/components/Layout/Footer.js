import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="bg-dark text-white p-3 footer">
      <p className="text-center fs-6 fw-light">
        <span>
          All Right Reserved © Ram (2023 - {new Date().getFullYear()})
        </span>
      </p>
      <p className="text-center mt-4 gap-4 ">
        <a
          href="https://github.com/ram-sah/mini-mart"
          target="_blank"
          rel="noopener noreferrer"
          className="text-info text-decoration-none "
        >
          <FontAwesomeIcon icon={faGithub} size="2xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/ram-sah/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-info text-decoration-none "
        >
          <FontAwesomeIcon icon={faLinkedin} size="2xl" />
        </a>
      </p>
      <p className="text-center mt-4">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy policy</Link>
      </p>
    </div>
  );
};

export default Footer;
