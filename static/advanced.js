function sizeSelect() {
  document.getElementById("arr_size_select").innerHTML = "";
  var operationName = operations.options[operations.selectedIndex].value;
  if (
    operationName == "KRO" ||
    operationName == "DMAT" ||
    operationName == "KALM"
  ) {
    document.getElementById("arr_size_select").innerHTML =
      '<div style="width: 50%; float: left;" id="matrix_1"></div>';
    document.getElementById("arr_size_select").innerHTML +=
      '<div style="width: 50%; float: left;" id="matrix_2"></div>';
    document.getElementById("matrix_1").innerHTML += "<p>Matrix 1</p>";
    document.getElementById("matrix_1").innerHTML += create_int_dropdown("row1_size", "Row", 1, 10);
    document.getElementById("matrix_1").innerHTML += create_int_dropdown("col1_size", "Column", 1, 10);
    document.getElementById("matrix_2").innerHTML += "<p>Matrix 2</p>";
    document.getElementById("matrix_2").innerHTML += create_int_dropdown("row2_size", "Row", 1, 10);
    document.getElementById("matrix_2").innerHTML += create_int_dropdown("col2_size", "Column", 1, 10);
  }
  else {
    document.getElementById("arr_size_select").innerHTML =
      '<div id="matrix_1"></div>';
    document.getElementById("matrix_1").innerHTML += "<p>Matrix</p>";
    document.getElementById("matrix_1").innerHTML += create_int_dropdown("row1_size", "Row", 1, 10);
    document.getElementById("matrix_1").innerHTML += create_int_dropdown("col1_size", "Column", 1, 10);
  }
  default_values(operationName);
  }

function create_input() {
  var operationName = operations.options[operations.selectedIndex].value;

  document.getElementById("tables").innerHTML = "";
  document.getElementById("other_options").innerHTML = "";

  if (
    operationName == "KRO" ||
    operationName == "DMAT" ||
    operationName == "KALM"

  ) {
    var row1 = row1_size.options[row1_size.selectedIndex].value;
    var col1 = col1_size.options[col1_size.selectedIndex].value;
    var row2 = row2_size.options[row2_size.selectedIndex].value;
    var col2 = col2_size.options[col2_size.selectedIndex].value;
    var table = create_table(1, row1, col1);
    table += create_table(2, row2, col2);
  }
  else {
    var row1 = row1_size.options[row1_size.selectedIndex].value;
    var col1 = col1_size.options[col1_size.selectedIndex].value;
    var table = create_table(1, row1, col1);
  }
  document.getElementById("tables").innerHTML += table;
  if(operationName=="KCL"){ 
    var select = document.createElement("select");
    select.name = "n_clust";
    select.id = "n_clust"
    
    var option = document.createElement("option");

    option.value="none";
    option.text="Number of clusters"
    option.disabled=true;
    option.selected=true;
    option.hidden=true;
    select.appendChild(option);

    for (var i=1;i<=5;i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
    document.getElementById("other_options").appendChild(select);
    }
}

function create_int_dropdown(unique_id, text, start, end) {
  var dropdown_list =
    "<select id='" +
    unique_id.toString() +
    "' name='" +
    unique_id.toString() +
    "'><option value='none' selected disabled hidden>"+text+"</option>";

  for (var i = start; i <= end; i++) {
    dropdown_list +=
      "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
  }
  dropdown_list += "</select>";
  return dropdown_list;
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
function default_values(opName){
  if(opName=="KALM"){
    document.getElementById("row1_size").disabled = true;
    document.getElementById("row1_size").value  = 1;

    var row1_in = document.createElement("input");
    row1_in.setAttribute("type", "hidden");
    row1_in.setAttribute("name", "row1_size");
    row1_in.setAttribute("value", "1");

    document.getElementById("row2_size").disabled = true;
    document.getElementById("row2_size").value  = 1;

    var row2_in = document.createElement("input");
    row2_in.setAttribute("type", "hidden");
    row2_in.setAttribute("name", "row2_size");
    row2_in.setAttribute("value", "1");

    document.getElementById("arr_size_select").appendChild(row1_in);
    document.getElementById("arr_size_select").appendChild(row2_in);

    document.getElementById("col2_size").onchange = function(){
      document.getElementById("col1_size").value = document.getElementById("col2_size").value ;};
    document.getElementById("col1_size").onchange = function(){
      document.getElementById("col2_size").value = document.getElementById("col1_size").value ;};
  }
}