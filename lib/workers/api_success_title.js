var _ = require('lodash');
// Same as @apiParamTitle
var apiWorker = require('./api_param_title.js');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiSuccess',
        usage  : '@apiSuccess (group) varname',
        example: '@apiDefine MyValidSuccessGroup Some title or 200 OK\n@apiSuccess (MyValidSuccessGroup) username'
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
    return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'defineSuccessTitle');
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
    apiWorker.postProcess(parsedFiles, filenames, preProcess, packageInfos, {copyDefinitions: options.copyDefinitions, source: 'defineSuccessTitle', target: 'success', messages: _messages});
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
