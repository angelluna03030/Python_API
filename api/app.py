# app.py
from fastapi import FastAPI
from routes.zoo import animal
app = FastAPI()

app.include_router(animal)


