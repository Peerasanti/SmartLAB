from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import urllib.parse
from dotenv import load_dotenv
import os

load_dotenv()
ENCODE_USERNAME = urllib.parse.quote_plus(os.getenv("MONGO_USERNAME"))
ENCODE_PASSWORD = urllib.parse.quote_plus(os.getenv("MONGO_PASSWORD"))

MONGO_URI = f"mongodb+srv://{ENCODE_USERNAME}:{ENCODE_PASSWORD}@rat-cluster.b3ctd.mongodb.net/?retryWrites=true&w=majority&appName=Rat-Cluster"

app = FastAPI()

client = None
db = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    client = AsyncIOMotorClient(MONGO_URI)
    db = client.get_database("rat-database")
    print("Connected to MongoDB successfully!")
    yield
    client.close()
    print("Disconnected from MongoDB.")

app.router.lifespan_context = lifespan

# for testing fastAPI
@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI"}

# add favicon endpoint for avoid 404 wanring
@app.get("/favicon.ico")
async def favicon():
    return {"message": "No favicon available"}