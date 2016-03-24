function exists(keys, key) {
	return keys.indexOf(key) !== -1
}

function makeType(param) {
	var str = param.type;
	if (param.type === 'array') {
		str = param.items.type+'[]';
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeSize(param) {
	var keys = Object.keys(param);
	var str = '';

	if (param.type === 'string' && (exists(keys,'minLength') || exists(keys,'maxLength'))) {
		str = '{';
		if (exists(keys,'minLength')) {
			str += param.minLength
		}
		str += '..';
		if (exists(keys,'maxLength')) {
			str += param.maxLength
		}
		str += '}';
	} else if ( (param.type === 'integer' || param.type === 'number') && (exists(keys,'minimum') || exists(keys,'maximum')) ) {
		str = '{';
		if (exists(keys,'minimum')) {
			str += param.minimum
		} else {
			str += '-∞';
		}
		str += ' - ';
		if (exists(keys,'maximum')) {
			str += param.maximum
		} else {
			str += '∞';
		}
		str += '}';
	}

	return str;
}

function traverse(schema) {
	var params = {};

	// TODO add in ref lookup

	for(var key in schema) {
		var param = schema[key];
		var type = makeType(param);
		var size = makeSize(param);
		var allowedValues = '';
		var field = key;

		// add in allowed values
		if (param.enum) {
			allowedValues = '='+param.enum.join(',');
		}

		if (exists(Object.keys(param),'default')) {
			field += '='+param.default;
		}

		if (exists(Object.keys(schema),'required') && schema.required.indexOf(key)) {
			// TODO check, oneOf, anyOf
			field = '['+field+']';
		}

		params[key] = '{'+type+size+allowedValues+'} '+field+' '+param.description;

		if (param.type === 'array' && param.items.type === 'object') {
			var arrParams = traverse(param.items.properties);
			for(var subArrKey in arrParams) {
				params[key+'.'+subArrKey] = '('+key+') '+arrParams[subArrKey];
			}
			//console.log(arrParams);
		} else if (param.type === 'object') {
			var objParams = traverse(param.properties);
			//console.log(objParams);
			for(var subObjKey in objParams) {
				params[key+'.'+subObjKey] = '('+key+') '+objParams[subObjKey];
			}
		}
	}

	return params;
}

function build (name, type, schema) {
	var lines = traverse(schema.properties);
	var str = ''
	for(var l in lines) {
		str += '@'+type+' '+lines[l]+"\n";
	}
	return str;
}

module.exports = build;