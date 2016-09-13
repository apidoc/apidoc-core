/*jshint unused:false*/

/**
 * Test: Parser apiParam
 */

// node modules
var should = require('should');

// lib modules
var parser = require('../lib/parsers/api_param');

describe('Parser: apiParam', function() {

    // TODO: Add 1.000 more possible cases ;-)
    var testCases = [
        {
            title: 'Simple fieldname only',
            content: 'simple',
            expected: {
                group: 'Parameter',
                type: undefined,
                size: undefined,
                allowedValues: undefined,
                optional: false,
                field: 'simple',
                defaultValue: undefined,
                description: ''
            }
        },
        {
            title: 'Type, Fieldname, Description',
            content: '{String} name The users name.',
            expected: {
                group: 'Parameter',
                type: 'String',
                size: undefined,
                allowedValues: undefined,
                optional: false,
                field: 'name',
                defaultValue: undefined,
                description: 'The users name.'
            }
        },
        {
            title: 'All options, with optional defaultValue',
            content: ' ( MyGroup ) { \\Object\\String.uni-code_char[] { 1..10 } = \'abc\', \'def\' }  ' +
                     '[ \\MyClass\\field.user_first-name = \'John Doe\' ] Some description.',
            expected: {
                group: 'MyGroup',
                type: '\\Object\\String.uni-code_char[]',
                size: '1..10',
                allowedValues: [ '\'abc\'', '\'def\'' ],
                optional: true,
                field: '\\MyClass\\field.user_first-name',
                defaultValue: 'John Doe',
                description: 'Some description.'
            }
        },
        {
            title: 'All options, without optional-marker',
            content: ' ( MyGroup ) { \\Object\\String.uni-code_char[] { 1..10 } = \'abc\', \'def\' }  ' +
                     '\\MyClass\\field.user_first-name = \'John Doe\' Some description.',
            expected: {
                group: 'MyGroup',
                type: '\\Object\\String.uni-code_char[]',
                size: '1..10',
                allowedValues: [ '\'abc\'', '\'def\'' ],
                optional: false,
                field: '\\MyClass\\field.user_first-name',
                defaultValue: 'John Doe',
                description: 'Some description.'
            }
        },
        {
            title: 'All options, without optional-marker, without default value quotes',
            content: ' ( MyGroup ) { \\Object\\String.uni-code_char[] { 1..10 } = \'abc\', \'def\' }  ' +
                     '\\MyClass\\field.user_first-name = John_Doe Some description.',
            expected: {
                group: 'MyGroup',
                type: '\\Object\\String.uni-code_char[]',
                size: '1..10',
                allowedValues: [ '\'abc\'', '\'def\'' ],
                optional: false,
                field: '\\MyClass\\field.user_first-name',
                defaultValue: 'John_Doe',
                description: 'Some description.'
            }
        }
    ];

    // create
    it('case 1: should pass all regexp test cases', function(done) {
        testCases.forEach(function(testCase) {
            var parsed = parser.parse(testCase.content);
            (parsed !== null).should.equal(true, 'Title: ' + testCase.title + ', Source: ' + testCase.content);
            parsed.should.eql(testCase.expected);
        });
        done();
    });

    it('case 2: should override allowed and default values from packageInfos', function(done) {
        var packageInfos = {
            "parameters": {
                "\\MyClass\\field.user_first-name": {
                    "allowedValues": [
                        "my_allowed_value"
                    ],
                    "defaultValue": [
                        "my_default_value"
                    ]
                }
            }
        };
        
        var parsed = parser.parse(testCases[2].content, undefined, undefined, packageInfos);
        parsed.should.eql({
            group: 'MyGroup',
            type: '\\Object\\String.uni-code_char[]',
            size: '1..10',
            allowedValues: [ 'my_allowed_value' ],
            optional: true,
            field: '\\MyClass\\field.user_first-name',
            defaultValue: [ 'my_default_value' ],
            description: 'Some description.'
        });
        done();
    });

});
