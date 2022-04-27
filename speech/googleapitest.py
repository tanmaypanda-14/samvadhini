import os
from google.cloud import speech

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'client_service_key.json'
speech_client = speech.SpeechClient()

media_file_name_mp3 = 'demo audio.mp3'
media_file_name_wav = 'demo audio.wav'

with open(media_file_name_mp3, 'rb') as f1:
    byte_data_mp3 = f1.read()
audio_mp3 = speech.RecognitionAudio(content=byte_data_mp3)

with open(media_file_name_wav, 'rb') as f2:
    byte_data_wav = f2.read()
audio_wav = speech.RecognitionAudio(content=byte_data_wav)

config_mp3 = speech.RecognitionConfig(
    sample_rate_hertz=48000,
    enable_automatic_punctuation=True,
    language_code='en-US'
)

config_wav = speech.RecognitionConfig(
    sample_rate_hertz=44100,
    enable_automatic_punctuation=True,
    language_code='en-US',
    audio_channel_count=2
)

response_standard_mp3 = speech_client.recognize(
    config=config_mp3,
    audio=audio_mp3
)

response_standard_wav = speech_client.recognize(
    config=config_wav,
    audio=audio_wav
)

print(response_standard_mp3)
print(response_standard_wav)


media_uri = 'gs://speech-to-text-media-files/Steve Job 2005 Commencement Speech.wav'
long_audi_wav = speech.RecognitionAudio(uri=media_uri)

config_wav_enhanced = speech.RecognitionConfig(
    sample_rate_hertz=48000,
    enable_automatic_punctuation=True,
    language_code='en-US',
    use_enhanced=True,
    model='video'
)

operation = speech_client.long_running_recognize(
    config=config_wav,
    audio=long_audi_wav
)
response = operation.result(timeout=90)
print(response)

for result in response.results:
    print(result.alternatives[0].transcript)
    print(result.alternatives[0].confidence)
    print()
