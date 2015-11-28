var Deque = require('double-ended-queue');

module.exports = function (graph, root, depthFirst) {

    // The graph must be undirected
    if (graph.directed) {
        throw new Error('Can\'t determine the spanning tree of a directed graph.');
    }

    var traversal = graph.traverse();
    var edges = [];
    var deque = new Deque([[null, root]]);
    var current = null;
    var pair = null;
    var v = null;

    while (deque.length) {

        pair = depthFirst ? deque.pop() : deque.shift();
        v = pair[1];

        if (!traversal.visits(v)) {

            if (pair[0] !== null) {
                edges.push(pair);
            }

            current = traversal.hop(v).currentVertex();

            var w;
            for (var i = 0; i < current.to.length; i++) {
                w = current.to[i];
                deque.push([v, w]);
            }
        }

    }

    return traversal.graph.subgraph({
        vertices: traversal.sequence,
        edges: edges
    });
};
