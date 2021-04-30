import numpy as np
from numpy.linalg import inv
from numpy.linalg import norm
from joblib import Parallel, delayed
from multiprocessing import Process, Manager, cpu_count, Pool
# Using L1 norm in this ADMM implementation using LASSO
# Minimization operation on X_t+1 for parallel implementation
class singlesolution:
    def solve(self, A, b, nu, rho, Z):
        t1 = A.dot(A.T)
        A = A.reshape(-1,1)
        tX = (A * b + rho * Z ) / (t1 + rho)

# Updated dual variable in parallel implementation
class CombineSolution:
    def combine(self, nuBar, xBar, Z, rho):
        t = nuBar.reshape(-1, 1)
        t = t + rho * (xBar.reshape(-1, 1) - Z)
        return t.T

class ADMM:
    def __init__(self, A, b, parallel = False):
        self.D = A.shape[1]
        self.N = A.shape[0]
        if parallel:
            self.XBar = np.zeros((self.N, self.D))
            self.nuBar = np.zeros((self.N, self.D))
        # self.nu is V_(t)
        self.nu = np.zeros((self.D, 1))
        self.rho = 1
        self.X = np.random.randn(self.D, 1)
        self.Weights = self.X
        self.Z = np.zeros((self.D, 1))
        self.A = A
        self.b = b
        # alpha = lambda, ie learning rate
        self.alpha = 0.01
        self.parallel = parallel
        self.numberOfThreads = cpu_count()

    # Vectorized serial implementation
    def step(self):
        if self.parallel:
            return self.step_parallel()
        #Minimization of X (closed form eqn) X_t+!
        self.X = inv(self.A.T.dot(self.A) + self.rho).dot(self.A.T.dot(self.b) + self.rho * self.Z - self.nu)
        #Minimization of Z (closed form eqn) Z_t+1
        self.Z = self.X + self.nu / self.rho - (self.alpha / self.rho) *  np.sign(self.Z)
        #Combine (update dual variable) Vt+1
        self.nu = self.nu + self.rho * (self.X - self.Z)

    def solveIndividual(self, i):
        single = singlesolution()
        return single.solve(self.A[i], np.asscalar(self.b[i]), self.nuBar[i].reshape(-1, 1), self.rho, self.Z)
    def CombineSolution(self, i):
        mix = CombineSolution()
        return mix.combine(self.nuBar[i].reshape(-1, 1), self.XBar[i].reshape(-1, 1), self.Z, self.rho)

    def step_parallel(self):
        # Minimization on X_t+1 in parallel implementation
        process = []
        for i in range(0, self.N-1):
            p = Process(target = self.solveIndividual, args = (i, ))
            p.start()
            process.append(p)

        for p in process:
            p.join()
        self.X = np.average(self.XBar, axis = 0)
        self.nu = np.average(self.nuBar, axis = 0)
        self.X = self.X.reshape(-1, 1)
        self.nu = self.nu.reshape(-1, 1)

        # Minimization on Z_t+1 in parallel implementation
        self.Z = self.X + self.nu / self.rho - (self.alpha/self.rho) * np.sign(self.Z)
        # Combine (update dual variable)
        process = []
        for i in range(0, self.N -1):
            p = Process(target = self.CombineSolution, args = (i, ))
            p.start()
            process.append(p)
        for p in process:
            p.join()

    # combine <N> processors into one
    def step_iterative(self):
        # solve for X_t+1
        for i in range(0, self.N-1):
            t = self.solveIndividual(i)
            self.XBar[i] = t.T
        self.X = np.average(self.XBar, axis = 0)
        self.nu = np.average(self.nuBar, axis = 0)

        self.X = self.X.reshape(-1, 1)
        self.nu = self.nu.reshape(-1, 1)

        # solve for Z_t+1
        self.Z = self.X + self.nu/self.rho - (self.alpha / self.rho) * np.sign(self.Z)

        # combine (update the dual variable)
        for i in range(0, self.N-1):
            t = self.nuBar[i].reshape(-1, 1)
            t = t + self.rho * (self.XBar[i].reshape(-1, 1) - self.Z)
            self.nuBar[i] = t.T

    # Lasso regression using L1 regualrization
    def LassoObjective(self):
        return 0.5 * norm(self.A.dot(self.X) - self.b) ** 2 + self.alpha * norm(self.X, 1)

    # Weights
    def LassoWeights(self):
        return self.Weights
