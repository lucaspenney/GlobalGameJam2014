function Wave() {
	this.spawns = [];
	this.spawns.push({
		x: 32,
		y: 0
	}, {
		x: 400,
		y: 0
	});

	Game.entities.push(this);
}


Wave.prototype.update = function() {
	if (Math.random() > 0.9) {
		var spawn = Math.floor(Math.random() * 1.7);
		new Enemy(this.spawns[spawn].x, this.spawns[spawn].y);
	}

};

Wave.prototype.render = function() {

};