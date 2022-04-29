import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone() as source:
    print("Speak anything : ")
    audio = r.listen(source, phrase_time_limit=2)
 
    try:
        text = r.recognize_google(audio)
        print("You said : {}".format(text))
        # SpeakText(text)
    except:
        print("Not being able to recieve")
