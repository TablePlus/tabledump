'use strict';

import { handleDumpMySQL, handleDumpPostgreSQL } from './library/helper';

var onRun = function(context) {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }

    let driver = context.driver();
    switch(driver) {
    case 'MySQL':
        handleDumpMySQL(context, item);
        break;
    case 'PostgreSQL':
        handleDumpPostgreSQL(context, item);
        break;
    default:
        context.alert('Warning', 'Being developed');
    } 
};

global.onRun = onRun;