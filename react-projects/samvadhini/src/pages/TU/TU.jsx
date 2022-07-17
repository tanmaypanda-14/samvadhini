import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Particle from '../../components/Particle';
import Typed from "typed.js";
import { useRef } from "react";
import './tu.css'

const Thanks =() =>{
const navigation = useNavigate();
// useEffect(() =>{
//     setTimeout(() => {
//         navigation('/')
//     }, 10000);
// })

const el = useRef(null);

useEffect(() => {
  const typed = new Typed(el.current, {
    strings: ["Thank you for using Samvadhini","Click on finish to go back to homepage"], // Strings to display
    // Speed settings, try diffrent values untill you get good results
    startDelay: 300,
    typeSpeed: 150,
    backSpeed: 50,
    backDelay: 100,
    loop: true,
    showCursor: true,
    cursorChar: "_"
  });

  return () => {
    typed.destroy();
  };
}, []);

const navtu=()=>{
    navigation('/');
}
    return (
        <>
        <Particle></Particle>
        <div className='tu'>
            <div></div>
            <div>
                <h1 className='thank'><span ref={el}>
                </span></h1>
                <div className='btn-wrap'>
                <button onClick={navtu}>Finish</button>
                </div>
            </div>
            <div></div>
        </div>
        </>
    )
}

export default Thanks;