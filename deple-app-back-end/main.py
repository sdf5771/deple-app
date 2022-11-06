import json
from enum import Enum
import uvicorn
from app.DB.DB_crud import DB_api
import app
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from uuid import UUID
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

app = FastAPI()

class login_id(BaseModel):
    id: str
    pw: str

class create_id(BaseModel):
    userId: str
    userPw: str
    name: str
    mail: str
    contact: str



@app.post("/login")
async def login(login_id: login_id):
    sql= f'SELECT * FROM people WHERE id = \'{login_id.id}\' and pw = \'{login_id.pw}\''
    DB_instance = DB_api()
    if DB_instance.login(sql=sql):
        return jsonable_encoder({'id': list({login_id.id})[0], 'auth':'yes'})
    else:
        auth = {'auth':'no'}
        return jsonable_encoder(auth)

@app.post("/create")
async def create(create_id: create_id):
    print(type(create_id.userId))
    sql = f'INSERT INTO `user`.`people`(id, pw, name, email, contact) VALUES(\'{create_id.userId}\',\'{create_id.userPw}\',\'{create_id.name}\',\'{create_id.mail}\',\'{create_id.contact}\')'
    DB_instance = DB_api()
    try:
        DB_instance.create(sql=sql)
    except Exception as e:
        return e
    return jsonable_encoder({'id': list([create_id]), 'message':'생성완료'})

if __name__ == '__main__':
    uvicorn.run(app, port=13000, host='0.0.0.0')