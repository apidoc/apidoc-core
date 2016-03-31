var trim = require('../utils/trim');

function parse(content) {
	var content = trim(content);

	if (content.length === 0)
		return null;
	
	// @apiSchema {jsonschema=relative_path} additional_argument
	var parseRegExp = /^\{(.+?)=(.+?)\}\s*(?:\s+(.+?))?$/g;
	var matches = parseRegExp.exec(content);

	if ( ! matches)
		return null;

	return {
		schema : matches[1],
		path : matches[2],
		type : matches[3] || 'apiParam'
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
