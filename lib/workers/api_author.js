/**
 * PostProcess
 *
 * Priority: process after use and api
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles/*, filenames, preProcess, packageInfos*/) {
    var target = 'author';

    parsedFiles.forEach(function(parsedFile) {
        parsedFile.forEach(function(block) {
            // Ignore global name, or non existing global names (that will be generated with this func)
            // could overwrite local names on a later starting worker process from e.g. @apiUse
            if (Object.keys(block.global).length === 0) {
                var author = block.local[target];
                if ( ! author) {
                    author = [];
                }

                block.local[target] = author;
            }
        });
    });
}

/**
 * Exports
 */
module.exports = {
    postProcess: postProcess
};
