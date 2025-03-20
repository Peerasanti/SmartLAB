from fastapi import APIRouter, File, UploadFile, HTTPException
import tensorflow as tf
import cv2
import numpy as np
from io import BytesIO
from fastapi.responses import StreamingResponse
from pathlib import Path

detection_router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent 
MODEL_PATH = BASE_DIR / "detection_model" / "model_for_rat.keras"

try:
    model = tf.keras.models.load_model(MODEL_PATH, safe_mode=False)
    print("Model loaded successfully")
except Exception as e:
    print("Error loading model:", str(e))
    raise HTTPException(status_code=500, detail="Failed to load model")

@detection_router.get("/model/check")
async def check_model():
    if model is None:
        raise HTTPException(status_code=404, detail="Model not found")
    return {"message": "Model loaded successfully"}

