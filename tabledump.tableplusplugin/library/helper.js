'use strict';

// Example create function
function handleDumpTableDefinition(context, item) {
	context.itemDefinition(item, function(creation) {
        // Get table columns listing
        SystemService.runInMain(function() {
            SystemService.insertToClipboard(creation);
            SystemService.notify('Copy creation', item.type() + ' ' + item.name() + ' creation is copied!');
        });
    });
}

export { handleDumpTableDefinition };