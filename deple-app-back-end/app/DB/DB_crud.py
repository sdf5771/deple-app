from logging import exception
from dotenv import load_dotenv
import pymysql
import json

class DB_api:
    def __init__(self):
        conn = pymysql.connect(
        user='root', 
        passwd='root', 
        host='127.0.0.1', 
        db='use', 
        charset='utf8mb4_bin'
        )

def conn():
    return pymysql.connect(
        user='root', 
        passwd='root', 
        host='127.0.0.1', 
        db='user', 
        charset='utf8mb4_bin'
        )

def select(sql):
    conn = conn()
    with conn:
        with conn.cursor() as cur:
            try:
                cur.execute(sql)
                return json.dumps(cur.fetchall())
            except exception as e:
                print(e)
            finally:
                conn.close()

# def select(conn,sql):
#     sql = "SELECT * FROM people"
#     with conn:
#         with conn.cursor() as cur:
#             cur.execute(sql)
#             return json.dumps(cur.fetchall())
# sql = ''
# print(select(db_connect,sql))