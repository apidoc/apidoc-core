/*jshint unused:false, expr:true */

/**
 * Test: apiDoc full parse
 */

// node modules
var fs       = require('fs');
var path     = require('path');
var semver   = require('semver');
var should   = require('should');
var Markdown = require('markdown-it');

var versions = require('apidoc-example').versions;

// lib modules
var apidoc = require('../lib/index');

describe('apiDoc full parse', function() {

    // get latest example for the used apidoc-spec
    var latestExampleVersion = semver.maxSatisfying(versions, '~' + apidoc.getSpecificationVersion()); // ~0.2.0 = >=0.2.0 <0.3.0

    var exampleBasePath = 'node_modules/apidoc-example/' + latestExampleVersion;
    var fixturePath = exampleBasePath + '/fixtures';

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

    var markdown = new Markdown({
        breaks     : false,
        html       : true,
        linkify    : false,
        typographer: false
    });

    var fixtureFiles = [
        { key: 'data'   , filename: 'api_data.json' },
        { key: 'project', filename: 'api_project.json' }
    ];

    var api = {};

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    // version found
    it('should find latest example version', function(done) {
        should(latestExampleVersion).be.ok;
        done();
    });

    // create
    it('should create example in memory', function(done) {
        apidoc.setLogger(logger);
        apidoc.setGeneratorInfos({});
        apidoc.setMarkdownParser(markdown);
        apidoc.setPackageInfos({
            'name': 'test',
            'version': '0.5.0',
            'description': 'RESTful web API Documentation Generator',
            'url' : 'https://api.github.com/v1',
            'sampleUrl': 'https://api.github.com/v1',
            'header': {
                'title': 'My own header title',
                'content': '<h1>Header .md File</h1>\n<p>Content of header.md file.</p>\n'
            },
            'footer': {
                'title': 'My own footer title',
                'content': '<h1>Footer .md File</h1>\n<p>Content of footer.md file.</p>\n'
            },
            'order': [
                'Error',
                'Define',
                'PostTitleAndError',
                'NotExistingEntry',
                'PostError',
                'GetParam'
            ]
        });

        api = apidoc.parse({
            src: exampleBasePath + '/src/'
        });

        if (api === false)
            throw new Error('Parse failed.');

        done();
    });

    // compare
    it('memory should compare to fixtures', function(done) {
        var timeRegExp = /\"time\"\:\s\"(.*)\"/g;
        var versionRegExp = /\"version\"\:\s\"(.*)\"/g;
        var filenameRegExp = new RegExp('(?!"filename":\\s")(' + exampleBasePath + '/)', 'g');

        fixtureFiles.forEach(function(file) {
            var key = file.key;
            var name = fixturePath + '/' + file.filename;

            var fixtureContent = fs.readFileSync(name, 'utf8');
            var createdContent = api[key];

            // creation time remove (never equal)
            fixtureContent = fixtureContent.replace(timeRegExp, '');
            createdContent = createdContent.replace(timeRegExp, '');

            // creation time remove (or fixtures must be updated every time the version change)
            fixtureContent = fixtureContent.replace(versionRegExp, '');
            createdContent = createdContent.replace(versionRegExp, '');

            // remove the base path
            createdContent = createdContent.replace(filenameRegExp, '');

            // split and compare each line
            // TODO: compare objects not line by line
            var fixtureLines = fixtureContent.split(/\n/);
            var createdLines = createdContent.split(/\n/);

//            if (fixtureLines.length !== createdLines.length)
//                throw new Error(key + ' not equals to ' + name);

            for (var lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
                if (fixtureLines[lineNumber] !== createdLines[lineNumber])
                    throw new Error(key + ' not equals to ' + name + ' in line ' + (lineNumber + 1) +
                        '\nfixture: ' + fixtureLines[lineNumber] +
                        '\ncreated: ' + createdLines[lineNumber]
                    );
            }
        });
        done();
    });

});
