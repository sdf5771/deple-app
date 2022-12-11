from dotenv import load_dotenv
import pymysql
import os

load_dotenv(verbose=True)

DB_IP = os.getenv('DB_IP')
DB_ID = os.getenv('DB_ID')
DB_password = os.getenv('DB_password')

class DB_api:
    def __init__(self):
        self.conn = None
        self.DB_IP = DB_IP
        self.DB_ID = DB_ID
        self.DB_password = DB_password
    
    def connect(self,db_name):
        self.conn = pymysql.connect(
        user=self.DB_ID, 
        passwd=self.DB_password, 
        host=self.DB_IP, 
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