# from uuid import UUID , uuid4
from datetime import datetime

# datetime object containing current date and time

# dd/mm/YY H:M:S
dt_string = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


if __name__=="__main__":
    print(dt_string)
    # print(uuid.uuid4())