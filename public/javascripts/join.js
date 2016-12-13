$(function (){
    $('.btn').on('click', function (ev){
        ev.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/join',
            data: {
                name: $('#inputName').val(),
                pwd: $('#inputPassword').val()
            },
            dataType: 'json'
        })
        .done(function (data, status, xhr){
            if (status == 'success') {
                if (data.status == 'successful') {
                    location.href = '/history';
                }
                else if (data.status == 'failed') {
                    alert(data.errMsg);
                }
            }
        })
        .fail(function (data, status, xhr){
            console.log(data);
        });
    });
});