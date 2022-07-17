import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./model.css";
import Particle from "../../components/Particle";
import Altresponse from "../../components/altresponse/Altresponse";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;

function Model() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState(null);
  const [savedTexts, setSavedTexts] = useState([]);
  const [answer, setAnswer] = useState("");
  const [meta, setMeta] = useState("");
  const [alt, setAlt] = useState("");
  const location = useLocation();
  const navigation = useNavigate();
  const [buttonPopup, setButtonPopup] = useState(false);
  mic.lang = location.state.language;
  useEffect(() => {
    handleListen();
  }, [isListening]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleListen = () => {
    if (isListening) {
      mic.start();
      setButtonText('fa fa-microphone fa-2x')
      setMicColor('red')
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      setButtonText('fa fa-microphone fa-2x color-red')
      setMicColor('white')
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setText(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const api_response = async () => {
    const requestoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ msg: text }),
    };
    const response = await fetch("/query", requestoptions);
    const data = await response.json();
    console.log(data);
    setAnswer(data.documents[0].content);
    setMeta(data.documents[0].meta.answer);
    setAlt(data.documents[1].meta.answer);
    // setTimeout(() => {
    //   navigation("/thankyou");
    // }, 120000);
  };

  const handleSaveText = () => {
    setSavedTexts([...savedTexts, text]);
    api_response();
  };

  const navtu = () => {
    navigation("/thankyou");
  };
  const [buttonText, setButtonText] = useState('fa fa-microphone fa-2x color-red');
  const [micColor, setMicColor] = useState('white');    

  return (
    <>
      <Particle></Particle>
      <div className="container">
      <h1 className='heading'>Samvadhini</h1>
        <div className="box">
          <div className='instr'>
            <h2>Instructions</h2>
            <li>Click on the mic button when you are ready to speak</li>
            <li>Click on submit button when you are done speaking</li>
            <li>Click on Finish when your doubt has been answered</li>
          </div>
          {isListening ? <span></span> : <span></span>}
          <div className="text-and-btn">
            <div className="wrap-p"><p>{text}</p></div>
            <button onClick={() => setIsListening(prevState => !prevState)} >
            <i className={`${buttonText}`} style={{color:`${micColor}`}} ></i>
            </button>
          </div>
          <div className="submit-btn">
            <button onClick={handleSaveText} disabled={!text}>
              Submit
            </button>
          </div>
        </div>
        <div className="box">
          <h2 className='result-txt'>Result</h2>
          <div className="result-box">
            <p>{answer}</p>
            <p>{meta}</p>
          </div>
        </div>
        <div>
          <button className="alt-btn" onClick={() => setButtonPopup(true) }>alt</button>
          <Altresponse trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h1>popup</h1>
            <p>{alt}</p>
          </Altresponse>
        </div>
        <div className='finish-btn'>
            <button onClick={navtu}>Finish</button>
        </div>
      </div>
    </>
  )
}

export default Model;
