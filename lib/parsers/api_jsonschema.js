var trim = require('../utils/trim');

function parse(content) {
	var content = trim(content);

	if (content.length === 0)
		return null;

	var parseRegExp = /^\{(.+?)\}\s*(.+?)(?:\s+(.+?))?$/g;
	var matches = parseRegExp.exec(content);

	if ( ! matches)
		return null;

	return {
		type : matches[1],
		path : matches[2],
		name : matches[3] || ''
	};
}

/**
 * Exports
 */
module.exports = {
	parse        : parse,
	path         : 'local.jsonschema',
	method       : 'push',
	preventGlobal: true
};
