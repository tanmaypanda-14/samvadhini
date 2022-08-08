import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

path_to_key = os.path.join(os.path.dirname(__file__), "key.json")

def insert_log(db, data: dict):
    db.collection("logs").document().set(data)


def init_firebase():
    cred = credentials.Certificate(path_to_key)
    firebase_admin.initialize_app(
        cred,
        {
            "projectId": "samvadhini-d7856",
        },
    )
    db = firestore.client()
    return db