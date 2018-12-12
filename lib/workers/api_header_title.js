// Same as @apiParamTitle
var apiWorker = require('./api_param_title.js');
var _ = require('lodash');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiHeader',
        usage  : '@apiHeader (group) varname',
        example: '@apiDefine MyValidHeaderGroup Some title\n@apiHeader (MyValidHeaderGroup) Content-Type'
    }
};

/**
 * PreProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object}   packageInfos
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, packageInfos) {
    return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'defineHeaderTitle');
}

/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 * @param {Object}   options    Contains {bool} copyDefinitions
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos, options) {
    apiWorker.postProcess(parsedFiles, filenames, preProcess, packageInfos, {copyDefinitions: options.copyDefinitions, source: 'defineHeaderTitle', target: 'header', messages: _messages});
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
