import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./model.css";
// import Particle from "../../components/Particle";
import Altresponse from "../../components/altresponse/Altresponse";
import Select from 'react-select';

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
  const [data1, setData1] = useState([]);
  // const [inputValue, setInputValue] = useState('');
  // const [selectedValue, setselectedValue] = useState("en-IN")
  const [selectedOpt, setSelectedOpt] = useState([]);
 

  mic.lang = location.state.language;
  useEffect(() => {
    handleListen();
  }, [isListening]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const response = await fetch("/query", requestoptions);
    const data = await response.json();
    console.log(data);
    setData1(data.documents)
    setAnswer(data.documents[0].question);
      if(mic.lang==="en-IN"){setMeta(data.documents[0].answer);}
      else if(mic.lang === "hi-IN"){setMeta(data.documents[0].answer_hi);}
      else if(mic.lang === "mr-IN"){setMeta(data.documents[0].answer_mr);} 
    
    setAlt(data.documents[1].answer);
    // setTimeout(() => {
    //   navigation("/thankyou");
    // }, 120000);
  };

  const handleSaveText = (e) => {
    setSavedTexts([...savedTexts, text]);
    api_response();
    setText(e.target.value);
    api_response();
    console.log(text);
  };

  // const handleLangChange = ()=>{
  //   if(mic.lang === "en-IN"){
  //     setMeta(data1.documents[0].answer_hi)
  //     mic.lang="hi-IN";
  //   }else if (mic.lang === "hi-IN"){
  //     setMeta(data1.documents[0].answer_mr)
  //     mic.lang="mr-IN"
  //   }else if (mic.lang === "mr-IN"){
  //     setMeta(data1.documents[0].answer)
  //     mic.lang="en-IN"
  //   }
  // }

  // const handleInputChange = inputValue =>{
  //   setInputValue(inputValue);
  // }

  const handleChange = (selectedOption) => { 
    setSelectedOpt(selectedOption)
  }
  useEffect(() => {
    console.log(selectedOpt.value);
      if(data1)
      if(selectedOpt.value==="en-IN"){
        setMeta(data1[0].answer);
      }
      else if(selectedOpt.value === "hi-IN"){
        setMeta(data1[0].answer_hi)
      }else if(selectedOpt.value === "mr-IN"){
        setMeta(data1[0].answer_mr)
      }
  }, [selectedOpt]);

    // useEffect(() => {
    //   if(values==="en-IN"){
    //     setMeta(data1.documents[0].answer);
    //   }
    //   else if(values === "hi-IN"){
    //     setMeta(data1.documents[0].answer_hi)
    //   }
    // }, [values])
  const text_to_speech = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = meta;
    window.speechSynthesis.speak(msg);
  };

  const navtu = () => {
    navigation("/thankyou");
  };
  const [buttonText, setButtonText] = useState(
    "fa fa-microphone fa-2x color-red"
  );
  const [micColor, setMicColor] = useState("white");
  const actions = [
    {label:"English", value: "en-IN"},
    {label:"Hindi", value: "hi-IN"},
    {label:"Marathi",value: "mr-IN"}
  ]

  return (
    <div className="Model">
      {/* <Particle></Particle> */}
      <div className="container">
        <h1 className="heading">Samvadhini</h1>
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
              <input placeholder={text} value={text}></input>
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
          </div>
        </div>
        <div className="box">
          <h2 className="result-txt">Result</h2>
          <div className="result-box">
            <p>{answer}</p>
            <p>{meta}</p>
          </div>
        </div>
        <div className="finish-btn">
        <Select options={actions} defaultValue={()=>{
          if(mic.lang==="en-IN"){return actions[0]}
          else if(mic.lang === "hi-IN"){return actions[1]}
          else if(mic.lang === "mr-IN"){return actions[2]} 
        }} onChange={handleChange} ></Select>
          <button onClick={text_to_speech} id="text-to-speech-btn">
            <i
              className="fa-solid fa-volume-high"
            ></i>
          </button>
          <button className="alt-btn" onClick={() => setButtonPopup(true)}>
            Alt
          </button>
          <button onClick={navtu}>Finish</button>
        </div>
      </div>
      <Altresponse trigger={buttonPopup} setTrigger={setButtonPopup}>
        <p>{data1.map(e => {
          return <li style={{ listStyleType: `decimal`, padding:'1%' }}>{e.answer ? e.answer : ""}</li>
        })}</p> 
        {/* {alt} */}
      </Altresponse>
    </div>
  );
}

export default Model;
