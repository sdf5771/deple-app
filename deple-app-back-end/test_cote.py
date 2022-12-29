

# class Node:
#     def __init__(self, n) -> None:
#         self.right == None,
#         self.left == None,
#         self.num == n

# def soulution(input_str):

#     pass



if __name__ == "__main__":
    # _ss = '(())'
    # for i in range(0, len(_ss)):

    #     _ss[i] += '1'
    # print(_ss)
    _int = 3
    _S = 'PHYSESDFERR'
    # P[0]      E[4]      E[8]
    # H[1] S[3] S[5] F[7] R[9]
    # Y[2]      D[6]      R[10]

    # [0,4,8,
    #  1,3,5,7,9,
    #  2,6,10]

    # 일단 라인을 나눴어 어짜피 순서대로 맞춰야 하기 때문에
    # 원래 출력 되야 하는 글자 순서대로 더해주는 역할을 했어
    # 따로 빼거나 하지 않고 바로 
    # 더 해줬기때문에 다른 빈칸의 공간복잡도에서 효율을 얻었음


    _res = ''
    for r in range(_int): 
        increment = 2 * (_int -1)
        for i in range(r, len(_S), increment):
            _res += _S[i]
            if r > 0 and r < _int -1  and len(_S) > i + increment - 2 * r:
                _res += _S[i + increment - 2 * r]

    print(_res)
        