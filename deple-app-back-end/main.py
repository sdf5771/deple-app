import json
import os
import uvicorn
import app

from fastapi.responses import HTMLResponse
from enum import Enum
from fastapi import FastAPI ,File, UploadFile, Request , Form
from fastapi.encoders import jsonable_encoder

from app.DB.db_config import db_api
from app.Controller.util import now_t
from app.Model.Model import login_id, create_id, create_feed, create_comment, update_comment, select_comment, deleteComment

app = FastAPI()

@app.post("/login")
async def login(login_id: login_id):
    sql= f'SELECT * FROM people WHERE id = \'{login_id.id}\' and pw = \'{login_id.pw}\''
    DB_instance = db_api()
    if DB_instance.select(sql=sql, db_name='User'):
        return jsonable_encoder({'id': list({login_id.id})[0], 'auth':'yes'})
    else:
        auth = {'auth':'no'}
        return jsonable_encoder(auth)

@app.post("/create")
async def create(create_id: create_id):
    sql = f'INSERT INTO `User`.`people`(id, pw, name, email, contact) VALUES(\'{create_id.userId}\',\'{create_id.userPw}\',\'{create_id.name}\',\'{create_id.mail}\',\'{create_id.contact}\')'
    DB_instance = db_api()
    try:
        DB_instance.create(sql=sql, db_name='User')
    except Exception as e:
        return e
    return jsonable_encoder({'id': list([create_id]), 'message':'생성완료'})
    

@app.post("/create_feed")
async def make_feed(create_feed: create_feed):
    img_path = ''
    # if len(create_feed.file) > 1:
    #     img_path = upload_board(create_feed.file)
    # if img_path == False:
    #     return jsonable_encoder({'message':'이미지 파일 3개 이상은 안됩니다.'})
    try:
        sql = f'INSERT INTO `Feed`.`feed`(user_id, content, image_path) VALUES(\'{create_feed.create_user}\',\'{create_feed.feed_content}\', \'{img_path}\')'
        DB_instance = db_api()
        DB_instance.create(sql=sql, db_name='Feed')
        sql= 'SELECT * FROM feed ORDER BY feed_id desc'
        DB_instance = db_api()
    except Exception as e:
        return e
    return jsonable_encoder({'id': list({create_feed.create_user}), 'feed': DB_instance.select(sql=sql, db_name='Feed'), 'message':'피드 생성완료'})

@app.get("/feed_select")
def feed_select():
    sql= 'SELECT * FROM feed ORDER BY feed_id desc'
    DB_instance = db_api()
    try:
        return jsonable_encoder({'feed': DB_instance.select(sql=sql, db_name='Feed'), 'message':'출력완료'})
    except Exception as e:
        return e

@app.get("/user_list")
def user_list():
    sql= 'SELECT id FROM people ORDER BY uuid'
    DB_instance = db_api()
    try:
        return jsonable_encoder({'user_list': DB_instance.select(sql=sql, db_name='User'), 'message':'출력완료'})
    except Exception as e:
        return e

@app.post("/comment_select")
def feed_select(select_comment: select_comment):
    sql= f'SELECT * FROM feed_comment where feed_id = \'{select_comment.feed_id}\' ORDER BY feed_comment_id desc'
    DB_instance = db_api()
    try:
        return jsonable_encoder({'comment_req': DB_instance.select(sql=sql, db_name='Feed'), 'message':'200 ok'})
    except Exception as e:
        return e

@app.post("/create_comment")
def cr_comment(create_comment: create_comment):
    try:
        sql = f'INSERT INTO `Feed`.`feed_comment`(feed_id, user_id, feed_comment, _edit) VALUES(\'{create_comment.feed_id}\', \'{create_comment.user_id}\', \'{create_comment.feed_comment}\', \'{now_t()}\')'
        DB_instance = db_api()
        DB_instance.create(sql=sql, db_name='Feed')
        sql= 'SELECT feed_id, feed_comment, user_id, _edit FROM feed_comment ORDER BY feed_comment_id desc;'
        DB_instance = db_api()     
    except Exception as e:
        return e
    return jsonable_encoder({'comment_req': DB_instance.select(sql=sql, db_name='Feed'), 'message':'200 ok'})

@app.post("/update_comment")
def up_comment(update_comment: update_comment):
    try:
        sql = f'update feed_comment set feed_comment = \'{update_comment.feed_comment}\', _edit = \'{now_t()}\' where feed_comment_id = \'{update_comment.feed_comment_id}\' AND feed_id = \'{update_comment.feed_id}\';'
        DB_instance = db_api()
        DB_instance.create(sql=sql, db_name='Feed')
    except Exception as e:
        return e
    return jsonable_encoder({'message':'200 ok'})

@app.post("/deleteComment")
def up_comment(deleteComment: deleteComment):
    try:
        sql = f'delete FROM feed_comment where feed_id = \'{deleteComment.feed_id}\' AND user_id = \'{deleteComment.user_id}\' AND feed_comment_id =  \'{deleteComment.feed_comment_id}\';'
        DB_instance = db_api()
        DB_instance.create(sql=sql, db_name='Feed')
    except Exception as e:
        return e
    return jsonable_encoder({'message':'200 ok'})

if __name__ == '__main__':
    uvicorn.run(app, port=13000, host='0.0.0.0')