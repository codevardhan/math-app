function create_input() {
    var operationName = operations.options[operations.selectedIndex].value;
    var array_size = arr_size.options[arr_size.selectedIndex].value;
    document.getElementById('tables').innerHTML = '';

    if(operationName == "Add" || operationName == "Sub" || operationName == "Mult" || operationName == "MatMult"){
        var table = create_table(1,array_size);
        table += create_table(2,array_size);
    }
    else{
        var table = create_table(3,array_size);
    }
    document.getElementById('tables').innerHTML += table;
}
function create_table(option, array_size){
    if(option==2){
        var table = '<table style="border:1px solid green;">';
    }
    else{
        var table = '<table style="border:1px solid red;">';
    }

    for (var r=0; r<parseInt(array_size,10);r++){
        table +='<tr>';
        for (var c=0; c<parseInt(array_size,10);c++){
            table += '<td><input type="number" value="0" size ="4" name="'+ option.toString() + r.toString() + c.toString() +'"></td>';
        }
        table +='</tr>';
    }
    table+='</table>'
    return table;
}