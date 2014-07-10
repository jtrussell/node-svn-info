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
    var keyVal = l.split(':'), key, val;
    if(keyVal.length > 1) {
      key = keyVal.shift().trim();
      val = keyVal.join(':').trim();
      if(normalizationMap.hasOwnProperty(key)) {
        normInfoObj[normalizationMap[key]] = val;
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

  if(/\s/.test(path)) {
    path = path
      .replace(/^['"]+/g, '')
      .replace(/["']+$/g, '');
    path = '"' + path + '"';
  }

  sh.exec('svn info ' + path, {silent: true}, function(code, output) {
    if(0 !== code) {
      cb(new Error('Encountered an error trying to get svn info for ' + path + '\n' + output));
    }
    cb(null, normalizeInfo(output));
  });
};

module.exports.sync = function(path) {
  path = path || '.';
  var cmd = sh.exec('svn info ' + path, {silent: true});
  if(0 !== cmd.code) {
    throw new Error('Encountered an error trying to get svn info for ' + path + '\n' + cmd.output);
  }
  return normalizeInfo(cmd.output);
};
