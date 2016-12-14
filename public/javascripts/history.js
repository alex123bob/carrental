$(function (){
    $('table').on('click', '.check', function (ev){
        var applicationId = $(this).attr('applicationId');
        location.href = '/status/' + applicationId;
    });
});