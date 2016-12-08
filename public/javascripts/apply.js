$(function () {
    var dtCfg = {
        format: 'YYYY-MM-DD HH:mm:SS',
        // showClear: true,
        showClose: true,
        ignoreReadonly: true
    };
    $('#startTime').datetimepicker(dtCfg);
    $('#endTime').datetimepicker(dtCfg);

    $('input[type="radio"][name="scope"]').change(function (ev){
        if ($(this).val() == '0') {
            $('.insideCity').removeAttr('disabled');
            $('.outsideCity').attr('disabled', 'true');
        }
        else if ($(this).val() == '1') {
            $('.outsideCity').removeAttr('disabled');
            $('.insideCity').attr('disabled', 'true');
        }
    });
});