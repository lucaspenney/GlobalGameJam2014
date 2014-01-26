// javascript-astar
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a binary heap.
var GraphNodeType = {
	OPEN: 1,
	WALL: 0
};

function Graph(a) {
	for (var c = [], b = 0; b < a.length; b++) {
		c[b] = [];
		for (var d = 0, e = a[b]; d < e.length; d++) c[b][d] = new GraphNode(b, d, e[d])
	}
	this.input = a;
	this.nodes = c
}
Graph.prototype.toString = function() {
	for (var a = "\n", c = this.nodes, b, d, e, g, f = 0, h = c.length; f < h; f++) {
		b = "";
		d = c[f];
		e = 0;
		for (g = d.length; e < g; e++) b += d[e].type + " ";
		a = a + b + "\n"
	}
	return a
};

function GraphNode(a, c, b) {
	this.data = {};
	this.x = a;
	this.y = c;
	this.pos = {
		x: a,
		y: c
	};
	this.type = b
}
GraphNode.prototype.toString = function() {
	return "[" + this.x + " " + this.y + "]"
};
GraphNode.prototype.isWall = function() {
	return this.type == GraphNodeType.WALL
};

function BinaryHeap(a) {
	this.content = [];
	this.scoreFunction = a
}
BinaryHeap.prototype = {
	push: function(a) {
		this.content.push(a);
		this.sinkDown(this.content.length - 1)
	},
	pop: function() {
		var a = this.content[0],
			c = this.content.pop();
		0 < this.content.length && (this.content[0] = c, this.bubbleUp(0));
		return a
	},
	remove: function(a) {
		var c = this.content.indexOf(a),
			b = this.content.pop();
		c !== this.content.length - 1 && (this.content[c] = b, this.scoreFunction(b) < this.scoreFunction(a) ? this.sinkDown(c) : this.bubbleUp(c))
	},
	size: function() {
		return this.content.length
	},
	rescoreElement: function(a) {
		this.sinkDown(this.content.indexOf(a))
	},
	sinkDown: function(a) {
		for (var c = this.content[a]; 0 < a;) {
			var b = (a + 1 >> 1) - 1,
				d = this.content[b];
			if (this.scoreFunction(c) < this.scoreFunction(d)) this.content[b] = c, this.content[a] = d, a = b;
			else break
		}
	},
	bubbleUp: function(a) {
		for (var c = this.content.length, b = this.content[a], d = this.scoreFunction(b);;) {
			var e = a + 1 << 1,
				g = e - 1,
				f = null;
			if (g < c) {
				var h = this.scoreFunction(this.content[g]);
				h < d && (f = g)
			}
			if (e < c && this.scoreFunction(this.content[e]) < (null === f ? d : h)) f = e;
			if (null !== f) this.content[a] = this.content[f], this.content[f] = b, a = f;
			else break
		}
	}
};
var astar = {
	init: function(a) {
		for (var b = 0, g = a.length; b < g; b++)
			for (var d = 0, c = a[b].length; d < c; d++) {
				var f = a[b][d];
				f.f = 0;
				f.g = 0;
				f.h = 0;
				f.cost = f.type;
				f.visited = !1;
				f.closed = !1;
				f.parent = null
			}
	},
	heap: function() {
		return new BinaryHeap(function(a) {
			return a.f
		})
	},
	search: function(a, b, g, d, c) {
		astar.init(a);
		c = c || astar.manhattan;
		d = !! d;
		var f = astar.heap();
		for (f.push(b); 0 < f.size();) {
			b = f.pop();
			if (b === g) {
				a = b;
				for (g = []; a.parent;) g.push(a), a = a.parent;
				return g.reverse()
			}
			b.closed = !0;
			for (var j = astar.neighbors(a, b, d), h = 0, m = j.length; h <
				m; h++) {
				var e = j[h];
				if (!e.closed && !e.isWall()) {
					var k = b.g + e.cost,
						l = e.visited;
					if (!l || k < e.g) e.visited = !0, e.parent = b, e.h = e.h || c(e.pos, g.pos), e.g = k, e.f = e.g + e.h, l ? f.rescoreElement(e) : f.push(e)
				}
			}
		}
		return []
	},
	manhattan: function(a, b) {
		var g = Math.abs(b.x - a.x),
			d = Math.abs(b.y - a.y);
		return g + d
	},
	neighbors: function(a, b, g) {
		var d = [],
			c = b.x;
		b = b.y;
		a[c - 1] && a[c - 1][b] && d.push(a[c - 1][b]);
		a[c + 1] && a[c + 1][b] && d.push(a[c + 1][b]);
		a[c] && a[c][b - 1] && d.push(a[c][b - 1]);
		a[c] && a[c][b + 1] && d.push(a[c][b + 1]);
		g && (a[c - 1] && a[c - 1][b - 1] && d.push(a[c -
			1][b - 1]), a[c + 1] && a[c + 1][b - 1] && d.push(a[c + 1][b - 1]), a[c - 1] && a[c - 1][b + 1] && d.push(a[c - 1][b + 1]), a[c + 1] && a[c + 1][b + 1] && d.push(a[c + 1][b + 1]));
		return d
	}
};