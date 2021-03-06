$(function () {
    // initialize datetimepicker for time selection.
    var dtCfg = {
        format: 'YYYY-MM-DD HH:mm:ss',
        // showClear: true,
        showClose: true,
        ignoreReadonly: true
    };
    $('#startTime').datetimepicker(dtCfg);
    $('#endTime').datetimepicker(dtCfg);

    // initialize city address radio box logic operation.
    $('input[type="radio"][name="scope"]').change(function (ev){
        if ($(this).val() == '0') {
            $('.insideCity').removeAttr('disabled');
            $('.outsideCity').attr('disabled', 'true').find('input').val('');
        }
        else if ($(this).val() == '1') {
            $('.outsideCity').removeAttr('disabled');
            $('.insideCity').attr('disabled', 'true').find('input').val('');
        }
    });

    // submit logic operation.
    $('.applySubmit').on('click', function (ev){
        var
            $depa = $('#depa'),
            $renter = $('#renter'),
            $contact = $('#contact'),
            $headcount = $('#headcount'),
            $startTime = $('#startTime'),
            $endTime = $('#endTime'),
            $workContent = $('input[type="checkbox"]:checked'),
            $scope = $('input[type="radio"]:checked'),
            $internalAddr = $('#internalAddr'),
            $externalAddr = $('#externalAddr'),
            $remark = $('#remark'),
            workContent = [],
            isEmpty = false,
            isTicked = false, // for checkbox
            isChecked = false; // for radio
        $('.application-form input:not([type="radio"]):not([type="checkbox"])').each(function (index, input){
            var $inputItem = $(input),
                $formGroup = $inputItem.closest('.form-group');;
            if ($inputItem.attr('id') == 'internalAddr' || $inputItem.attr('id') == 'externalAddr') {
                var $city = $inputItem.closest('fieldset');
                if ($city.prev('.form-group').find('[name="scope"]').is(':checked')) {;
                    if ($inputItem.val().trim().length == 0) {
                        !$formGroup.hasClass('has-error') && $formGroup.addClass('has-error');
                        isEmpty = true;
                    }
                    else {
                        $formGroup.removeClass('has-error');
                    }
                    isChecked = true;
                }
                else {
                    $formGroup.removeClass('has-error');
                }
                return;
            }
            if ($inputItem.val().trim().length == 0) {
                !$formGroup.hasClass('has-error') && $formGroup.addClass('has-error');
                isEmpty = true;
            }
            else {
                $formGroup.removeClass('has-error');
            }
        });
        if ($workContent.length > 0) {
            $workContent.each(function (index, chk){
                workContent.push($(chk).attr('key'));
            });
            workContent = workContent.join(',');
            isTicked = true;
        }
        if (!isEmpty && isTicked && isChecked) {
            $.ajax({
                url: '/apply',
                method: 'POST',
                data: {
                    depa: $depa.find('option:selected').attr('depaId'),
                    renter: $renter.attr('renter'),
                    contact: $contact.val(),
                    headcount: $headcount.find('option:selected').val(),
                    startTime: $startTime.find('input').val(),
                    endTime: $endTime.find('input').val(),
                    workContent: workContent,
                    scope: $scope.val(),
                    address: $internalAddr.is(':disabled') ? $externalAddr.val() : $internalAddr.val(),
                    status: 0,
                    remark: $remark.val()
                },
                dataType: 'json'
            })
            .done(function (data, status, xhr){
                if (status == 'success') {
                    if (data.status == 'successful') {
                        alert('申请成功！');
                        location.href = '/history';
                    }
                }
            });
        }
        else {
            // do nothing. form is not completed.
        }
    });

    $('.adminCheck').on('click', function (ev){
        var $radios = $('[name="adminApproval"]'),
            $rentedCar = $('#rentedCar'),
            $remark = $('#adminCheckRemark'),
            $formGroup;
        if ($radios.eq(1).is(':checked') && $rentedCar.find('option:selected').val().trim().length == 0) {
            $formGroup = $rentedCar.closest('.form-group');
            !$formGroup.hasClass('has-error') && $formGroup.addClass('has-error');
            return false;
        }
        else if ($remark.val().trim().length == 0) {
            $rentedCar.closest('.form-group').removeClass('has-error');
            $formGroup = $remark.closest('.form-group');
            !$formGroup.hasClass('has-error') && $formGroup.addClass('has-error');
            return false;
        }
        else if (!$('[name="adminApproval"]').is(':checked')) {
            alert('请选择审核意见');
            return false;
        }
        else {
            $.ajax({
                url: '/status/check',
                method: 'POST',
                data: $.extend({
                    applicationId: $(this).attr('applicationId'),
                    drt: $radios.eq(0).is(':checked') ? '-1' : '+1',
                    remark: $remark.val()
                }, $radios.eq(1).is(':checked') ? {
                    carId: $rentedCar.find('option:selected').attr('carId')
                } : {}),
                dataType: 'json'
            })
            .done(function (data, status, xhr){
                if (status == 'success') {
                    if (data.status == 'successful') {
                        alert('车管员审核成功！');
                        location.href = '/history';
                    }
                }
            });
        }
    });

    $('.directorCheck').on('click', function (ev){
        var $radios = $('[name="directorApproval"]'),
            $remark = $('#directorCheckRemark'),
            $formGroup;
        if ($remark.val().trim().length == 0) {
            $formGroup = $remark.closest('.form-group');
            !$formGroup.hasClass('has-error') && $formGroup.addClass('has-error');
            return false;
        }
        else if (!$('[name="directorApproval"]').is(':checked')) {
            alert('请选择审核意见');
            return false;
        }
        else {
            $.ajax({
                url: '/status/check',
                method: 'POST',
                data: {
                    applicationId: $(this).attr('applicationId'),
                    drt: $radios.eq(0).is(':checked') ? '-1' : '+1',
                    remark: $remark.val()
                },
                dataType: 'json'
            })
            .done(function (data, status, xhr){
                if (status == 'success') {
                    if (data.status == 'successful') {
                        alert('领导审核成功！');
                        location.href = '/history';
                    }
                }
            });
        }
    });

    $('.check-car-timetable').on('click', function (ev){
        $.ajax({
            url: '/car/timetable/' + $('#rentedCar').find('option:selected').attr('carId'),
            method: 'GET',
            params: {
            },
            dataType: 'json'
        })
        .done(function (data, status, xhr){
            if (status == 'success') {
                if (data.status == 'successful') {
                    var recs = data.recs,
                        $timetable = $('.cartimetable'),
                        $body = $timetable.find('.modal-body');
                    recs.forEach(function (rec, index, self){
                        $body.append('<div class="row"><div class="col-md-4">' + rec["realname"] + '</div><div class="col-md-4">' + rec["startTime"] + '</div><div class="col-md-4">' + rec["endTime"] + '</div></div>');
                    });
                    $timetable.modal();
                }
            }
        })
    });
});