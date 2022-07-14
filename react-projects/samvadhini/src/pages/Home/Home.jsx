import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home=()=> {


    const navigate = useNavigate();
    const handleEng=()=>{
        navigate('/model',{state:{language:'en-IN'}})
    }
    const handleHin=()=>{
        navigate('/model',{state:{language:'hi-IN'}})
    }
    const handleM=()=>{
        navigate('/model',{state:{language:'mr-IN'}})
    }
    
  return (
    <div>
        <h1>Welcome to Samvadhini</h1>
        <h4>Select a language</h4>
      <button onClick={handleEng}>English</button>&nbsp;&nbsp;   
      <button onClick={handleHin}>Hindi</button>&nbsp; &nbsp; 
      <button onClick={handleM}>Marathi</button>
    </div>
  )
}

export default Home

