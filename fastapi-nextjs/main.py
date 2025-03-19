from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.users_routes import user_router
from routes.detection import detection_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(detection_router)

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI"}
