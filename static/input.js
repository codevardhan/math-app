var tabs;
    function change_tbl(val) {
        if (val == '') {
            $('#2s,#2d,#3d').hide();
        }

        else if (tabs == 'Double') {
            if(val== '2') {
                $('#2d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#5d,#6d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '3') {
                $('#3d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#2d,#4d,#5d,#6d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '4') {
                $('#4d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#2d,#5d,#6d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '5') {
                $('#5d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#2d,#6d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '6') {
                $('#6d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#5d,#2d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '7') {
                $('#7d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#5d,#6d,#2d,#8d,#9d,#10d').hide();
            }
            if(val== '8') {
                $('#8d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#5d,#6d,#7d,#2d,#9d,#10d').hide();
            }
            if(val== '9') {
                $('#9d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#5d,#6d,#7d,#8d,#2d,#10d').hide();
            }  
            if(val== '10') {
                $('#10d').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#5d,#6d,#7d,#8d,#9d,#2d').hide();
            } 
        }
        else {
            if(val== '2') {
                $('#2s').show();
                $('#2d,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#5d,#6d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '3') {
                $('#3s').show();
                $('#2s,#3d,#4s,#5s,#6s,#7s,#8s,#9s,#10s,#2d,#4d,#5d,#6d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '4') {
                $('#4s').show();
                $('#2s,#3s,#4d,#5s,#6s,#7s,#8s,#9s,#10s,#3d,#2d,#5d,#6d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '5') {
                $('#5s').show();
                $('#2s,#3s,#4s,#5d,#6s,#7s,#8s,#9s,#10s,#3d,#4d,#2d,#6d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '6') {
                $('#6s').show();
                $('#2s,#3s,#4s,#5s,#6d,#7s,#8s,#9s,#10s,#3d,#4d,#5d,#2d,#7d,#8d,#9d,#10d').hide();
            }
            if(val== '7') {
                $('#7s').show();
                $('#2s,#3s,#4s,#5s,#6s,#7d,#8s,#9s,#10s,#3d,#4d,#5d,#6d,#2d,#8d,#9d,#10d').hide();
            }
            if(val== '8') {
                $('#8s').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8d,#9s,#10s,#3d,#4d,#5d,#6d,#7d,#2d,#9d,#10d').hide();
            }
            if(val== '9') {
                $('#9s').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9d,#10s,#3d,#4d,#5d,#6d,#7d,#8d,#2d,#10d').hide();
            }  
            if(val== '10') {
                $('#10s').show();
                $('#2s,#3s,#4s,#5s,#6s,#7s,#8s,#9s,#10d,#3d,#4d,#5d,#6d,#7d,#8d,#9d,#2d').hide();
            } 
        }
        }

        function mattabs(val) {
            if (val == '') {
                tabs = '';
            }
            else if(val== 'Add' || val== 'Sub' || val== 'Mult' || val== 'Div'){
                tabs = 'Double';
            }
            else{
                tabs = 'Single';
            }
        }

    function calculate() {
        var number1 = $('#n1').val();
        var number2 = $('#n2').val();
        $.ajax({
        method: "POST",
        url: "computations.py/add",
        data: {x: n1,y: n2},
        success: function (data) {},
        error: function (data) {}
        });
    }
