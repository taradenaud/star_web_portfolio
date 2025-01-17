// eslint-disable-next-line

import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Star } from './images/Star'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import headshot from "./images/headshot.jpg"
import pic from "./images/pic1.jpg"
import testCV from "./images/testCV.pdf";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  const helloRef = useRef(null);
  const welcomeRef = useRef(null);
  // const navRef = useRef(null); 
  const sectionRefs = useRef([]);
  const [navbarVisible, setNavbarVisible] = useState(false); // Track navbar visibility
  const [activeTab, setActiveTab] = useState(0); 
  

  useEffect(() => {
    // typewriting animation for the intro
    gsap.to(helloRef.current, {
      duration: 2.5,
      text: "Hello, my name is Tara Denaud!",
      ease: "power1.inOut",
      delay: 0.5,
    });

    gsap.to(welcomeRef.current, {
      duration: 2.5,
      text: "Welcome to my portfolio",
      ease: "power1.inOut",
      delay: 3.5,
    });
    

    // setion that triggers animation when scrolling
    sectionRefs.current.forEach((el) => {
      gsap.fromTo(el,
        { y: 100, opacity: 0 }, // Initial position (down) and opacity
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRefs.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: false,
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
    const section = document.getElementById(id);
    const navHeight = document.querySelector(".navbar").offsetHeight; // Get nav bar height
    const top = section.getBoundingClientRect().top + window.pageYOffset - navHeight - 110; // Add extra space
  
    window.scrollTo({
      top,
      behavior: "smooth",

    });
  };
  

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,      
    autoplaySpeed: 3000, 
    pauseOnHover: true,
  };
  

  return (
    <div className="App">
      {/* Navbar */}
      <nav className={`navbar ${navbarVisible ? "visible" : ""}`}>
        <ul>
          <li onClick={() => scrollToSection('about')}> <b>About Me</b></li>
          <li onClick={() => scrollToSection('experience')}><b>Experience</b></li>
          <li onClick={() => scrollToSection('community')}><b>Community Involvement</b></li>
          <li onClick={() => scrollToSection('projects')}><b>Projects</b></li>
          <li onClick={() => scrollToSection('stack')}><b>Tech Stack</b></li>
          <li onClick={() => scrollToSection('contact')}><b>Contact Me</b></li>
        </ul>
        <div className="navbar-icons">

          <a href={testCV} target="_blank" rel="noopener noreferrer"> 
            <FontAwesomeIcon icon={faFile} /> </a>
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

      {/* Websie sections with the transitions */}
      <section ref={(el) => (sectionRefs.current[0] = el)} id="about" className="section container">
        <h1>About Me</h1>
        <div className="about-content">
          {/* Picture */}
          <div className="about-photo">
            <img src={headshot} alt="Tara Denaud" />
          </div>

          {/* Carousel */}
          <div className="about-carousel">
            <Slider {...carouselSettings} >
              <div>
                <h2>Description</h2>
                <p>
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog
                The quick brown fox jumps over the lazy dog</p>
              </div>
              <div>
                <h2>Education</h2>
                <p>educational stuff here.</p>
              </div>
              <div>
                <h2>Relevant Classes Taken</h2>
                <p>relevant classes taken here.</p>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[1] = el)} id="experience" className="section container">
        <h2>Experience</h2>
        <p>Describe your professional experience here.</p>
      </section>

      <section ref={(el) => (sectionRefs.current[2] = el)} id="community" className="section container">
        <h2>Community Involvement</h2>
        <div className="tab-bar">
          <div
            className={`tab tab1`}
            onClick={() => setActiveTab(0)}
          >
            CSSA
          </div>
          <div
            className={`tab tab2`}
            onClick={() => setActiveTab(1)}
          >
            CUSEC
          </div>
          <div
            className={`tab tab3`}
            onClick={() => setActiveTab(2)}
          >
            Engineering Faculty Council
          </div>
          <div
            className={`tab tab4`}
            onClick={() => setActiveTab(3)}
          >
            uOttaHack
          </div>
        </div>

        {/* Content Box */}
        <div className="content-container">
          <div className={`content content1 ${activeTab === 0 ? "active-content" : ""}`}>
            <h2>Tab 1</h2>
            <p>Stuff for Tab 1.</p>
          </div>
          <div className={`content content2 ${activeTab === 1 ? "active-content" : ""}`}>
            <h2>Tab 2 </h2>
            <p>Stuff for Tab 2.</p>
          </div>
          <div className={`content content3 ${activeTab === 2 ? "active-content" : ""}`}>
            <h2>Tab 3 </h2>
            <p>Stuff for Tab 3.</p>
          </div>
          <div className={`content content4 ${activeTab === 3 ? "active-content" : ""}`}>
            <h2>Tab 4 </h2>
            <p>Stuff for Tab 4.</p>
          </div>
        </div>
      </section>

      <section ref={(el) => (sectionRefs.current[3] = el)} id="projects" className="section container">
        <h2>Projects</h2>
        <p>Showcase your key projects here.</p>
      </section>

      <section ref={(el) => (sectionRefs.current[4] = el)} id="stack" className="section container">
        <h2>Here is my tech stack</h2>
        <p>Showcase your tech stack woo!</p>
      </section>

      <section ref={(el) => (sectionRefs.current[5] = el)} id="contact" className="section container contact-section">
        <h2>Contact Me</h2>
        <p>If you'd like to get in touch, feel free to reach out via email or social media.</p>
        <div className="contact-details">
          <p>Email: <a href="mailto:taradenaud4@gmail.com">taradenaud4@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/taradenaud" target="_blank" rel="noopener noreferrer">linkedin.com/in/taradenaud</a></p>
          <p>GitHub: <a href="https://github.com/taradenaud" target="_blank" rel="noopener noreferrer">github.com/taradenaud</a></p>
          <p>Take a look at my resume here</p>
        </div>
      </section>
    </div>
  );
}

export default App;
