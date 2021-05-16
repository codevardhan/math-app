function sizeSelect() {
  const data = {
    DFT: {
      Desc: "A DFT matrix is an expression of a discrete Fourier transform (DFT) as a transformation matrix, which can be applied to a signal through matrix multiplication.",
      Inp: "Matrix to be transformed.",
      Out: "The DFT matrix.",
    },
    KRO: {
      Desc: "Computes the Kronecker product, a composite array made of blocks of the second array scaled by the first.",
      Inp: "Two arrays a and b of arbirary size.",
      Out: "Kronecker Product, a block matrix.",
    },
    LAPL: {
      Desc: "The Laplacian matrix can be used to find many useful properties of a graph. Together with Kirchhoff's theorem, it can be used to calculate the number of spanning trees for a given graph",
      Inp: "Input array, can be complex with equal axes.",
      Out: "The truncated or zero-padded input, transformed along the axis indicated by axis, or the last one if axis is not specified.",
    },
    SVD: {
      Desc: "In linear algebra, the singular value decomposition is a factorization of a real or complex matrix that generalizes the eigendecomposition of a square normal matrix to any m\times n matrix via an extension of the polar decomposition. In contrast to the Eigenvalue decomposition, the SVD of a matrix always exists.",
      Inp: "Matrix to decompose of dimensions M X N",
      Out: "The singular values, sorted in decreasing order.",
    },
    DMAT: {
      Desc: "A distance matrix is a square matrix containing the distances, taken pairwise, between the elements of a set. Depending upon the application involved, the distance being used to define this matrix may or may not be a metric.",
      Inp: "X:Matrix of M vectors in K dimensions. <br> Y:Matrix of N vectors in K dimensions.",
      Out: "Matrix containing the distance from every vector in x to every vector in y.",
    },
    KCL: {
      Desc: "K-means clustering is a method of vector quantization, originally from signal processing, that aims to partition n observations into k clusters in which each observation belongs to the cluster with the nearest mean (cluster centers or cluster centroid), serving as a prototype of the cluster.",
      Inp: "The number of clusters to form as well as the number of centroids to generate.",
      Out: "Coordinates of cluster centers. If the algorithm stops before fully converging these will not be consistent with labels of each point.",
    },
    SHER: {
      Desc: "The Sherman-Morrison formula is a formula that allows a perturbed matrix to be computed for a change to a given matrix . If the change can be written in the form of two vectors u and v as ‘u⛒v’, then the Sherman-Morrison formula can be calculated through its respective formula.",
      Inp: "A: matrix A of M X M dimensions <br>X: Vector of M dimensions.<br>Y:  Vector of M dimensions.",
      Out: "Inverse of the perturbed matrix Y",
    },
    KALM: {
      Desc: "Kalman filtering,is an algorithm that uses a series of measurements observed over time, containing statistical noise and other inaccuracies, and produces estimates of unknown variables,by estimating a joint probability distribution over the variables for each timeframe. This model can be used to predict position and velocity of an object in an axis based on the observed positions and velocity. The off-diagonal values in covariance matrices are zeroed out",
      Inp: "Observed positions on an axis and the corresponding velocities as two lists",
      Out: "Predicted position and velocity in an array",
    },
  };
  document.getElementById("arr_size_select").innerHTML = "";
  var operationName = operations.options[operations.selectedIndex].value;
  document.getElementById("desc").innerHTML = "";
  document.getElementById("arr_size_select").innerHTML = "";
  document.getElementById("desc").innerHTML += "<b>Description:</b><br>";
  document.getElementById("desc").innerHTML +=
    data[operationName].Desc + "<br>";
  document.getElementById("desc").innerHTML += "<b>Input:</b><br>";
  document.getElementById("desc").innerHTML += data[operationName].Inp + "<br>";
  document.getElementById("desc").innerHTML += "<b>Output:</b><br>";
  document.getElementById("desc").innerHTML += data[operationName].Out + "<br>";
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
    document.getElementById("matrix_1").innerHTML += create_int_dropdown(
      "row1_size",
      "Row",
      1,
      10
    );
    document.getElementById("matrix_1").innerHTML += create_int_dropdown(
      "col1_size",
      "Column",
      1,
      10
    );
    document.getElementById("matrix_2").innerHTML += "<p>Matrix 2</p>";
    document.getElementById("matrix_2").innerHTML += create_int_dropdown(
      "row2_size",
      "Row",
      1,
      10
    );
    document.getElementById("matrix_2").innerHTML += create_int_dropdown(
      "col2_size",
      "Column",
      1,
      10
    );
  } else if (operationName == "SHER") {
    document.getElementById("arr_size_select").innerHTML =
      '<div style="width: 33%; float: left;" id="matrix_1"></div>';
    document.getElementById("arr_size_select").innerHTML +=
      '<div style="width: 33%; float: left;" id="matrix_2"></div>';
    document.getElementById("arr_size_select").innerHTML +=
      '<div style="width: 33%; float: left;" id="matrix_3"></div>';
    document.getElementById("matrix_1").innerHTML += "<p>Matrix 1</p>";
    document.getElementById("matrix_1").innerHTML += create_int_dropdown(
      "row1_size",
      "Row",
      1,
      10
    );
    document.getElementById("matrix_1").innerHTML += create_int_dropdown(
      "col1_size",
      "Column",
      1,
      10
    );
    document.getElementById("matrix_2").innerHTML += "<p>Array 1</p>";
    document.getElementById("matrix_2").innerHTML += create_int_dropdown(
      "row2_size",
      "Row",
      1,
      10
    );
    document.getElementById("matrix_2").innerHTML += create_int_dropdown(
      "col2_size",
      "Column",
      1,
      10
    );
    document.getElementById("matrix_3").innerHTML += "<p>Array 2</p>";
    document.getElementById("matrix_3").innerHTML += create_int_dropdown(
      "row3_size",
      "Row",
      1,
      10
    );
    document.getElementById("matrix_3").innerHTML += create_int_dropdown(
      "col3_size",
      "Column",
      1,
      10
    );
  } else {
    document.getElementById("arr_size_select").innerHTML =
      '<div id="matrix_1"></div>';
    document.getElementById("matrix_1").innerHTML += "<p>Matrix</p>";
    document.getElementById("matrix_1").innerHTML += create_int_dropdown(
      "row1_size",
      "Row",
      1,
      10
    );
    document.getElementById("matrix_1").innerHTML += create_int_dropdown(
      "col1_size",
      "Column",
      1,
      10
    );
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
  } else if (operationName == "SHER") {
    var row1 = row1_size.options[row1_size.selectedIndex].value;
    var col1 = col1_size.options[col1_size.selectedIndex].value;
    var row2 = row2_size.options[row2_size.selectedIndex].value;
    var col2 = col2_size.options[col2_size.selectedIndex].value;
    var row3 = row3_size.options[row3_size.selectedIndex].value;
    var col3 = col3_size.options[col3_size.selectedIndex].value;
    var table = create_table(1, row1, col1);
    table += create_table(2, row2, col2);
    table += create_table(3, row3, col3);
  } else {
    var row1 = row1_size.options[row1_size.selectedIndex].value;
    var col1 = col1_size.options[col1_size.selectedIndex].value;
    var table = create_table(1, row1, col1);
  }
  document.getElementById("tables").innerHTML += table;
  if (operationName == "KCL") {
    document.getElementById("other_options").innerHTML += create_int_dropdown(
      "n_clust",
      "Number of clusters",
      1,
      5
    );
  }
}

function create_int_dropdown(unique_id, text, start, end) {
  var dropdown_list =
    "<select id='" +
    unique_id.toString() +
    "' name='" +
    unique_id.toString() +
    "'><option value='none' selected disabled hidden>" +
    text +
    "</option>";

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

function default_values(opName) {
  if (opName == "KALM") {
    document.getElementById("row1_size").disabled = true;
    document.getElementById("row1_size").value = 1;

    var row1_in = document.createElement("input");
    row1_in.setAttribute("type", "hidden");
    row1_in.setAttribute("name", "row1_size");
    row1_in.setAttribute("value", "1");

    document.getElementById("row2_size").disabled = true;
    document.getElementById("row2_size").value = 1;

    var row2_in = document.createElement("input");
    row2_in.setAttribute("type", "hidden");
    row2_in.setAttribute("name", "row2_size");
    row2_in.setAttribute("value", "1");

    document.getElementById("arr_size_select").appendChild(row1_in);
    document.getElementById("arr_size_select").appendChild(row2_in);

    document.getElementById("col2_size").onchange = function () {
      document.getElementById("col1_size").value =
        document.getElementById("col2_size").value;
    };
    document.getElementById("col1_size").onchange = function () {
      document.getElementById("col2_size").value =
        document.getElementById("col1_size").value;
    };
  }
  if (opName == "SHER") {
    document.getElementById("col2_size").disabled = true;
    document.getElementById("col2_size").value = 1;

    var col2_in = document.createElement("input");
    col2_in.setAttribute("type", "hidden");
    col2_in.setAttribute("name", "col2_size");
    col2_in.setAttribute("value", "1");

    document.getElementById("col3_size").disabled = true;
    document.getElementById("col3_size").value = 1;

    var col3_in = document.createElement("input");
    col3_in.setAttribute("type", "hidden");
    col3_in.setAttribute("name", "col3_size");
    col3_in.setAttribute("value", "1");

    document.getElementById("arr_size_select").appendChild(col2_in);
    document.getElementById("arr_size_select").appendChild(col3_in);

    document.getElementById("row1_size").onchange = function () {
      var changed_val = document.getElementById("row1_size").value;
      document.getElementById("col1_size").value = changed_val;
      document.getElementById("row2_size").value = changed_val;
      document.getElementById("row3_size").value = changed_val;
    };

    document.getElementById("row2_size").onchange = function () {
      var changed_val = document.getElementById("row2_size").value;
      document.getElementById("col1_size").value = changed_val;
      document.getElementById("row1_size").value = changed_val;
      document.getElementById("row3_size").value = changed_val;
    };
    document.getElementById("row3_size").onchange = function () {
      var changed_val = document.getElementById("row3_size").value;
      document.getElementById("col1_size").value = changed_val;
      document.getElementById("row1_size").value = changed_val;
      document.getElementById("row2_size").value = changed_val;
    };
  }
}
