// Load modules

var Lab = require('lab');
var Code = require('code');

var Graph = require('gert').Graph;
var Spanning = require('..');

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Spanning tree algorithm', function () {

    it('throws on receiving a directed graph', function (done) {

        var graph = new Graph({
            directed: true,
            vertices: ['a']
        });

        expect(function () {

            Spanning(graph, 'a');
        }).to.throw('Can\'t determine the spanning tree of a directed graph.');

        done();
    });

    it('returns a rooted spanning tree of a connected, undirected graph.', function (done) {

        var graph = new Graph({
            directed: false,
            vertices: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
            edges: [
                ['a', 'b'], ['a', 'c'],
                ['b', 'c'], ['b', 'd'],
                ['c', 'e'], ['c', 'f'],
                ['d', 'e'], ['e', 'f'],
                ['e', 'g']
            ]
        });

        var spanningTree;
        var roots = graph.getVertices(null, true);
        for (var i = 0; i < roots.length; i++) {

            spanningTreeBF = Spanning(graph, roots[i]);
            spanningTreeDF = Spanning(graph, roots[i], true);

            // Spanning tree lives inside the original graph
            expect(graph.intersection(spanningTreeBF).equals(spanningTreeBF)).to.equal(true);
            expect(graph.intersection(spanningTreeDF).equals(spanningTreeDF)).to.equal(true);

            // Spanning tree contains all vertices of the original graph
            expect(spanningTreeBF.order()).to.equal(graph.order());
            expect(spanningTreeDF.order()).to.equal(graph.order());

            // Is a tree with a single component (has minimal circuit rank, E - V + 1 = 0)
            expect(spanningTreeBF.size() - spanningTreeBF.order() + 1).to.equal(0);
            expect(spanningTreeDF.size() - spanningTreeDF.order() + 1).to.equal(0);
        }

        done();
    });

});
