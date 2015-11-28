# gert-spanning-tree

Finds rooted spanning trees of undirected [Gert](https://github.com/devinivy/gert) graphs

[![Build Status](https://travis-ci.org/devinivy/gert-spanning-tree.svg?branch=master)](https://travis-ci.org/devinivy/gert-spanning-tree) [![Coverage Status](https://coveralls.io/repos/devinivy/gert-spanning-tree/badge.svg?branch=master&service=github)](https://coveralls.io/github/devinivy/gert-spanning-tree?branch=master)

## Usage
```js
var Graph = require('gert').Graph;
var Spanning = require('gert-spanning-tree');

var graph = new Graph({
    directed: false,
    vertices: ['a', 'b', 'c', 'd'],
    edges: [
        ['a', 'b'], ['b', 'c'],
        ['c', 'a'], ['c', 'd']
    ]
});

var spanningTree = Spanning(graph, 'a');
spanningTree.getEdges(null, true);  // [['a', 'b'], ['a', 'c'], ['c', 'd']]
```

## API
### `Spanning(graph, root, [depthFirst])`
Returns a spanning tree of undirected Gert graph `graph` rooted at vertex `root`.  If `depthFirst` is `true` then the vertices will be traversed depth-first rather than breadth-first.
