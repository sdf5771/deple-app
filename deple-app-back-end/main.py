import json
import os
from enum import Enum
import uvicorn
from app.DB.DB_crud import DB_api
# from app.Model.Model_login import login_id , create_id, create_feed
import app
from fastapi import FastAPI ,File, UploadFile
from fastapi.encoders import jsonable_encoder
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List
import datetime

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
    user_id: str
    feed_content: str
    file: List[UploadFile]

def upload_board(in_files: List[UploadFile] = File(...)):
    file_urls=[]
    if len(file_urls) > 3:
        return False
    IMG_DIR = 'app/'
    file_path = []
    for file in in_files:
        print(file)
        currentTime = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        saved_file_name = ''.join([currentTime, str(uuid4())])
        file_location = os.path.join(IMG_DIR, saved_file_name)
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())
            file_path.append(file_location)
    return file_path

@app.post("/login")
async def login(login_id: login_id):
    sql= f'SELECT * FROM people WHERE id = \'{login_id.id}\' and pw = \'{login_id.pw}\''
    DB_instance = DB_api()
    if DB_instance.select(sql=sql, db_name='User'):
        return jsonable_encoder({'id': list({login_id.id})[0], 'auth':'yes'})
    else:
        auth = {'auth':'no'}
        return jsonable_encoder(auth)

@app.post("/create")
async def create(create_id: create_id):
    sql = f'INSERT INTO `User`.`people`(id, pw, name, email, contact) VALUES(\'{create_id.userId}\',\'{create_id.userPw}\',\'{create_id.name}\',\'{create_id.mail}\',\'{create_id.contact}\')'
    DB_instance = DB_api()
    try:
        DB_instance.create(sql=sql, db_name='User')
    except Exception as e:
        return e
    return jsonable_encoder({'id': list([create_id]), 'message':'생성완료'})
    

@app.post("/create_feed")
async def make_feed(create_feed: create_feed):
    img_path = ''
    if len(create_feed.file) > 1:
        img_path = upload_board(create_feed.file)
    if img_path == False:
        return jsonable_encoder({'message':'이미지 파일 3개 이상은 안됩니다.'})
    sql = f'INSERT INTO `Feed`.`feed`(user_id, content, image_path) VALUES(\'{create_feed.user_id}\',\'{create_feed.feed_content}\', \'{img_path}\')'
    DB_instance = DB_api()
    try:
        DB_instance.create(sql=sql, db_name='Feed')
        sql= 'SELECT * FROM feed ORDER BY feed_id desc'
        DB_instance = DB_api()
    except Exception as e:
        return e
    return jsonable_encoder({'id': list({create_feed.user_id}), 'Feed': DB_instance.select(sql=sql, db_name='Feed'), 'message':'피드 생성완료'})

@app.get("/feed_select")
def feed_select():
    sql= 'SELECT * FROM table ORDER BY feed_id desc'
    DB_instance = DB_api()
    try:
        return jsonable_encoder({'feed': DB_instance.select(sql=sql, db_name='Feed'), 'message':'출력완료'})
    except Exception as e:
        return e

if __name__ == '__main__':
    uvicorn.run(app, port=13000, host='0.0.0.0')