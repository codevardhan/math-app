function sizeSelect() {
  document.getElementById("arr_size_select").innerHTML = "";
  var operationName = operations.options[operations.selectedIndex].value;
  if (
    operationName == "KRO" ||
    operationName == "DMAT"
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
  if(operationName=="KCL"){ 
    var select = document.createElement("select");
    select.name = "n_clust";
    select.id = "n_clust"
 
    for (var i=1;i<=5;i++)
    {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
    document.getElementById("other_options").appendChild(select);
    }
  }
}

function create_input() {
  var operationName = operations.options[operations.selectedIndex].value;
  var row1 = row1_size.options[row1_size.selectedIndex].value;
  var col1 = col1_size.options[col1_size.selectedIndex].value;

  document.getElementById("tables").innerHTML = "";

  if (
    operationName == "KRO" ||
    operationName == "DMAT"
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
