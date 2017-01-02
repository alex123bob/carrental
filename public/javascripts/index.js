$(function (){
    $('table.car-status').on('click', '.returnCarBtn', function (ev){
        var id = $(this).attr('applicationId');
    });
});