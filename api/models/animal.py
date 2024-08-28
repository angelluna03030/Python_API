from typing import Optional
from pydantic import BaseModel

class Animal(BaseModel):
    id:Optional[str] 
    animal : str
    patas : str
    categoria : str