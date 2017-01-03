'use strict';

let common = {
    statusRenderer: function (status){
        let statusRealname;
        switch (status) {
            case 0:
                statusRealname = '待车管员审核';
                break;
            case 1:
                statusRealname = '待领导审核';
                break;
            case 2:
                statusRealname = '已审核';
                break;
            case -1:
                statusRealname = '不通过';
                break;
            case 3:
                statusRealname = '已还车';
                break;
            default:
                statusRealname = '';
                break;
        }
        return statusRealname;
    }
};

module.exports = common;