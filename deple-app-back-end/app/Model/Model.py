from pydantic import BaseModel

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
    # file: List[UploadFile]

class create_comment(BaseModel):
    feed_id: str
    user_id: str
    feed_comment: str

class update_comment(BaseModel):
    feed_id: str
    user_id: str
    feed_comment: str
    feed_comment_id: str

class select_comment(BaseModel):
    feed_id: int

class deleteComment(BaseModel):
    feed_id: str
    user_id: str
    feed_comment_id: str