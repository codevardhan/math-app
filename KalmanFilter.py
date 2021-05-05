import numpy as np
from numpy.linalg import inv

def prediction2d(x, v, t, a): # Additional Functions for Kalman
    A = np.array([[1, t],
                  [0, 1]])
    X = np.array([[x],
                  [v]])
    B = np.array([[0.5 * t ** 2],
                  [t]])
    X_prime = A.dot(X) + B.dot(a)
    return X_prime


def covariance2d(sigma1, sigma2): #Additional Functions for Kalman
    cov1_2 = sigma1 * sigma2
    cov2_1 = sigma2 * sigma1
    cov_matrix = np.array([[sigma1 ** 2, cov1_2],[cov2_1, sigma2 ** 2]])
    return np.diag(np.diag(cov_matrix))

def KalmanFilter(x_o,v_o): #Inputs two Lists...observed positions on x-axis and observed velocites
    x_observations = np.array(x_o)
    v_observations = np.array(v_o)
    z = np.c_[x_observations, v_observations]
    # Initial Conditions
    a = 2  # Acceleration
    v = 280
    t = 1  # Difference in time

    # Process / Estimation Errors
    error_est_x = 20
    error_est_v = 5

    # Observation Errors
    error_obs_x = 25  # Uncertainty in the measurement
    error_obs_v = 6
    # Initial Estimation Covariance Matrix
    P = covariance2d(error_est_x, error_est_v)
    A = np.array([[1, t],[0, 1]])

    # Initial State Matrix
    X = np.array([[z[0][0]],[v]])
    n = len(z[0])

    for data in z[1:]:
        X = prediction2d(X[0][0], X[1][0], t, a)
        # To simplify the problem, professor
        # set off-diagonal terms to 0.
        P = np.diag(np.diag(A.dot(P).dot(A.T)))

        # Calculating the Kalman Gain
        H = np.identity(n)
        R = covariance2d(error_obs_x, error_obs_v)
        S = H.dot(P).dot(H.T) + R
        K = P.dot(H).dot(inv(S))

        # Reshape the new data into the measurement space.
        Y = H.dot(data).reshape(n, -1)

        # Update the State Matrix
        # Combination of the predicted state, measured values, covariance matrix and Kalman Gain
        X = X + K.dot(Y - H.dot(X))

        # Update Process Covariance Matrix
        P = (np.identity(len(K)) - K.dot(H)).dot(P)

    return X #Returns np 2d array-->Kalman Filter State Matrix

    
