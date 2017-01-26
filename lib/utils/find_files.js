var fs       = require('fs-extra');
var klawSync = require('klaw-sync');
var os       = require('os');
var path     = require('path');

var FileError = require('../errors/file_error');

/**
 * Search files recursivly and filter with include / exlude filters
 */
function FindFiles() {
  this.path = process.cwd();
  this.excludeFilters = [];
  this.includeFilters = [];
}

/**
 * Exports
 */
module.exports = new FindFiles();

/**
 * Set path to source-files
 *
 * @param {String} path
 */
FindFiles.prototype.setPath = function(newPath) {
  if (path) {
    this.path = path.resolve(newPath);
  }
};

/**
 * Set exclude filters
 *
 * @param {string[]} excludeFilters
 */
FindFiles.prototype.setExcludeFilters = function(excludeFilters) {
  if (excludeFilters) {
    this.excludeFilters = excludeFilters;
  }
};

/**
 * Set include filters
 *
 * @param {string[]} isSilent
 */
FindFiles.prototype.setIncludeFilters = function(includeFilters) {
  if (includeFilters) {
    this.includeFilters = includeFilters;
  }
};

/**
 * Search files recursivly and filter by include / exlude filters
 *
 * @returns {String[]}
 */
FindFiles.prototype.search = function() {
  var self = this;
  var files = [];

  try {
    files = klawSync(self.path).map( function(entry) {
      return entry.path;
    });

    // create RegExp Include Filter List
    var regExpIncludeFilters = [];
    var filters = self.includeFilters;
    if (typeof(filters) === 'string') {
      filters = [ filters ];
    }

    filters.forEach(function(filter) {
      if (filter.length > 0) {
        regExpIncludeFilters.push( new RegExp(filter) );
      }
    });

    // RegExp Include Filter
    var length = regExpIncludeFilters.length;
    files = files.filter(function(filename) {
      // not include Directories like 'dirname.js/'
      if (fs.statSync(filename).isDirectory()) {
        return 0;
      }

      if (os.platform() === 'win32') {
        filename = filename.replace(/\\/g, '/');
      }

      // apply every filter
      for (var i = 0; i < length; i += 1) {
        if(regExpIncludeFilters[i].test(filename)) {
          return 1;
        }
      }

      return 0;
    });

    // create RegExp Exclude Filter List
    var regExpExcludeFilters = [];
    filters = self.excludeFilters;
    if (typeof(filters) === 'string') {
      filters = [ filters ];
    }

    filters.forEach(function(filter) {
      if (filter.length > 0) {
        regExpExcludeFilters.push( new RegExp(filter) );
      }
    });

    // RegExp Exclude Filter
    length = regExpExcludeFilters.length;
    files = files.filter(function(filename) {
      if (os.platform() === 'win32') {
       filename = filename.replace(/\\/g, '/');
      }

      // apply every filter
      for(var i = 0; i < length; i += 1) {
        if(regExpExcludeFilters[i].test(filename)) {
          return 0;
        }
      }

      return 1;
    });
  } catch (e) {
    throw e;
  } finally {
    if ( ! files || files.length === 0) {
      throw new FileError('No files found.', self.path);
    }

    // remove source path prefix
    files = files.map( function(filename) {
      if (filename.startsWith(self.path)) {
        return filename.substr(self.path.length + 1);
      }
      return filename;
    });
  }
  return files;
};
