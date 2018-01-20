'use strict';

import { getCreationQuery, capitalizeFirstLetter } from './library/helper';

var onRun = function(context) {
    // Check support
    if (context.driver() != 'MySQL') {
        context.alert('WIP', 'Only support MySQL for now, check back later');
        return;
    }

    // Get table in opening tab
    var item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    var creationQuery = getCreationQuery(item);
    var type = capitalizeFirstLetter(item.type());
    context.execute(creationQuery, (result) => {
        if (result.rows.length == 0) {return}
        var row = result.rows[0]
        var creation = row.raw('Create ' + type);
        SystemService.runInMain(function() {
            SystemService.insertToClipboard(creation);           
            SystemService.notify('Copy creation', type + ' ' + item.name() + ' creation is copied!'); 
        });
    });
};

global.onRun = onRun;