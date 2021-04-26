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


def Graph_Lap(num):
    G = np.arange(num) * np.arange(num)[:, np.newaxis]
    return csgraph.laplacian(G, normed=False)


def svd_values(arr):
    return svdvals(arr)


def dist_mat(arr, arrx):
    return distance_matrix(arr, arrx)


def Clus_Kmean(arr, n):
    kmeans = KMeans(n_clusters=n, random_state=0).fit(X)
    return kmeans.cluster_centers_
