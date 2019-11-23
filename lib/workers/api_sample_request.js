/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos) {
    var targetName = 'sampleRequest';

    parsedFiles.forEach(function(parsedFile) {
        parsedFile.forEach(function(block) {
            if (block.local[targetName]) {
                var newBlock = [];
                block.local[targetName].forEach(function(entry) {
                    if (entry.url !== 'off') {
                        // Check if is an internal url
                        if (packageInfos.sampleUrl && entry.url.length >= 4 && entry.url.substr(0, 4).toLowerCase() !== 'http') {
                            // Prepend sampleUrl
                            entry.url = packageInfos.sampleUrl + entry.url;
                        }
                        newBlock.push(entry);
                    }
                }); // forEach

                if (newBlock.length === 0)
                    delete block.local[targetName];
                else
                    block.local[targetName] = newBlock;
            } else {
                var url;
                if (packageInfos.sampleUrl && block.local && block.local.url) {
                    // if the block local url is absolute, just use this don't append to the sampleUrl
                    if (block.local.url.length >= 4 && block.local.url.substr(0, 4).toLowerCase() !== 'http') {
                        url = packageInfos.sampleUrl + block.local.url;
                    } else {
                        url = block.local.url;
                    }

                    block.local[targetName] = [{
                        'url': url
                    }];
                }
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
