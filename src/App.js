// eslint-disable-next-line

import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Star } from './images/Star'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  const helloRef = useRef(null);
  const welcomeRef = useRef(null);
  /* const navRef = useRef(null); */
  const sectionRefs = useRef([]);
  const [navbarVisible, setNavbarVisible] = useState(false); // Track navbar visibility

  useEffect(() => {
    // typewriting animation for the intro
    gsap.to(helloRef.current, {
      duration: 2,
      text: "Hello, my name is Tara Denaud!",
      ease: "power1.inOut",
      delay: 0.5,
    });

    gsap.to(welcomeRef.current, {
      duration: 2,
      text: "Welcome to my portfolio",
      ease: "power1.inOut",
      delay: 3,
    });
    

    // setion that triggers animation when scrolling
    sectionRefs.current.forEach((el) => {
      gsap.fromTo(el,
        { y: 100, opacity: 0 }, // Initial position (down) and opacity
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });

    // Nav bar trigger (to show when the user scrolls to the "About me section")
    ScrollTrigger.create({
      trigger: "#about",
      start: "top center", // When "About Me" section reaches the center of the page
      onEnter: () => setNavbarVisible(true), // Show the navbar 
      onLeaveBack: () => setNavbarVisible(false), // Hide the navbar
    });
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className={`navbar ${navbarVisible ? "visible" : ""}`}>
        <ul>
          <li onClick={() => scrollToSection('about')}>About Me</li>
          <li onClick={() => scrollToSection('experience')}>Experience</li>
          <li onClick={() => scrollToSection('community')}>Community Involvement</li>
          <li onClick={() => scrollToSection('projects')}>Projects</li>
          <li onClick={() => scrollToSection('contact')}>Contact Me</li>
        </ul>
        <div className="navbar-icons">
          <a href="https://github.com/taradenaud" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/taradenaud" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:taradenaud4@gmail.com"  target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </nav>

      /* Section with the Star */
      <header className="App-header">
        <div className="welcome-container">
          <h1 ref={helloRef}></h1>
          <h2 ref={welcomeRef}></h2>
        </div>
        <Canvas className="star-canvas">
          <ambientLight intensity={1} />
          <directionalLight position={[2, 5, 0]} />
          <Star /> 
        </Canvas>
      </header>

      /* Websie sections with the transitions */
      <section ref={(el) => (sectionRefs.current[0] = el)} id="about" className="section container">
        <h1>About Me</h1>
        <p>Brief description about yourself.</p>
      </section>

      <section ref={(el) => (sectionRefs.current[1] = el)} id="experience" className="section container">
        <h2>Experience</h2>
        <p>Describe your professional experience here.</p>
      </section>

      <section ref={(el) => (sectionRefs.current[2] = el)} id="community" className="section container">
        <h2>Community Involvement</h2>
        <p>Describe your community involvement.</p>
      </section>

      <section ref={(el) => (sectionRefs.current[3] = el)} id="projects" className="section container">
        <h2>Projects</h2>
        <p>Showcase your key projects here.</p>
      </section>

      <section ref={(el) => (sectionRefs.current[4] = el)} id="contact" className="section container">
        <h2>Contact Me</h2>
        <p>If you'd like to get in touch, feel free to reach out via email or social media.</p>
        <div className="contact-details">
          <p>Email: taradenaud4@gmail.com</p>
          <p>LinkedIn: <a href="https://linkedin.com/in/taradenaud" target="_blank" rel="noopener noreferrer">linkedin.com/in/taradenaud</a></p>
          <p>GitHub: <a href="https://github.com/taradenaud" target="_blank" rel="noopener noreferrer">github.com/taradenaud</a></p>
        </div>
      </section>
    </div>
  );
}

export default App;