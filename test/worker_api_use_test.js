/*jshint unused:false*/

/**
 * Test: Parser apiParam
 */

// node modules
var should = require('should');

// lib modules
var worker = require('../lib/workers/api_use');

describe('Worker: apiUse', function() {

    var packageInfos = {
        name: 'Test recursive apiUse',
        version: '0.0.1',
        description: 'i am a dummy description',
        title: 'Test recursive apiUse',
        url: 'http://localhost:18080',
        order: [ 'GetUser', 'PostUser' ],
        template: { withCompare: false, withGenerator: true },
        sampleUrl: false,
        defaultVersion: '0.0.0'
    };

    var filenames = [ 'fileA', 'fileB', 'fileC' ];

    // TODO: Add 1.000 more possible cases ;-)
    var parsedFilesSimpleTest = [
        //file
        [
            {
                global: { },
                local: {
                    use: [ 
                        { name: 'leaf_l' }
                    ],
                    name: 'root',
                    test: ['root']
                },
                expected: 'root',
                index: 2
            },
            {
                global: {
                    define: {
                        name: 'leaf_l',
                        title: '',
                        description: '',
                    }
                },
                local: {
                    test: ['l']
                },
                index: 1,
                expected: 'l'
            }
        ]
    ];

    // create
    it('case 1: simple test', function(done) {
        var preProcess = worker.preProcess(parsedFilesSimpleTest, filenames, packageInfos);
        worker.postProcess(parsedFilesSimpleTest, filenames, preProcess, packageInfos);
        
        var rootBlock = parsedFilesSimpleTest[0][0];
        rootBlock.local.name.should.eql('root');

        parsedFilesSimpleTest.forEach(function(parsedFile, parsedFileIndex) {
            parsedFile.forEach(function(block) {
                rootBlock.local.test.should.containEql(block.expected);
            });
        });
        done();
    });

});
