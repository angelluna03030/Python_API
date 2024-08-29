
import mysql.connector
conn =  mysql.connector.connect(
    host="localhost",      # Cambia a la dirección de tu servidor MySQL
    user="root",     # Cambia por tu nombre de usuario MySQL
    password="",  # Cambia por tu contraseña MySQL
    database="zoo"  # Cambia por el nombre de tu base de datos
)