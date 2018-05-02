'use strict';

import { handleDumpTableDefinition } from './library/helper';

var onRun = function(context) {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    handleDumpTableDefinition(context, item);
};

global.onRun = onRun;