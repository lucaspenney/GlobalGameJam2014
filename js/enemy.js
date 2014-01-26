function Enemy(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.sprite = new Sprite("img/enemy.png");
	this.speed = 1;
	this.sprite.scale = 2;

	this.target = new Point(this.x, this.y);

	Game.entities.push(this);
}

Enemy.prototype.render = function() {
	this.sprite.renderOnScreen(this.x, this.y);
};

Enemy.prototype.update = function() {
	var thisXTile = (this.x - (this.x % 32)) / 32;
	var thisYTile = (this.y - (this.y % 32)) / 32;
	var playerXTile = 13;
	var playerYTile = 10;

	//Using astar.js
	var graph = new Graph(Game.level.collisionTiles);
	var start = graph.nodes[thisXTile][thisYTile];
	var end = graph.nodes[playerXTile][playerYTile];
	var result = astar.search(graph.nodes, start, end, false); //Set last param to true to include diagonal path, false without

	if (result[0] !== undefined) {
		var rand = Math.floor(Math.random() * 8) + 8;
		this.target = new Point((result[0].x * 32) + rand, (result[0].y * 32) + rand);
	} else {

	}
	//Perform move
	var dirx = (this.target.x - this.x);
	var diry = (this.target.y - this.y);

	var hyp = Math.sqrt(dirx * dirx + diry * diry);
	dirx /= hyp;
	diry /= hyp;
	this.xv = dirx * this.speed;
	this.yv = diry * this.speed;

	this.x += this.xv;
	this.y += this.yv;
};