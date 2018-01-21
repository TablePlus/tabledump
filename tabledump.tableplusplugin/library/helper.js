'use strict';

// Example create function
function getCreationQuery(item) {
	return 'SHOW CREATE ' + item.type().toUpperCase() + ' ' + item.name() + ';'
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function handleDumpMySQL(context, item) {
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
}

function handleDumpPostgreSQL(context, item) {
    context.alert('Warning', 'Being developed');
}

export { handleDumpMySQL, handleDumpPostgreSQL };