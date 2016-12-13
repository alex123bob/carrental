$(function () {
    // initialize datetimepicker for time selection.
    var dtCfg = {
        format: 'YYYY-MM-DD HH:mm:SS',
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
            $('.outsideCity').attr('disabled', 'true');
        }
        else if ($(this).val() == '1') {
            $('.outsideCity').removeAttr('disabled');
            $('.insideCity').attr('disabled', 'true');
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
            $workContent = $('input[type="checkbox"]'),
            $scope = $('input[type="radio"]'),
            $internalAddr = $('#internalAddr'),
            $externalAddr = $('#externalAddr'),
            $remark = $('#remark'),
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
        $workContent.each(function (index, chk){
            var $chkItem = $(chk);
            if ($chkItem.is(':checked')) {
                isTicked = true;
                return false;
            }
        });
        console.log(isEmpty, isTicked, isChecked);
        if (!isEmpty && isTicked && isChecked) {
            $.ajax({
                url: '/apply',
                method: 'PUT',
                data: {
                    depa: $depa.find('option:selected').attr('depaId'),
                    renter: $renter.attr('renter'),
                    contact: $contact.val(),
                    headcount: $headcount.find('option:selected').val(),
                    startTime: $startTime.find('input').val(),
                    endTime: $endTime.find('input').val(),
                    workContent: ''
                },
                dataType: 'json'
            })
            .done(function (data, status, xhr){

            });
        }
        else {
            // do nothing. form is not completed.
        }
    });
});