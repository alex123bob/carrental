$(function (){
    $.ajax({
        url: 'http://localhost:3000/history',
        method: 'GET'
    })
    .done(function (res){
        console.log(res);
    });
});