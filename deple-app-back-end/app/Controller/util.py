from datetime import datetime

def now_t():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

print(now_t())