from flask import Flask, render_template, request
import numpy as np
import computations as cp
import traceback

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/result', methods=['GET', 'POST'])
def result():
    result=''
    if (request.method=='POST'):
        select = request.form.get('operations')
        size = int(request.form.get('arr_size'))
    array=np.zeros((size, size))
    no_of_arrays = numArrays(select)
    arr1 = np.array([[1,2],[2,3]])
    arr2 = np.array([1,2])
    try:
        if (no_of_arrays==2):
            array2=np.zeros((size, size))
            array=input_arr(array,1,size)
            array2=input_arr(array2,2,size)
            
            if(select == 'Add'):
                result=cp.addition(array, array2)
            elif(select == 'Sub'):
                result=cp.subtraction(array, array2)
            elif(select == 'Mult'):
                result=cp.multiplication(array, array2)
            elif(select == 'MatMult'):
                result=cp.matmult(array, array2)
        else:
            array=input_arr(array,3,size)
            if(select == 'Trans'):
                result=cp.transpose(array)
            #elif(select == 'Norm'):
            #   result=cp.matmult(array)
            elif(select == 'Inv'):
                result=cp.inverse(array)
            elif(select == 'Col'):
                result=cp.ColumnSpace(array)
            elif(select == 'Row'):
                result=cp.RowSpace(array)
            #elif(select == 'Orthogor'):
            #    result=cp.matmult(array)
            elif(select == 'Orthonor'):
                result=cp.gramschmidt(array)
    except :
        result=traceback.format_exc().splitlines()[-1]

    if(str(type(result)) == "<class 'str'>"):
        isError=True
    else:
        isError=False
    return render_template('result/result.html', result=result, isError=isError)   

@app.route('/advanced')
def advanced():
    return render_template('advanced/advanced.html')

@app.route('/basic')
def basic():
    return render_template('basic/basic.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def page_not_found(e):
    return render_template('errors/500.html'), 500

def numArrays(select):
    if (select == 'Add' or select == 'Sub' or select == 'Mult' or select == 'Div'):
        return 2
    else:
        return 1

def input_arr(array, option, size):
    for i in range(size):
            for j in range(size):
                index = "{}{}{}".format(str(option),str(i),str(j))
                val = request.form.get(index)
                array[i][j]=int(val)
    return array