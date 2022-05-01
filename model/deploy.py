from haystack.utils import clean_wiki_text, convert_files_to_docs, fetch_archive_from_http, print_answers
from haystack.nodes import FARMReader, TransformersReader
import pandas as pd
import requests
from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import TfidfRetriever
from haystack.pipelines import ExtractiveQAPipeline
from pprint import pprint
import json
from time import sleep
from flask import Flask, render_template, make_response
import datetime

app = Flask(__name__)


i = 0
@app.route("/", methods=["GET", "POST"])
def att():
    global pipe 
    prediction = pipe.run(
            query="fathers name wrong on grade card", params={"Retriever": {"top_k": 10}, "Reader": {"top_k": 5}}
            )
    return prediction

if __name__ == "__main__":
    document_store = InMemoryDocumentStore()
    retriever = TfidfRetriever(document_store=document_store)
    reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2", use_gpu=False)
    temp = requests.get("https://raw.githubusercontent.com/uneconomicalfairy14/samvadhini/master/model/faq.csv")
    open('faq.csv', 'wb').write(temp.content)
    df = pd.read_csv("faq.csv")
    df.fillna(value="", inplace=True)
    df["question"] = df["question"].apply(lambda x: x.strip())
    print(df.head())
    questions = list(df["question"].values)
    df = df.rename(columns={"question": "content"})
    docs_to_index = df.to_dict(orient="records")
    document_store.write_documents(docs_to_index)
    pipe = ExtractiveQAPipeline(reader, retriever)
    app.run(debug=True)
