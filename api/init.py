from haystack.nodes import FARMReader
import pandas as pd
from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import TfidfRetriever
from haystack.pipelines import ExtractiveQAPipeline
from flask import Flask, make_response, request
from googletrans import Translator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


def fetch_trans(question):
    df_of_qns = pd.read_csv("./csv/indexednewtrans.csv")
    translation_mr = list(
        df_of_qns[df_of_qns["question"] == question]["answer_marathi"]
    )[0]
    translation_hi = list(df_of_qns[df_of_qns["question"] == question]["answer_hindi"])[
        0
    ]
    return translation_mr, translation_hi


def gen_result(text):
    # text = "ळ " + text
    translator = Translator()
    detect_lang = translator.detect(text)
    dt1 = translator.translate(text, dest="en")
    translated_query = dt1.text

    global pipe
    prediction = pipe.run(
        query=translated_query,
        params={
            "Retriever": {"top_k": 10},
            "Reader": {"top_k": 5},
        },  # optimization parameters
    )
    print(type(prediction))
    # print(prediction)
    documents = prediction["documents"]
    print(documents)
    final_response = []
    for doc in documents:
        question = doc.content
        answer = doc.meta["answer"]
        answer_mr, answer_hi = fetch_trans(question)
        final_response.append(
            {
                "question": question,
                "answer": answer,
                "answer_mr": answer_mr,
                "answer_hi": answer_hi,
            }
        )
    return {"documents": final_response}


debug = True  # set to True to see the request and response


def debug_requests():
    global debug
    if debug:
        print(request)
        print(request.method)
        print(request.get_json())


@app.route("/query", methods=["GET", "POST"])
def query():
    debug_requests()
    request_data = request.get_json()  # ["msg":"query"]
    text = request_data["msg"]
    result = gen_result(text)
    return make_response(result)


if __name__ == "__main__":
    document_store = InMemoryDocumentStore()
    retriever = TfidfRetriever(document_store=document_store)
    reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2", use_gpu=False)
    df = pd.read_csv("./csv/faq.csv")
    df.fillna(value="", inplace=True)
    df["question"] = df["question"].apply(lambda x: x.strip())
    print(df.head())
    questions = list(df["question"].values)
    df = df.rename(columns={"question": "content"})
    docs_to_index = df.to_dict(orient="records")
    document_store.write_documents(docs_to_index)
    pipe = ExtractiveQAPipeline(reader, retriever)
    # temp = trans()
    # print(temp)
    app.config["JSON_AS_ASCII"] = False
    app.run(debug=True, host="0.0.0.0")
