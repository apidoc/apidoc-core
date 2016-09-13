/**
 * Post Filter parsed results
 * Remove double fields, happen when overwrite a global inherited field with a local definition.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function postFilter(parsedFiles, filenames) {
    parsedFiles.forEach(function(parsedFile) {
        parsedFile.forEach(function(block) {
            if (block.local.success && block.local.success.headers) {
                var blockHeaders = block.local.success.headers;
                Object.keys(blockHeaders).forEach(function(blockHeaderKey) {
                    var headers = block.local.success.headers[blockHeaderKey];
                    var newHeaders = [];
                    var existingKeys = {};
                    headers.forEach(function(header) {
                        var key = header.field; // .field (=id) is the key to check if it exists twice
                        if ( ! existingKeys[key]) {
                            existingKeys[key] = 1;
                            newHeaders.push(header);
                        }
                    });
                    block.local.success.headers[blockHeaderKey] = newHeaders;
                });
            }
        });
    });
}

/**
 * Exports
 */
module.exports = {
    postFilter: postFilter
};
