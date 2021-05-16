function sizeSelect() {
  const data = {
    "ADD":{
      "Desc": "This operation is used to add 2 matrices.",
      "Inp": "Enter 2 matrices that are of the same dimensions m*n.",
      "Out": "The sum of the 2 matrices of dimension m*n."
    },
    "SUB":{
      "Desc": "This operation is used to subtract the second matrix from the first.",
      "Inp": "Enter 2 matrices that are of the same dimensions m*n.",
      "Out":"The difference of the 2 matrices of dimension m*n."
    },
    "ELEMMULT":{
      "Desc": "This operation is used to multiply 2 matrices element-wise.",
      "Inp": "Enter 2 matrices that are of the same dimensions m*n.",
      "Out": "The element-wise product of the 2 matrices of dimension m*n."
    },
    "MATMULT":{
      "Desc": "This operation is used to multiply 2 matrices.",
      "Inp": "Enter 2 matrices that are of dimensions m*k and k*n.",
      "Out": "The product of the 2 matrices of dimension m*n."
    },
    "NORM":{
      "Desc": "This operation is used to normalize the input matrix.",
      "Inp": "Enter a matrix of dimensions m*n.",
      "Out": "The transpose matrix of dimension n*m."
    },
    "TRANS":{
      "Desc": "This operation is used to find the transpose of the input matrix.",
      "Inp": "Enter a matrix of dimensions m*n.",
      "Out": "Normalized matrix of dimension n*m."
    },
    "INV":{
      "Desc": "This operation is used to find the inverse of the input matrix.",
      "Inp": "Enter a matrix of dimensions m*n.",
      "Out": "The inverse matrix of dimension m*n."
    },
    "COLSP":{
      "Desc": "This operation is used to find the column space of the input matrix.",
      "Inp": "Enter a matrix of dimensions m*n.",
      "Out": "The columns of the column space m*1."
    },
    "ROWSP":{
      "Desc": "This operation is used to find the row space of the input matrix.",
      "Inp": "Enter a matrix of dimensions m*n.",
      "Out": "The rows of the row space 1*n."
    },
    "GRAMORTHONOR":{
      "Desc": "This operation is used to orthogonalize the input matrix.",
      "Inp": "Enter a matrix of dimensions m*n.",
      "Out": "The orthonormalized matrix of dimension m*n."
    }
  };
  var operationName = operations.options[operations.selectedIndex].value;

  document.getElementById("desc").innerHTML = "";
  document.getElementById("arr_size_select").innerHTML = "";
  document.getElementById("desc").innerHTML += "<b>Description:</b><br>";
  document.getElementById("desc").innerHTML += data[operationName].Desc + "<br>";
  document.getElementById("desc").innerHTML += "<b>Input:</b><br>";
  document.getElementById("desc").innerHTML += data[operationName].Inp + "<br>";
  document.getElementById("desc").innerHTML += "<b>Output:</b><br>";
  document.getElementById("desc").innerHTML += data[operationName].Out + "<br>";
  
  if (
    operationName == "ADD" ||
    operationName == "SUB" ||
    operationName == "ELEMMULT" ||
    operationName == "MATMULT"
  ) {
    document.getElementById("arr_size_select").innerHTML =
      '<div style="width: 50%; float: left;" id="matrix_1"></div>';
    document.getElementById("arr_size_select").innerHTML +=
      '<div style="width: 50%; float: left;" id="matrix_2"></div>';
    document.getElementById("matrix_1").innerHTML += "<p>Matrix 1</p>";
    document.getElementById("matrix_1").innerHTML += create_dropdown(1);
    document.getElementById("matrix_2").innerHTML += "<p>Matrix 2</p>";
    document.getElementById("matrix_2").innerHTML += create_dropdown(2);
  } else {
    document.getElementById("arr_size_select").innerHTML =
      '<div id="matrix_1"></div>';
    document.getElementById("matrix_1").innerHTML += "<p>Matrix</p>";
    document.getElementById("matrix_1").innerHTML += create_dropdown(1);
  }
}

function create_input() {
  var operationName = operations.options[operations.selectedIndex].value;
  var row1 = row1_size.options[row1_size.selectedIndex].value;
  var col1 = col1_size.options[col1_size.selectedIndex].value;

  document.getElementById("tables").innerHTML = "";

  if (
    operationName == "ADD" ||
    operationName == "SUB" ||
    operationName == "ELEMMULT" ||
    operationName == "MATMULT"
  ) {
    var row2 = row2_size.options[row2_size.selectedIndex].value;
    var col2 = col2_size.options[col2_size.selectedIndex].value;
    var table = create_table(1, row1, col1);
    table += create_table(2, row2, col2);
  } else {
    var table = create_table(1, row1, col1);
  }
  document.getElementById("tables").innerHTML += table;
}

function create_dropdown(option) {
  var row_size_select =
    "<select id='row" +
    option.toString() +
    "_size' name='row" +
    option.toString() +
    "_size'><option value='none' selected disabled hidden>Row</option>";
  var col_size_select =
    "<select id='col" +
    option.toString() +
    "_size' name='col" +
    option.toString() +
    "_size'><option value='none' selected disabled hidden>Column</option>";
  for (var i = 1; i <= 10; i++) {
    row_size_select +=
      "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
    col_size_select +=
      "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
  }
  row_size_select += "</select>";
  col_size_select += "</select>";
  return row_size_select + col_size_select;
}
function create_table(option, row, col) {
  if (option == 2) {
    var table = '<table style="border:1px solid green;">';
  } else {
    var table = '<table style="border:1px solid red;">';
  }

  for (var r = 0; r < parseInt(row, 10); r++) {
    table += "<tr>";
    for (var c = 0; c < parseInt(col, 10); c++) {
      table +=
        '<td><input type="number" value="0" size ="4" name="' +
        option.toString() +
        r.toString() +
        c.toString() +
        '"></td>';
    }
    table += "</tr>";
  }
  table += "</table>";
  return table;
}
