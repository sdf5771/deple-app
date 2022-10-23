import json
from enum import Enum
import uvicorn
from app.DB.DB_crud import DB_api
import app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel


app = FastAPI()

@app.get("/login/{id}/{pw}")
async def login(id: str, pw: str):
    sql= f'SELECT * FROM people WHERE id = \'{id}\' and pw = \'{pw}\''
    DB_instance = DB_api()
    if DB_instance.login(sql=sql):
        return jsonable_encoder({'id': list({id})[0], 'auth':'yes'})
    else:
        auth = {'auth':'no'}
        return jsonable_encoder(auth)

class create_id(BaseModel):
    userId: str
    userPw: str
    name: str
    mail: str
    contact: str

@app.post("/create")
async def create(create_id: create_id):
    print(type(create_id.userId))
    sql = f'INSERT INTO `user`.`people`(id, pw, name, email, contact) VALUES(\'{create_id.userId}\',\'{create_id.userPw}\',\'{create_id.name}\',\'{create_id.mail}\',\'{create_id.contact}\')'
    DB_instance = DB_api()
    try:
        print("시작")
        DB_instance.create(sql=sql)
        print("끝")
    except Exception as e:
        print("문제발생")
        return e
    return jsonable_encoder({'id': list([create_id]), 'message':'생성완료'})
        
@app.get("/")
async def root():
    return "yes"

if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='0.0.0.0')

# @app.delete("/")
# async def root():
#     return {"message": "Hello Wordl"}

# @app.options("/")
# async def root():
#     return {"message": "Hello Wordl"}

# @app.head("/")
# async def root():
#     return {"message": "Hello Wordl"}

# @app.patch("/")
# async def root():
#     return {"message": "Hello Wordl"}

# @app.trace("/")
# async def root():
#     return {"message": "Hello Wordl"}

# @app.get("/models/{model_name}")
# async def get_model(model_name: ModelName):
#     if model_name is ModelName.alexnet:
#         return {"model_name": model_name, "message": "Deep Learning FTW!"}
#     if model_name.value == "lenet":
#         return {"model_name": model_name, "message": "LeCNN all the images"}
#     return {"model_name": model_name, "message": "Have some residuals"}

# @app.get("/files/{file_path:path}")
# async def read_file(file_path: str):
#     return {"file_path": file_path}