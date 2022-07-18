import { useEffect } from "react"

function Texttospeech() {
  const msg = new SpeechSynthesisUtterance()
  msg.text = "Hello World"

  useEffect(() => {
    window.speechSynthesis.speak(msg)
  }, [msg])

  return (
    <div>
        Test
    </div>
  )
}

export default Texttospeech;