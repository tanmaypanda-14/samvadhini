import React, { useState, useEffect } from 'react'
// import './App.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'mr-IN'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [text, setText] = useState(null)
  const [savedTexts, setSavedTexts] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setText(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveText = () => {
    setSavedTexts([...savedTexts, text])
    setText('')
  }

  return (
    <>
      <h1>Speech to text</h1>
      <div className="container">
        <div className="box">
          <h2>text</h2>
          {isListening ? <span></span> : <span></span>}
          <button onClick={handleSaveText} disabled={!text}>
            History
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>{text}</p>
        </div>
        <div className="box">
          <h2>History</h2>
          {savedTexts.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  )
}

export default App