from flask import Flask, render_template, request
import numpy as np
import computations as cp
import advanced as ad
import traceback

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/result', methods = ['GET', 'POST'])
def result():
    result = ''
    isError = False
    if (request.method == 'POST'):

        select = request.form.get('operations')
        r1 = int(request.form.get('row1_size'))
        c1 = int(request.form.get('col1_size'))
        no_of_arrays = num_arrays(select)

        try:
            if (no_of_arrays == 2):
                r2 = int(request.form.get('row2_size'))
                c2 = int(request.form.get('col2_size'))
                array = input_arr(np.zeros((r1, c1)), 1, r1, c1)
                array2 = input_arr(np.zeros((r2, c2)), 2, r2, c2)
                result = select_function(select, array, array2)
            else:
                array = input_arr(np.zeros((r1, c1)), 1, r1, c1)
                result = select_function(select, array)
        except:
            result = traceback.format_exc().splitlines()[-1]
            isError=True
    return render_template('result/result.html', result = result, isError = isError)   

@app.route('/advanced')
def advanced():
    return render_template('advanced/advanced.html')

@app.route('/basic')
def basic():
    return render_template('basic/basic.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def page_not_found(e):
    return render_template('errors/500.html'), 500

def num_arrays(select):
    if (select == 'Add' or select == 'Sub' or select == 'Mult' or select == 'Div' or select=="KRO" or select=="DMAT"):
        return 2
    else:
        return 1

def input_arr(array, option, r, c):
    for i in range(r):
            for j in range(c):
                index = "{}{}{}".format(str(option), str(i), str(j))
                val = request.form.get(index)
                array[i][j] = int(val)
    return array

def select_function(select, array, array2=[]):
    if(select == 'Add'):
        result = cp.addition(array, array2)
    elif(select == 'Sub'):
        result = cp.subtraction(array, array2)
    elif(select == 'Mult'):
        result = cp.multiplication(array, array2)
    elif(select == 'MatMult'):
        result = cp.matmult(array, array2)
    elif(select == 'Trans'):
        result = cp.transpose(array)
    elif(select == 'Inv'):
        result = cp.inverse(array)
    elif(select == 'Col'):
        result = cp.column_space(array)
    elif(select == 'Row'):
        result = cp.row_space(array)
    elif(select == 'Orthonor'):
        result = cp.gramschmidt(array)
    #elif(select == 'Orthogor'):
    #    result = cp.matmult(array)
    #elif(select == 'Norm'):
    #   result = cp.matmult(array)
    #-----------------------------------------------------#
    elif(select == 'DFT'):
        result = ad.DFT(array)
    #elif(select == 'EIG'):
        #result = ad.transpose(array)
    elif(select == 'KRO'):
        result = ad.Kroneckerproduct(array, array2)
    elif(select == 'LAPL'):
        result = ad.Graph_Lap(array)
    elif(select == 'SVD'):
        result = ad.svd_values(array)
    #elif(select == 'SPCL'):
        #result = ad.gramschmidt(array)
    elif(select == 'KCL'):
        result = ad.clus_kmean(array)
    elif(select == 'DMAT'):
        result = ad.dist_mat(array, array2)
    #elif(select == 'SHER'):
        #result = ad.row_space(array)
    #elif(select == 'KALM'):
        #result = ad.gramschmidt(array)
    return result

if __name__ == "__main__":
    app.run(debug = True, host='0.0.0.0', port=8080)
