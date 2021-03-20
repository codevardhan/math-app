def addition(x, y):
    result = [[x[i][j] + y[i][j] for j in range(len(x[0]))] for i in range(len(x))]
    return result

def subtraction(x, y):
    result = [[x[i][j] - y[i][j] for j in range(len(x[0]))] for i in range(len(x))]
    return result

#element wise multiplication
def multiplication(x, y):
    result = [[x[i][j] * y[i][j] for j in range(len(x[0]))] for i in range(len(x))]
    return result

#multiplies matrix as a whole
def matmult(x, y):
    result = [[sum(a*b for a, b in zip(X_row, Y_col)) for Y_col in zip(*y)] for X_row in x]
    return result