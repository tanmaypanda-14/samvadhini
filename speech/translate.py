from speech_text import text
from googletrans import Translator

translator = Translator()

# input_text = 'majha aai baba cha naav wrong ahe'
# input_text = 'mere maa baap ka naam galat hai'

input_text = text

translation = translator.detect([input_text])
for trans in translation:
    print(trans.lang, trans.confidence)

translation = translator.translate(input_text, dest='en')

print(f"Did you just say : {translation.text} ")
