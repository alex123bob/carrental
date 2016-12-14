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
    $('.btn').on('click', function (ev){
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
                $formGroup = $inputItem.closest('.form-group');
            if ($inputItem.attr('id') == 'internalAddr' || $inputItem.attr('id') == 'externalAddr') {
                var $city = $inputItem.closest('fieldset');
                if ($city.prev('.form-group').find('[name="scope"]').is(':checked')) {
                    if ($inputItem.val().trim() == 0) {
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
            if ($inputItem.val().trim() == 0) {
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
});