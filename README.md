# Matrix Calculator WebApp [IN PROGRESS]

This WebApp is developed by S4 Students for their Mathematics for Intelligent Systems - 4 Group Project which supports matrix operations of up to 10x10 size for the following. 

## Expected Matrix Operations

Basic Operations:
  + Classify
  + Addition
  + Subtraction
  + Multiplication
  + Division
  + Normalization
  + Transpose
  + Inverse
  + Column space
  + Row space
  + Orthonormalization (Gram Schmidt)
  
Advanced Operations:
  + Fourier matrix and dft
  + The Kroncker product
  + Toeplitz matrix
  + Graph Laplacian Matrix
  + SVD
  + Clustering by Kmeans
  + Distance Matrix
  + Sherman Morisson
  + Kalmann filter
  
Optimization Operations: 
  + ADMM

## Requirements
- sympy
- flask
- numpy

## Usage and Local Deployment
This app requires `docker engine`, `docker-compose` and `git` installed on the local machine to build and run. 

Use the following steps for local deployment: 
```
git clone https://github.com/codevardhan/math-app.git
cd math-app
docker-compose build
docker-compose up -d
```
Then, visit `http://0.0.0.0:8080/` to see the web app in action!
