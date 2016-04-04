var merge = require('lodash/fp/merge');

function exists(keys, key) {
	return keys.indexOf(key) !== -1
}

function makeType(param) {
	var str = param.type || '';
	if (str === 'array') {
		str = param.items.type+'[]';
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeSize(param) {
	if (param.type === 'array') { param = param.items; }
	
	var keys = Object.keys(param);
	var str = '';

	if (param.type === 'string' && (exists(keys,'minLength') || exists(keys,'maxLength'))) {
		
		if ( exists(keys,'minLength') && exists(keys,'maxLength') && param.minLength === param.maxLength ) {
			return '{'+param.minLength+'}';
		}
		
		str = '{';
		if (exists(keys,'minLength')) {
			str += param.minLength;
		}
		str += '..';
		if (exists(keys,'maxLength')) {
			str += param.maxLength;
		}
		str += '}';
	} else if ( (param.type === 'integer' || param.type === 'number') && (exists(keys,'minimum') || exists(keys,'maximum')) ) {
		
		if ( exists(keys,'minimum') && exists(keys,'maximum') && param.minimum === param.maximum ) {
			return '{'+param.minimum+'}';
		}
		
		str = '{';
		if (exists(keys,'minimum')) {
			str += param.minimum;
		} else {
			str += '-∞';
		}
		str += ' - ';
		if (exists(keys,'maximum')) {
			str += param.maximum;
		} else {
			str += '∞';
		}
		str += '}';
	}

	return str;
}

function makeAllowedValues(param) {
	if (param.type === 'array') { param = param.items; }
	
	return (Array.isArray(param.enum)) ? '='+param.enum.join(',') : '';
}

function isRequired(schema, key) {
	if (schema.type === 'array') { schema = schema.items; }
	// TODO figure out way to display when anyOf, oneOf
	return exists(Object.keys(schema),'required') && (schema.required.indexOf(key) !== -1);
}

function mergeAllOf(schema) {
	// NOTE this is not proper jsonschema, likely in v5 w/ merge
	// TODO update https://github.com/json-schema/json-schema/issues/116
	if (exists(Object.keys(schema),'allOf')) {
		for(var i = schema.allOf.length; i--;) {
			schema.allOf[i] = mergeAllOf(schema.allOf[i]);
			
			var required = schema.required || [];
			required = required.concat(schema.allOf[i].required || []);
			schema = merge(schema, schema.allOf[i]);
			if (required.length) schema.required = required;
		}
		delete schema.allOf;
	}
	return schema;
}

// mergeAnyOf - type = array|object

function traverse(schema, p) {
	var params = {};
	
	// Case: apiSuccess returns an array
	/*if (!p && schema.type === 'array'){
		params['data'] = '{array} data';
		p = 'data[]';
	}*/
	
	p = p || '';
	var group = p ? '('+p+') ' : '';
	
	var properties = {};
	//schema = mergeAllOf(schema);
	if (schema.type === 'object'){
		properties = schema.properties;
	} else if (schema.type === 'array' && schema.items.type === 'object') {
		//schema.items = mergeAllOf(schema.items);
		properties = schema.items.properties;
	}
	
	//console.log('properties',properties);
	
	for(var key in properties) {
		var param = properties[key];
		//console.log('param',param);
		if (!param) { continue; }
		
		var type = makeType(param);
		var size = makeSize(param);
		var allowedValues = makeAllowedValues(param);
		
		var description = param.description;
		if (param.type === 'array') {
			description += ' '+param.items.description;
		}
		
		// make field
		var field = key;

		if (exists(Object.keys(param),'default')) {
			field += '='+param.default;
		}

		if ( !isRequired(schema, key) ) {
			field = '['+field+']';
		}
		
		// make group
		params[key] = group+'{'+type+size+allowedValues+'} '+field+' '+description;
		
		var subs = {};
		var subgroup = p ? p+'.' : '';
		if (param.type === 'array' && param.items.type === 'object') {
			subs = traverse(param.items, subgroup+key+'[]');
		} else if (param.type === 'object') {
			subs = traverse(param, subgroup+key);
		}
		for(var subKey in subs) {
			params[key+'.'+subKey] = subs[subKey];
		}
	}

	return params;
}

var $RefParser = require('json-schema-ref-parser');
function build (type, schema) {
	var str, done = false;
	$RefParser.dereference(schema, function(err, schema) {
		if (err) {
			console.error(err);
			return done = true;
		}
		//console.log('start',schema); 
		var lines = traverse(schema);
		str = ''
		for(var l in lines) {
			str += '@'+type+' '+lines[l]+"\n";
		}
		done = true;
	});
	require('deasync').loopWhile(function(){return !done;});
	return str;
}

module.exports = build;