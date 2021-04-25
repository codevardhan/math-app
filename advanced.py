from flask import Flask
import numpy as np
from scipy.sparse import csgraph
from scipy.linalg import svdvals
from scipy.spatial import distance_matrix
from sklearn.cluster import KMeans

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

# Function to find the DFT matrix
def DFT(N):
	dftmtx = np.fft.fft(np.eye(N))
	return dftmtx

# Function to find the Kronecke product of 2 matrices
def Kroneckerproduct( a, b):
	result =  np.kron(a, b)
	return result

def Graph_Lap(num):
  G = np.arange(num) * np.arange(num)[:, np.newaxis]
  return csgraph.laplacian(G, normed=False)

def svd_values(arr):
    return svdvals(arr)

def dist_mat(arr, arrx):
    return distance_matrix(arr, arrx)

def Clus_Kmean(arr,n):
    kmeans = KMeans(n_clusters=n, random_state=0).fit(X)
    return kmeans.cluster_centers_