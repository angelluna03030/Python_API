from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.zoo import animal_router

app = FastAPI()

# Configuración del middleware CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Especifica los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)
app.include_router(animal_router)