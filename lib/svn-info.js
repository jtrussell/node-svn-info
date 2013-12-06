'use strict';

var sh = require('shelljs');

var normalizeInfo = function(raw) {
  var lines = raw.trim().split(/\r?\n/)
    , normInfoObj = {};

  var normalizationMap = {
    'Path': 'path',
    'Working Copy Root Path': 'workingCopyRootPath',
    'URL': 'url',
    'Relative URL': 'relativeUrl',
    'Repository Root': 'repositoryRoot',
    'Repository UUID': 'repositoryUuid',
    'Revision': 'revision',
    'Node Kind': 'nodeKind',
    'Schedule': 'schedule',
    'Last Changed Author': 'lastChangedAuthor',
    'Last Changed Rev': 'lastChangedRev',
    'Last Changed Date': 'lastChangedDate'
  };

  lines.forEach(function(l) {
    var keyVal = l.split(':'), key;
    if(keyVal.length === 2) {
      key = keyVal[0].trim();
      if(normalizationMap.hasOwnProperty(key)) {
        normInfoObj[normalizationMap[key]] = keyVal[1].trim();
      }
    }
  });

  return normInfoObj;
};

module.exports = function(path, cb) {
  if(typeof path !== 'string') {
    cb = path;
    path = '.';
  }

  sh.exec('svn info ' + path, {silent: true}, function(code, output) {
    if(0 !== code) {
      cb('Encountered an error trying to get svn info for ' + path);
    }
    cb(null, normalizeInfo(output));
  });
};

module.exports.sync = function(path) {
  var cmd = sh.exec('svn info ' + path, {silent: true});
  if(0 !== cmd.code) {
    throw('Encountered an error trying to get svn info for ' + path);
  }
  return normalizeInfo(cmd.output);
};
