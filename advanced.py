from flask import Flask
import numpy as np
import KalmanFilter as kalm
from scipy.sparse import csgraph
from scipy.linalg import svdvals
from scipy.spatial import distance_matrix
from sklearn.cluster import KMeans

# Function to find the DFT matrix
def dft(N):
    return np.fft.fft(N)

# Function to find the Kronecke product of 2 matrices
def Kroneckerproduct(a, b):
    result = np.kron(a, b)
    return result

# Function to find the graph laplacian of a matrix
def Graph_Lap(G):
    return csgraph.laplacian(G, normed=False)

# Function to do singular value decomposition
def svd_values(arr):
    return svdvals(arr)

# Find distance matrix between two arrays
def dist_mat(arr, arrx):
    return distance_matrix(arr, arrx)

# Find Kmeans cluster of two arrays
def clus_kmean(arr, n):
    kmeans = KMeans(n_clusters=n, random_state=0).fit(arr)
    return kmeans.cluster_centers_

def kalmann_filter(arr1, arr2):
    return kalm.KalmanFilter(arr1.flatten(), arr2.flatten())

def SMInv(Ainv, u, v, e=None):
    u = u.reshape((len(u),1))
    v = v.reshape((len(v),1))
    if e is not None:
        g = np.dot(Ainv, u) / (e + np.dot(v.T, np.dot(Ainv, u)))			
        return (Ainv / e) - np.dot(g, np.dot(v.T, Ainv/e))
    else:
        return Ainv - np.dot(Ainv, np.dot(np.dot(u,v.T), Ainv)) / ( 1 + np.dot(v.T, np.dot(Ainv, u)))