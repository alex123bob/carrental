$(function () {
    var dtCfg = {
        format: 'YYYY-MM-DD HH:mm:SS',
        // showClear: true,
        showClose: true,
        ignoreReadonly: true
    };
    $('#startTime').datetimepicker(dtCfg);
    $('#endTime').datetimepicker(dtCfg);
});