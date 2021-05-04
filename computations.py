import numpy as np
from scipy.linalg import lu
from sympy import *


def addition(x, y):
    result = [[x[i][j] + y[i][j]
               for j in range(len(x[0]))] for i in range(len(x))]
    return result


def subtraction(x, y):
    result = [[x[i][j] - y[i][j]
               for j in range(len(x[0]))] for i in range(len(x))]
    return result

# element wise multiplication
def multiplication(x, y):
    result = [[x[i][j] * y[i][j]
               for j in range(len(x[0]))] for i in range(len(x))]
    return result

# multiplies matrix as a whole
def matmult(x, y):
    result = [[sum(a*b for a, b in zip(X_row, Y_col))
               for Y_col in zip(*y)] for X_row in x]
    return result

# Orthonormal basis
def gramschmidt(A):   # Inputs an 2d array, each column represents a vector
    R = np.zeros((A.shape[1], A.shape[1]))
    Q = np.zeros(A.shape)
    for k in range(0, A.shape[1]):
        R[k, k] = np.sqrt(np.dot(A[:, k], A[:, k]))
        Q[:, k] = A[:, k]/R[k, k]
        for j in range(k+1, A.shape[1]):
            R[k, j] = np.dot(Q[:, k], A[:, j])
            A[:, j] = A[:, j] - R[k, j]*Q[:, k]
    return Q  # Outputs one np array....columns of Q gives the orthonormal basis

# Transpose
def transpose(X):  # Input np array
    result = np.transpose(X)
    return result  # returns np array

# Inverse
def inverse(A):  # inputs an np array
    return np.linalg.inv(A)  # outputs an np array

def normalization(x):
  return (x - x.min())/(x.max() - x.min())

# Function for Column Space
def column_space(A):  # takes a 2d np array where columns are vectors
    P, L, U = lu(A)
    col_sp_A = A[:, get_indices(U)]
    return col_sp_A  # returns a 2d np array with column space

# Row Space
def row_space(A):  # takes an 2d np array
    c = Matrix(A).rref()
    ef = np.array(c[0])
    row, col = ef.shape
    flag = False

    arr = np.empty((0, col), int)

    for i in range(row):
        sum = 0
        for j in range(col):
            sum += int(ef[i, j])
        if (sum != 0):
            arr = np.append(arr, np.array([ef[i, :]]), axis = 0)
    return arr  # returns a 2d np array


def get_indices(U: np.ndarray) -> list:
    U_copy = U.copy()
    U_copy[abs(U_copy) < 1.e-7] = 0

    index_of_all_nonzero_cols_in_each_row = (
        [U_copy[i, :].nonzero()[0] for i in range(U_copy.shape[0])]
    )
    index_of_first_nonzero_col_in_each_row = (
        [indices[0] for indices in index_of_all_nonzero_cols_in_each_row
         if len(indices) > 0]
    )
    unique_indices = sorted(list(set(index_of_first_nonzero_col_in_each_row)))
    return unique_indices

# Orthogonalisation
def gramschmidt_otg(A):
    n = A.shape[1]
    for j in range(n):
        for k in range(j):
            A[:, j] -= np.dot(A[:, k], A[:, j]) * A[:, k]
        A[:, j] = A[:, j] / np.linalg.norm(A[:, j])
    return A
