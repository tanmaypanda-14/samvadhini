from googletrans import Translator

text1='how do i get grade card'
text2='mai grade card kaha se lu'
text3='mala grade card kuthun bethnar'


translator = Translator()

dt1 = translator.detect(text1)
print(dt1)

dt2 = translator.detect(text2)
print(dt2)

dt3 = translator.detect(text3)
print(dt3)

tt1 = translator.translate(text3, dest='en')
print(tt1)
