import React from "react";
import { useNavigate } from "react-router-dom";
import Particle from "../../components/Particle";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import "./Home.css";
import logo from "../../assets/mitLogo.webp";
const Home = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Welcome to Samvadhini", "How can we help you"], // Strings to display
      // Speed settings, try diffrent values until you get good results
      startDelay: 300,
      typeSpeed: 150,
      backSpeed: 50,
      backDelay: 100,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const navigate = useNavigate();
  const handleEng = () => {
    navigate("/model", { state: { language: "en-IN" } });
  };
  const handleHin = () => {
    navigate("/model", { state: { language: "hi-IN" } });
  };
  const handleMar = () => {
    navigate("/model", { state: { language: "mr-IN" } });
  };

  return (
    <>
      <Particle></Particle>
      <div className="home">
        <div className="row1">
          <img src={logo} alt="MITWPU" />
        </div>
        <div className="row2">
          <h1 className="welcome">
            <span ref={el}></span>
          </h1>
          <br></br>
          <br></br>
          <h4 className="select-text">Select a language</h4>
          <br></br>
          <br></br>
          <br></br>
          <div className="btn">
            <button onClick={handleEng}>ENGLISH</button>
            <button onClick={handleHin}>हिन्दी</button>
            <button onClick={handleMar}>मराठी</button>
          </div>
        </div>
        <div className="row3"></div>
      </div>
    </>
  );
};

export default Home;
