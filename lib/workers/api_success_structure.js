var _ = require('lodash');
// Same as @apiUse
var apiWorker = require('./api_use.js');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiSuccessStructure',
        usage  : '@apiSuccessStructure group',
        example: '@apiDefine MyValidSuccessStructureGroup Some title\n@apiSuccessStructure MyValidSuccessStructureGroup'
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
    return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'defineSuccessStructure');
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
    apiWorker.postProcess(parsedFiles, filenames, preProcess, packageInfos, {copyDefinitions: options.copyDefinitions, source: 'defineSuccessStructure', target: 'successStructure', messages: _messages});
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
