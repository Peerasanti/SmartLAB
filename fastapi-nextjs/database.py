from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import urllib.parse

load_dotenv()
ENCODE_USERNAME = urllib.parse.quote_plus(os.getenv("MONGO_USERNAME"))
ENCODE_PASSWORD = urllib.parse.quote_plus(os.getenv("MONGO_PASSWORD"))

MONGO_URI = f"mongodb+srv://{ENCODE_USERNAME}:{ENCODE_PASSWORD}@rat-cluster.b3ctd.mongodb.net/rat-database?retryWrites=true&w=majority&appName=Rat-Cluster"

client = AsyncIOMotorClient(MONGO_URI)
db = client["rat-database"]
users_collection = db["users"]
