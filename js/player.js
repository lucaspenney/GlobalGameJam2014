function Player() {
	Game.entities.push(this);
	this.x = 1;
	this.y = 1;
	this.layer = 5; //Render the player on top of other entities
	this.rotation = 0;
	this.lastUpdate = 0;
	this.selectedTile = null;
}

Player.prototype.update = function() {

};

Player.prototype.render = function() {
	if (this.selectedTile !== null) {
		ctx.fillStyle = "#666666";
		ctx.fillRect(this.selectedTile.x * 32 + 1, this.selectedTile.y * 32 + 1, 30, 30);
	}

	ctx.fillStyle = "#CCCCCC";
	this.x = Game.input.mouse.x;
	this.y = Game.input.mouse.y;
	this.x -= this.x % 32;
	this.y -= this.y % 32;
	this.x /= 32;
	this.y /= 32;

	if (this.x <= Game.level.width - 1 && this.y <= Game.level.height - 1) {
		if (this.x >= 0 && this.y >= 0) {
			if (!Game.level.tiles[this.x][this.y] !== undefined) {
				if (!Game.level.tiles[this.x][this.y].solid) {
					ctx.fillRect(this.x * 32, this.y * 32, 30, 30);
				}
			}
		}
	}

	//300 and 225 here are the canvas height/width divided by 2
	if (this.x > 300 && this.x + 300 < Game.screen.maxXOffset * -1) Game.screen.xOffset = -(this.x - 300);
	if (this.y > 225 && this.y + 225 < Game.screen.maxYOffset * -1) Game.screen.yOffset = -(this.y - 225);

	if (Game.screen.xOffset > 0) Game.screen.xOffset = 0;
	if (Game.screen.yOffset > 0) Game.screen.yOffset = 0;
};

Player.prototype.click = function() {
	if (this.x <= Game.level.width - 1 && this.y <= Game.level.height - 1) {
		if (this.x >= 0 && this.y >= 0) {
			if (!Game.level.tiles[this.x][this.y].solid) {
				var canSelect = true;
				for (var i = 0; i < Game.entities.length; i++) {
					if (Game.entities[i] instanceof Tower) {
						if (Game.entities[i].x == this.x * 32 && Game.entities[i].y == this.y * 32)
							canSelect = false;
					}
				}
				if (canSelect) {
					this.selectedTile = new Point(this.x, this.y);
				}
			}
		}
	}
	Game.ui.handleInput();
};

Player.prototype.placeTower = function(id) {
	if (this.selectedTile === null) return;
	new Tower(this.selectedTile.x * 32, this.selectedTile.y * 32, id);
	this.selectedTile = null;
};