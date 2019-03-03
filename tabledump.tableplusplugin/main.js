'use strict';

import { dumpTableAsDefinition, dumpTableAsLaravel } from './library/helper';

var creation = function(context) {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    dumpTableAsDefinition(context, item);
};

var drop = function(context) {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    SystemService.insertToClipboard('DROP ' + item.type() + ' ' + item.nameWithQuotes() + ';');
    SystemService.notify('Copy creation', item.type() + ' ' + item.name() + ' drop statement is copied!');
};

var truncate = function(context) {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    SystemService.insertToClipboard('TRUNCATE ' + item.type() +  ' ' + item.nameWithQuotes() + ';');
    SystemService.notify('Copy creation', item.type() + ' ' + item.name() + ' truncate statement is copied!');
};

var laravel = function(context)  {
    // Get table in opening tab
    let item = context.clickedItem();
    if (item == null) {
        context.alert('Error', 'Please select a Table');
        return;
    }
    dumpTableAsLaravel(context, item);
}

global.creation = creation;
global.drop = drop;
global.truncate = truncate;
global.laravel = laravel;
