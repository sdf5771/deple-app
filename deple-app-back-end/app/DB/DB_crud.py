from dotenv import load_dotenv
import pymysql
import json

class DB_api:
    def __init__(self):
        self.conn = None
    
    def connect(self):
        self.conn = pymysql.connect(
        user='root', 
        passwd='root', 
        host='127.0.0.1', 
        db='user', 
        charset='utf8'
        )

    def login(self, sql):
        self.connect()
        rows = self.conn.cursor()
        rows.execute(sql)
        try:
            return rows.fetchall()
        except Exception as e:
            print(e)
        finally:
            self.conn.close()

    def create(self, sql):
        self.connect()
        rows = self.conn.cursor()
        rows.execute(sql)
        self.conn.commit()
        try:
            return rows.fetchall()
        except Exception as e:
            print(e)
        finally:
            self.conn.close()
    


# def conn():
#     return pymysql.connect(
#         user='root', 
#         passwd='root', 
#         host='127.0.0.1', 
#         db='user', 
#         charset='utf8mb4_bin'
#         )

# def select(sql):
#     conn = conn()
#     with conn:
#         with conn.cursor() as cur:
#             try:
#                 cur.execute(sql)
#                 return json.dumps(cur.fetchall())
#             except exception as e:
#                 print(e)
#             finally:
#                 conn.close()

# def select(conn,sql):
#     sql = "SELECT * FROM people"
#     with conn:
#         with conn.cursor() as cur:
#             cur.execute(sql)
#             return json.dumps(cur.fetchall())
# sql = ''
# print(select(db_connect,sql))