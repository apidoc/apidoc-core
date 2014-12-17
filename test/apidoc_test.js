/*jshint unused:false*/

/**
 * Test: apiDoc full parse
 */

// node modules
var should = require('should');
var fs     = require('fs');
var path   = require('path');
var apidoc = require('../lib/index');


function log() {
    // can add an emitter here and capture it in the tests with chai-spies
}

var logger = {
    debug  : log,
    verbose: log,
    info   : log,
    warn   : log,
    error  : log,
};

var marked = {
    gfm        : true,
    tables     : true,
    breaks     : false,
    pedantic   : false,
    sanitize   : false,
    smartLists : false,
    smartypants: false
};

var markdown = require('marked');
markdown.setOptions(marked);

describe('apiDoc full parse', function() {

    var fixtureFiles = [
        { key: 'data', filename: 'api_data.json' },
        { key: 'project', filename: 'api_project.json' }
    ];

    var api = {};

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    // create
    it('should create example in memory', function(done) {
        var options = {
            src: /*path.join(__dirname, './fixtures/example/')*/ './test/fixtures/example/'
        };
        var generator = {};
        var packageInfos = {
            'name': 'test',
            'version': '0.5.0',
            'description': 'RESTful web API Documentation Generator',
            'url' : 'https://api.github.com/v1',
            'sampleUrl': 'https://api.github.com/v1',
            'header': {
                'title': 'My own header title',
                'filename': 'header.md'
            },
            'footer': {
                'title': 'My own footer title',
                'filename': 'footer.md'
            },
            'order': [
                'Error',
                'Define',
                'PostTitleAndError',
                'NotExistingEntry',
                'PostError'
            ]
        };

        api = apidoc.parse(options, logger, generator, packageInfos, markdown);

        if (api === false)
            throw new Error('Parse failed.');

        done();
    });

    // compare
    it('memory should compare to fixtures', function(done) {
        var timeRegExp = /\"time\"\:\s\"(.*)\"/g;
        var versionRegExp = /\"version\"\:\s\"(.*)\"/g;
        fixtureFiles.forEach(function(file) {
            var key = file.key;
            var name = file.filename;

            var fixtureContent = fs.readFileSync('test/fixtures/' + name, 'utf8');
            var createdContent = api[key];

            // creation time remove (never equal)
            fixtureContent = fixtureContent.replace(timeRegExp, '');
            createdContent = createdContent.replace(timeRegExp, '');

            // creation time remove (or fixtures must be updated every time the version change)
            fixtureContent = fixtureContent.replace(versionRegExp, '');
            createdContent = createdContent.replace(versionRegExp, '');

            var fixtureLines = fixtureContent.split(/\r\n/);
            var createdLines = createdContent.split(/\r\n/);

            if (fixtureLines.length !== createdLines.length)
                throw new Error('File ./tmp/' + name + ' not equals to test/fixtures/' + name);

            for (var lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
                if (fixtureLines[lineNumber] !== createdLines[lineNumber])
                    throw new Error(key + ' not equals to test/fixtures/' + name + ' in line ' + (lineNumber + 1) +
                        '\nfixture: ' + fixtureLines[lineNumber] +
                        '\ncreated: ' + createdLines[lineNumber]
                    );
            }
        });
        done();
    });

});
