var deref = require('deref');
var extend = require('lodash/fp/extend');
var $ = deref();

function exists(keys, key) {
	return keys.indexOf(key) !== -1
}

function makeType(param) {
	var str = param.type || '';
	if (param.type === 'array') {
		str = param.items.type+'[]';
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeSize(param) {
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
	return (Array.isArray(param.enum)) ? '='+param.enum.join(',') : '';
}

function isRequired(schema, key) {
	// TODO figure out way to display when anyOf, oneOf, allOf
	var hasRequired = exists(Object.keys(schema),'required');
	if ( (hasRequired && schema.required.indexOf(key) === -1 )
		|| !hasRequired) {
		return false;
	}
	return true;
}

function traverse(schema, p) {
	p = p || '';
	var group = p ? '('+p+') ' : '';
	
	var params = {};
	
	if (typeof schema.$ref === 'string') {
		schema = extend(schema, $.util.findByRef(schema.$ref, $.refs));
		delete schema.$ref;
	}
	
	var properties = {};
	if (schema.type === 'object'){
		properties = schema.properties;
	} else if (schema.type === 'array' && schema.items.type === 'object') {
		properties = schema.items.properties;
	}
	
	for(var key in properties) {
		var param = properties[key];
		
		// TODO remove after $ref connected in
		if (typeof param.$ref === 'string') {
			param = extend(param, $.util.findByRef(param.$ref, $.refs));
			delete param.$ref;
		}
		
		if (param.type === 'array' && typeof param.items.$ref === 'string') {
			param.items = extend(param.items, $.util.findByRef(param.items.$ref, $.refs));
			delete param.items.$ref;
		}
		
		var type = makeType(param);
		var size = makeSize(param);
		var allowedValues = makeAllowedValues(param);
		
		// make field
		var field = key;

		if (exists(Object.keys(param),'default')) {
			field += '='+param.default;
		}

		if ( !isRequired(schema, key) ) {
			field = '['+field+']';
		}
		
		// make group
		params[key] = group+'{'+type+size+allowedValues+'} '+field+' '+param.description;
		
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

function build (type, schema) {
	schema = $(schema);
	
	var lines = traverse(schema);
	var str = ''
	for(var l in lines) {
		str += '@'+type+' '+lines[l]+"\n";
	}
	return str;
}

module.exports = build;