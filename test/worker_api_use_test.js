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
    // the tree is build like
    // root
    // l
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
                expected: 'l'
            }
        ]
    ];

    // the tree is build like
    // root
    // l,    r
    // ll,   rr
    //       rrl, rrr
    var parsedFilesRecursiveTest = [
        //file
        [
            {
                global: { },
                local: {
                    use: [ 
                        { name: 'leaf_l' },
                        { name: 'leaf_r' },
                    ],
                    name: 'root',
                    test: ['root']
                },
                expected: 'root',
            }
        ], 
        [
            {
                global: {
                    define: {
                        name: 'leaf_l',
                        title: '',
                        description: '',
                    }
                },
                local: {
                    test: ['l'],
                    use: [ 
                        { name: 'leaf_ll' }
                    ],
                },
                expected: 'l'
            },
            {
                global: {
                    define: {
                        name: 'leaf_rr',
                        title: '',
                        description: '',
                    }
                },
                local: {
                    test: ['rr'],
                    use: [ 
                        { name: 'leaf_rrr' },
                        { name: 'leaf_rrl' }
                    ],
                },
                expected: 'rr'
            }
        ],
        [
            {
                global: {
                    define: {
                        name: 'leaf_ll',
                        title: '',
                        description: '',
                    }
                },
                local: {
                    test: ['ll']
                },
                expected: 'll'
            },
            {
                global: {
                    define: {
                        name: 'leaf_r',
                        title: '',
                        description: '',
                    }
                },
                local: {
                    test: ['r'],
                    use: [ 
                        { name: 'leaf_rr' }
                    ],
                },
                expected: 'r'
            },
            {
                global: {
                    define: {
                        name: 'leaf_rrr',
                        title: '',
                        description: '',
                    }
                },
                local: {
                    test: ['rrr']
                },
                expected: 'rrr'
            },
            {
                global: {
                    define: {
                        name: 'leaf_rrl',
                        title: '',
                        description: '',
                    }
                },
                local: {
                    test: ['rrl']
                },
                expected: 'rrl'
            }
        ]
    ];

    // create
    it('case 1: simple test', function(done) {
        var preProcess = worker.preProcess(parsedFilesSimpleTest, filenames, packageInfos);
        worker.postProcess(parsedFilesSimpleTest, filenames, preProcess, packageInfos);
        
        var rootBlock = parsedFilesSimpleTest[0][0];
        rootBlock.local.name.should.eql('root');

        //check if the root block contains the expected value from every other block
        parsedFilesSimpleTest.forEach(function(parsedFile, parsedFileIndex) {
            parsedFile.forEach(function(block) {
                rootBlock.local.test.should.containEql(block.expected);
            });
        });
        done();
    });

    it('case 2: recursive test', function(done) {
        var preProcess = worker.preProcess(parsedFilesRecursiveTest, filenames, packageInfos);
        worker.postProcess(parsedFilesRecursiveTest, filenames, preProcess, packageInfos);
        
        var rootBlock = parsedFilesRecursiveTest[0][0];
        rootBlock.local.name.should.eql('root');

        //check if the root block contains the expected value from every other block
        parsedFilesRecursiveTest.forEach(function(parsedFile, parsedFileIndex) {
            parsedFile.forEach(function(block) {
                rootBlock.local.test.should.containEql(block.expected);
            });
        });
        done();
    });

});
