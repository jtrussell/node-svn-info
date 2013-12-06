# svn-info

Parse svn info.

## Getting Started
*(todo)* Install the module with: `npm install svn-info`

## Documentation
This module exports itself as a method you may use to asynchronously get `svn
info` for a given path:

```javascript
require('svn-info')('path/to/folder/under/svn', function(err, info) {
  if(err) {
    throw err;
  }
  do_something_with(info);
});
```

The first path argument is optional and will default to the current working
directory.

There's also an synchronous flavor:

```javascript
var info = require('svn-info').sync('my/repo/path');
do_something_with(info);
```

As with the async version you can optionally leave off the path argument.

**NOTE**: You must have the `svn` command line tool in your path.

**NOTE** The info object is in camelCased. So this:

```
'path': '...',
'workingCopyRootPath': '...',
'url': '...',
'relativeUrl': '...',
'repositoryRoot': '...',
'repositoryUuid': '...',
'revision': '...',
'nodeKind': '...',
'schedule': '...',
'lastChangedAuthor': '...',
'lastChangedRev': '...',
'lastChangedDate': '...'
```

Instead of this:

```
'Path': '...',
'Working Copy Root Path': '...',
'URL': '...',
'Relative URL': '...',
'Repository Root': '...',
'Repository UUID': '...',
'Revision': '...',
'Node Kind': '...',
'Schedule': '...',
'Last Changed Author': '...',
'Last Changed Rev': '...',
'Last Changed Date': '...'
```

## Release History
*(Nothing yet)*

## License
Copyright (c) 2013 jtrussell  
Licensed under the MIT license.
