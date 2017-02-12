$(function (){
    $("[data-toggle='tooltip']").tooltip();
    
    $('table.car-status').on('click', '.returnCarBtn', function (ev){
        var applicationId = $(this).attr('applicationId'),
            res = confirm('确定要进行还车操作吗？');
        if (res == true) {
            $.ajax({
                url: '/returnCar',
                method: 'POST',
                dataType: 'json',
                data: {
                    applicationId: applicationId
                }
            })
            .done(function (data, status, xhr){
                if (status == 'success') {
                    if (data.status == 'successful') {
                        alert('还车成功！');
                        location.href = '/';
                    }
                    else if (data.status == 'failed') {
                        alert(data.errMsg);
                    }
                }
            })
            .fail(function (data, status, xhr){
                console.log(data);
            })
        }
    });
    
    $('.search-form').submit(function (ev){
        ev.preventDefault();
    });

    $('.searchByPlate').click(function (ev){
        var plate = $('#carPlate').val();
        if (plate) {
            location.href = '/plate-' + plate;
        }
        else {
            alert('请输入车辆牌照!');
        }
    });

    $('.resetPlate').click(function (ev){
        location.href = '/';
    });
});