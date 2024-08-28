from fastapi import APIRouter, Response
from config.db import conn
from schemas.zoo import animalEntity, zooEntity
from models.animal import Animal
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT
animal = APIRouter()

@animal.get("/zoo")

def find_all_zoom():
        return zooEntity(conn.local.zoo.find())






@animal.post("/animal")

def create_animal(animal: Animal):
        new_animal = dict(animal)
        del new_animal["id"]
        id =  conn.local.zoo.insert_one(new_animal).inserted_id
        animal = conn.local.zoo.find_one({"_id": id})
        return animalEntity(animal)
        


@animal.get("/animal/{id}")

def find_animal(id: str):
        return animalEntity(conn.local.zoo.find_one({"_id": ObjectId(id)}))



@animal.put("/animal/{id}")

def update_animal(id: str, animal: Animal):
        update_animal = conn.local.zoo.find_one_and_update({"_id": ObjectId(id)}, {"$set" : dict(animal)})
        return animalEntity(conn.local.zoo.find_one({"_id": ObjectId(id)}))








@animal.delete("/animal/{id}")

def delete_animal(id: str):
        animalEntity(conn.local.zoo.find_one_and_delete({"_id": ObjectId(id)}))
        return Response(status_code=HTTP_204_NO_CONTENT)