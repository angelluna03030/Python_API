from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.zoo import animal

app = FastAPI()

# Configuración del middleware CORS
origins = [
    "http://localhost:5173",  # Añade aquí otros orígenes permitidos si es necesario
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Especifica los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)
app.include_router(animal)