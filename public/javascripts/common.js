$(function (){
    var index = location.href.indexOf(location.host),
        len = location.host.length,
        name = location.href.slice(index + len + 1);
    if (name[name.length - 1] === '/') {
        name = name.slice(0, -1);
    }
    if (name === '') {
        name = 'index';
    }
    $('.nav>li>a').each(function (i){
        if ($(this).attr('name') == name) {
            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });

    // for logout request
    $('#logout').on('click', function (ev){
        var btnId = confirm('确定要注销吗？');
        if (btnId == true) {
            $.ajax({
                url: '/logout',
                method: 'POST',
                dataType: 'json'
            })
            .done(function (data, status, xhr){
                if (status == 'success') {
                    location.href = '/login';
                }
            });
        }
    });
});