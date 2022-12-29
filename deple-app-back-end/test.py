# from uuid import UUID , uuid4
from datetime import datetime
from typing import List

# datetime object containing current date and time

# dd/mm/YY H:M:S
dt_string = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

class node: 
    def __init__(self, value):
        self.value = value
        self.r_node = None
        self.l_node = None
    
    def get_val(self):
        return self.value



if __name__=="__main__":
    root = node(5)
    
    print("Yes")