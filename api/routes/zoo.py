from fastapi import APIRouter, Response
from config.db import conn
from schemas.zoo import animalEntity, zooEntity
from models.animal import Animal
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
animal = APIRouter()
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

cursor = conn.cursor(dictionary=True)


animal_router = APIRouter()
@animal_router.get("/zoo")
def find_all_zoo():
    cursor.execute("SELECT * FROM zoo")
    animals = cursor.fetchall()
    return animals  # Ajusta esto para devolver el formato adecuado

# Crear un nuevo animal
@animal_router.post("/animal")
def create_animal(animal: Animal):
    new_animal = dict(animal)
    del new_animal["id"]  # Si 'id' no es parte del inserto, lo eliminamos
    
    # Preparar la consulta SQL para la inserción
    columns = ', '.join(new_animal.keys())
    placeholders = ', '.join(['%s'] * len(new_animal))
    sql = f"INSERT INTO zoo ({columns}) VALUES ({placeholders})"
    
    # Ejecutar la consulta y obtener el ID del nuevo animal
    cursor.execute(sql, list(new_animal.values()))
    conn.commit()
    animal_id = cursor.lastrowid
    
    # Obtener el nuevo animal insertado
    cursor.execute("SELECT * FROM zoo WHERE id = %s", (animal_id,))
    result = cursor.fetchone()
    
    if result:
        return result  # Ajusta esto para devolver el formato adecuado
    else:
        raise HTTPException(status_code=404, detail="Animal not found")

# Obtener un animal por ID
@animal_router.get("/animal/{id}")
def find_animal(id: int):
    cursor.execute("SELECT * FROM zoo WHERE id = %s", (id,))
    result = cursor.fetchone()
    
    if result:
        return result  # Ajusta esto para devolver el formato adecuado
    else:
        raise HTTPException(status_code=404, detail="Animal not found")

# Actualizar un animal por ID
@animal_router.put("/animal/{id}")
def update_animal(id: int, animal: Animal):
    update_data = dict(animal)
    columns = ', '.join([f"{key} = %s" for key in update_data])
    sql = f"UPDATE zoo SET {columns} WHERE id = %s"
    
    cursor.execute(sql, list(update_data.values()) + [id])
    conn.commit()
    
    cursor.execute("SELECT * FROM zoo WHERE id = %s", (id,))
    result = cursor.fetchone()
    
    if result:
        return result  # Ajusta esto para devolver el formato adecuado
    else:
        raise HTTPException(status_code=404, detail="Animal not found")
