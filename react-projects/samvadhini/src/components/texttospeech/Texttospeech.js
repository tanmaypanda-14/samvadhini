import { useEffect } from "react"

function Texttospeech(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const msg = new SpeechSynthesisUtterance()
  console.log(props.msg);
  msg.text = props.msg;

  useEffect(() => {
    window.speechSynthesis.speak(msg)
  }, [msg])

  return (
    <div>
    </div>
  )
}

export default Texttospeech;