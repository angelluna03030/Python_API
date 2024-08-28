def animalEntity(item) -> dict:
    return {
        "id" :str(item["_id"]),
        "animal" :item["animal"],
        "patas" : item["patas"],
        "categoria" :  item["categoria"] 
    }

def zooEntity(entity) -> list:
    return [animalEntity(item) for item in entity]
