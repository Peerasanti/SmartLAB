from fastapi import APIRouter, HTTPException
from database import users_collection
from models import User
from pymongo.errors import DuplicateKeyError
from utils import hash_password, verify_password

user_router = APIRouter()

@user_router.post("/users/register")
async def create_user(user: User):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    
    new_user = {
        "full_name": user.full_name,
        "email": user.email,
        "password": hashed_password, 
    }
    result = await users_collection.insert_one(new_user)
    return {"message": "User created successfully", "user_id": str(result.inserted_id)}

@user_router.get("/users/{email}")
async def get_user(email: str):
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "full_name": user["full_name"],
        "email": user["email"]
    }

@user_router.post("/users/login/")
async def login_user(email: str, password: str):
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect password")

    return {"message": "Login successful"}

@user_router.post("/users/check-email/")
async def check_email(email: str):
    user = await users_collection.find_one({"email": email})
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return {"message": "Email is available"}

@user_router.post("/users/check-username/")
async def check_username(username: str):
    user = await users_collection.find_one({"username": username})
    if user:
        raise HTTPException(status_code=400, detail="Username already taken")

    return {"message": "Username is available"}
