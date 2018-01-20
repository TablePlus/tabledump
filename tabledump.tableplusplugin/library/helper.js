'use strict';

// Example create function
var getCreationQuery = function(item) {
	return 'SHOW CREATE ' + item.type().toUpperCase() + ' ' + item.name() + ';'
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export { getCreationQuery, capitalizeFirstLetter};