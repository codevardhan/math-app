from flask import Flask
import numpy as np
from scipy.sparse import csgraph
from scipy.linalg import svdvals
from scipy.spatial import distance_matrix
from sklearn.cluster import KMeans

# Function to find the DFT matrix


def DFT(N):
    dftmtx = np.fft.fft(np.eye(N))
    return dftmtx

# Function to find the Kronecke product of 2 matrices


def Kroneckerproduct(a, b):
    result = np.kron(a, b)
    return result

# Function to find the graph laplacian of a matrix


def Graph_Lap(num):
    G = np.arange(num) * np.arange(num)[:, np.newaxis]
    return csgraph.laplacian(G, normed=False)

# Function to do singular value decomposition


def svd_values(arr):
    return svdvals(arr)

# Find distance matrix between two arrays


def dist_mat(arr, arrx):
    return distance_matrix(arr, arrx)

# Find Kmeans cluster of two arrays

def clus_kmean(arr, n):
    kmeans = KMeans(n_clusters=n, random_state=0).fit(X)
    return kmeans.cluster_centers_
