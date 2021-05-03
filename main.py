from flask import Flask, render_template, request, redirect
import numpy as np
import computations as cp
import advanced as ad
import traceback

UPLOAD_FOLDER = 'uploads/'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/result', methods = ['GET', 'POST'])
def result():
    result = ''
    isError = False
    if (request.method == 'POST'):
        #print(request.form)
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
    return render_template('result/result.html', result = "Function not called", isError = True)
      

@app.route('/files_upload', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        print(request.files)
        if not ('matrix_A' in request.files or 'matrix_b' in request.files):
            err_message='Please upload a file'
            return render_template('admm/admm.html', message=err_message)
        matA = request.files['A']
        matB = request.files['b']

        if matA.filename == '' or matB.filename == '':
            err_message='Please upload a file with a filename'
            return render_template('admm/admm.html', message=err_message)
        elif not(matA.endswith(".csv") and matB.endswith(".csv") ):
            err_message='Uploaded file is not a csv file'
            return render_template('admm/admm.html', message=err_message)
        else:
            matAdata = pd.read_csv(matA)
            matBdata = pd.read_csv(matB)
            try:
                admm = ADMM(A, b, parallel = True)
                result=admm.LassoObjective()
            except:
                result = traceback.format_exc().splitlines()[-1]
                isError=True
            return render_template('result/result.html', result = result, isError = isError)
        return render_template('result/result.html', result = "Function not called", isError = True)



@app.route('/advanced')
def advanced():
    return render_template('advanced/advanced.html')

@app.route('/basic')
def basic():
    return render_template('basic/basic.html')

@app.route('/optimizaton-admm')
def admm():
    return render_template('admm/admm.html', message='')

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

maps = {
    'Add' : cp.addition,
    'Sub' : cp.subtraction,
    'Mult' : cp.multiplication,
    'MatMult' : cp.matmult,
    'Trans' : cp.transpose,
    'Inv' : cp.inverse,
    'Col' : cp.column_space,
    'Row' : cp.row_space,
    'Orthonor' : cp.gramschmidt,
    'Orthogor' : cp.matmult,
    'Norm' : cp.matmult,
    'DFT' : ad.dft,
    'EIG' : ad.transpose,
    'KRO' : ad.Kroneckerproduct,
    'LAPL' : ad.Graph_Lap,
    'SVD' : ad.svd_values,
    'SPCL' : ad.gramschmidt,
    'KCL' : ad.clus_kmean,
    'DMAT' : ad.dist_mat,
    'SHER' : cp.row_space,
    'KALM' : cp.gramschmidt
}

def select_function(select, array, array2=[]):
    return maps[select](array) if array2 == [] else maps[select](array, array2)

if __name__ == "__main__":
    app.run(debug = True, host='0.0.0.0', port=8080)
