from uuid import UUID , uuid4

session = uuid4()
data = SessionData(username=name)

class SessionData(BaseModel):
    username: str

    await backend.create(session, data)
    cookie.attach_to_response(response, session)

if __name__=="__main__":
    print(data)