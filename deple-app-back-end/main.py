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

class create_feed(BaseModel):
    create_user: str
    feed_content: str


@app.post("/login")
async def login(login_id: login_id):
    sql= f'SELECT * FROM people WHERE id = \'{login_id.id}\' and pw = \'{login_id.pw}\''
    DB_instance = DB_api()
    if DB_instance.select(sql=sql, db_name='user'):
        return jsonable_encoder({'id': list({login_id.id})[0], 'auth':'yes'})
    else:
        auth = {'auth':'no'}
        return jsonable_encoder(auth)

@app.post("/create")
async def create(create_id: create_id):
    sql = f'INSERT INTO `user`.`people`(id, pw, name, email, contact) VALUES(\'{create_id.userId}\',\'{create_id.userPw}\',\'{create_id.name}\',\'{create_id.mail}\',\'{create_id.contact}\')'
    DB_instance = DB_api()
    try:
        DB_instance.create(sql=sql, db_name='user')
    except Exception as e:
        return e
    return jsonable_encoder({'id': list([create_id]), 'message':'생성완료'})

@app.post("/create_feed")
async def create(create_feed: create_feed):
    sql = f'INSERT INTO `feed`.`table2`(create_user, feed_content) VALUES(\'{create_feed.create_user}\',\'{create_feed.feed_content}\')'
    DB_instance = DB_api()
    try:
        DB_instance.create(sql=sql, db_name='feed')
    except Exception as e:
        return e
    return jsonable_encoder({'id': list({create_feed.create_user}), 'message':'피드 생성완료'})

@app.get("/feed_select")
def feed_select():
    sql= 'SELECT * FROM table2'
    DB_instance = DB_api()
    print(jsonable_encoder(DB_instance.select(sql=sql, db_name='feed'))) 
    try:
        return jsonable_encoder({'feed': list(DB_instance.select(sql=sql, db_name='feed')), 'message':'출력완료'})
    except Exception as e:
        return e

if __name__ == '__main__':
    uvicorn.run(app, port=13000, host='0.0.0.0')