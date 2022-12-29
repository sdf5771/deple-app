from datetime import datetime
from typing import List

def now_t():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# async def upload_board(in_files: List[bytes] = File(...)):
#     file_urls=[]
#     if len(file_urls) > 3:
#         return False
#     IMG_DIR = 'app/'
#     file_path = []
#     for file in in_files:
#         print(file)
#         currentTime = now_t()
#         saved_file_name = ''.join([currentTime, str(uuid4())])
#         file_location = os.path.join(IMG_DIR, saved_file_name)
#         with open(file_location, "wb+") as file_object:
#             file_object.write(file.file.read())
#             file_path.append(file_location)
#     return file_path

print(now_t())