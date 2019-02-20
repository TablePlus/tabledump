'use strict';

import { handleDumpTableDefinition } from './library/helper';

var creation = function(context) {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    handleDumpTableDefinition(context, item);
};

var drop = function(context) {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    SystemService.runInMain(function() {
        SystemService.insertToClipboard('DROP ' + item.type() + ' ' + item.nameWithQuotes() + ';');
        SystemService.notify('Copy creation', item.type() + ' ' + item.name() + ' drop statement is copied!');
    });
};

var truncate = function(context) {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    SystemService.runInMain(function() {
        SystemService.insertToClipboard('TRUNCATE ' + item.type() +  ' ' + item.nameWithQuotes() + ';');
        SystemService.notify('Copy creation', item.type() + ' ' + item.name() + ' truncate statement is copied!');
    });
};

global.creation = creation;
global.drop = drop;
global.truncate = truncate;