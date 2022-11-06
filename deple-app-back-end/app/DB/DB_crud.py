from dotenv import load_dotenv
import pymysql
import json

class DB_api:
    def __init__(self):
        self.conn = None
    
    def connect(self,db_name):
        self.conn = pymysql.connect(
        user='root', 
        passwd='root', 
        host='127.0.0.1', 
        db=db_name, 
        charset='utf8'
        )

    def select(self, sql, db_name):
        self.connect(db_name)
        rows = self.conn.cursor(pymysql.cursors.DictCursor)
        rows.execute(sql)
        try:
            return rows.fetchall()
        except Exception as e:
            print(e)
        finally:
            self.conn.close()

    def create(self, sql, db_name):
        try:
            self.connect(db_name)
            rows = self.conn.cursor()
            rows.execute(sql)
            self.conn.commit()
            self.conn.close()
        except Exception as e:
            print(e)