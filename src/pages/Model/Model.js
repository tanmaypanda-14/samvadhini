import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./model.css";
// import Particle from "../../components/Particle";
import Altresponse from "../../components/altresponse/Altresponse";
import Select from 'react-select';
import spinner from "../../assets/spinner.gif";

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
  const location = useLocation();
  const navigation = useNavigate();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [popupData, setpopupData] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkEng, setCheckEng] = useState(true)

  mic.lang = location.state.language;
  useEffect(() => {
    handleListen();
  }, [isListening]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
      if(selectedOpt.value==="en-IN"){
        setCheckEng(true)
      }else if (selectedOpt.value==="hi-IN"){
        setCheckEng(false)
      }else if(selectedOpt.value==="mr-IN"){
        setCheckEng(false)
      }
  }, [selectedOpt])

  useEffect(() => {
    if(mic.lang === "en-IN"){
      setCheckEng(true)
    }else{
      setCheckEng(false)
    }
  }, [])
  
  const handleListen = () => {
    if (isListening) {
      mic.start();
      setButtonText("fa fa-microphone fa-2x");
      setMicColor("red");
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      setButtonText("fa fa-microphone fa-2x color-red");
      setMicColor("white");
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
    setLoading(true);
    const response = await fetch("/query", requestoptions);
    const data = await response.json();
    console.log(data);
    setpopupData(data.documents)
    setAnswer(data.documents[0].question);
    setLoading(false)
    if (mic.lang === "en-IN") { setMeta(data.documents[0].answer); }
    else if (mic.lang === "hi-IN") { setMeta(data.documents[0].answer_hi); }
    else if (mic.lang === "mr-IN") { setMeta(data.documents[0].answer_mr); }

    // setTimeout(() => {
    //   navigation("/thankyou");
    // }, 120000);
  };

  const handleSaveText = (e) => {
    setSavedTexts([...savedTexts, text]);
    api_response();
    setText(e.target.value);
    console.log(text);
  };

  const handleChange = (selectedOption) => {
    setSelectedOpt(selectedOption)
  }
  useEffect(() => {
    console.log(selectedOpt.value);
    if (popupData)
      if (selectedOpt.value === "en-IN") {
        setMeta(popupData[0].answer);
      }
      else if (selectedOpt.value === "hi-IN") {
        setMeta(popupData[0].answer_hi)
      } else if (selectedOpt.value === "mr-IN") {
        setMeta(popupData[0].answer_mr)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOpt]);

  const text_to_speech = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = meta;
    window.speechSynthesis.speak(msg);
  };

  const inputChange = (e) => {
    setText(e.target.value);
  }

  const navtu = () => {
    navigation("/thankyou");
  };
  const [buttonText, setButtonText] = useState(
    "fa fa-microphone fa-2x color-red"
  );
  const [micColor, setMicColor] = useState("white");
  const actions = [
    { label: "English", value: "en-IN" },
    { label: "Hindi", value: "hi-IN" },
    { label: "Marathi", value: "mr-IN" }
  ]

  return (
    <div className="Model">
      {/* <Particle></Particle> */}
      <div className="container">
        <div className="container-2">
          <h1 className="heading">Samvaadini</h1>
          <div className="box">
            <div className="instr">
              <h2>Instructions</h2>
              <li>Click on the mic button when you are ready to speak</li>
              <li>Click on submit button when you are done speaking</li>
              <li>Click on Finish when your doubt has been answered</li>
            </div>
            {isListening ? <span></span> : <span></span>}
            <div className="text-and-btn">
              <div className="wrap-p">
                <input onChange={inputChange} placeholder={text} value={text}></input>
              </div>
              <button onClick={() => setIsListening((prevState) => !prevState)}>
                <i
                  className={`${buttonText}`}
                  style={{ color: `${micColor}` }}
                ></i>
              </button>
            </div>
            <div className="submit-btn">
              <button onClick={handleSaveText} disabled={!text}>
                Submit
              </button>
              {loading && <img src={spinner} alt="loading"/>}
            </div>
          </div>
          <div className="box">
            <div className="result-box">
              <p className="question">{answer}</p>
              <p>{meta}</p>
            </div>
          </div>
          <div className="finish-btn">
            {meta?<Select options={actions} defaultValue={() => {
              if (mic.lang === "en-IN") { return actions[0] }
              else if (mic.lang === "hi-IN") { return actions[1] }
              else if (mic.lang === "mr-IN") { return actions[2] }
            }} onChange={handleChange} ></Select>:null}{checkEng?
            <button onClick={text_to_speech} id="text-to-speech-btn">
              <i
                className="fa-solid fa-volume-high"
              ></i>
            </button>:null}
            <button className="alt-btn" onClick={() => setButtonPopup(true)}>
              Alt
            </button>
            <button onClick={navtu}>Finish</button>
          </div>
        </div>
      </div>
      <Altresponse trigger={buttonPopup} setTrigger={setButtonPopup}>
        <p>{popupData.slice(1).map(e => {
          return <li style={{ listStyleType: `decimal`, padding:'1%',fontWeight:600 }}>{e.question ? e.question : ""}<br/>
          <p style={{fontWeight:400, marginTop:"10px"}}>{e.answer ? e.answer : ""}</p><br/></li>
        })}</p>
        {/* {alt} */}
      </Altresponse>
    </div>
  );
}

export default Model;