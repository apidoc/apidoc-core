// node modules
var markdown = require('marked');
var semver   = require('semver');

var versions = require('apidoc-example').versions;

// lib modules
var apidoc = require('../lib/index');

// get latest example for the used apidoc-spec
var latestExampleVersion = semver.maxSatisfying(versions, '~' + apidoc.getSpecificationVersion()); // ~0.2.0 = >=0.2.0 <0.3.0

var exampleBasePath = 'node_modules/apidoc-example/' + latestExampleVersion;

function log() {
}

var logger = {
    debug  : log,
    verbose: log,
    info   : log,
    warn   : log,
    error  : log,
};

markdown.setOptions({
    gfm        : true,
    tables     : true,
    breaks     : false,
    pedantic   : false,
    sanitize   : false,
    smartLists : false,
    smartypants: false
});

var api = {};

apidoc.setLogger(logger);
apidoc.setGeneratorInfos({});
//apidoc.setMarkdownParser(markdown);
apidoc.setMarkdownParser(false);
apidoc.setPackageInfos();

api = apidoc.parse({
    src: exampleBasePath + '/src/'
});

console.log(api.project);
console.log(api.data);
