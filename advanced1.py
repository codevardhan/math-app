from flask import Flask
import numpy as np

app = Flask(__name__)

@app.route('/')

# Function to check whether given   
# matrix is a Toeplitz matrix or not 
def isToeplitz(mat, M, N):  
	for i in range(1, N): 
		for j in range(M-1): 
			if (mat[i][j]!=mat[i+1][j+1]):
				print("It is Not a Toeplitz matrix") 
                return False
    print("It is a Toeplitz matrix")
    return True

# Function to fint the DFT matrix
def DFT(N):
	dftmtx = np.fft.fft(np.eye(N))
	return dftmtx

# Function to find the Kronecke product of 2 matrices
def Kroneckerproduct( a, b): 
	result =  np.kron(a, b)
	return result