from flask import Flask, render_template, request
import numpy as np
import computations as cp

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/result', methods=['GET', 'POST'])
def result():
    if (request.method=='POST'):
        select = request.form.get('operations')
        size = int(request.form.get('arr_size'))

    array1=np.zeros((size, size))

    if (select == 'Add' or select == 'Sub' or select == 'Mult' or select == 'Div'):
        array2=np.zeros((size, size))

        for i in range(size):
            for j in range(size):
                index = "1{}{}".format(str(i),str(j))
                val = request.form.get(index)
                array1[i][j]=int(val)
        
        for i in range(size):
            for j in range(size):
                index = "2{}{}".format(str(i),str(j))
                val = request.form.get(index)
                array2[i][j]=int(val)

        if(select == 'Add'):
            result=cp.addition(array1, array2)
        elif(select == 'Sub'):
            result=cp.subtraction(array1, array2)
        elif(select == 'Mult'):
            result=cp.multiplication(array1, array2)
        elif(select == 'MatMult'):
            result=cp.matmult(array1, array2)
    else:
        for i in range(size):
            for j in range(size):
                index = "3{}{}".format(str(i),str(j))
                val = request.form.get(index)
                array1[i][j]=int(val)

        if(select == 'Trans'):
            result=cp.transpose(array1)
        #elif(select == 'Norm'):
        #   result=cp.matmult(array1)
        elif(select == 'Inv'):
            result=cp.inverse(array1)
        elif(select == 'Col'):
            result=cp.ColumnSpace(array1)
        elif(select == 'Row'):
            result=cp.RowSpace(array1)
        #elif(select == 'Orthogor'):
        #    result=cp.matmult(array1)
        elif(select == 'Orthonor'):
            result=cp.gramschmidt(array1)
    return render_template('result/result.html', result=result)   

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