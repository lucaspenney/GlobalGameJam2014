var tileSheet = new Image();
tileSheet.src = "img/tilesheet.png";

function Tile(x, y, id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.boundingBox = new BoundingBox(this.x, this.y, 32, 32);
	if (this.id > 2) this.solid = true; //Specify which tile ID's should be solid here
}

Tile.prototype.setColor = function(color) {
	this.color = color;
};

Tile.prototype.render = function() {
	var xOffset = ((this.id - 1) % 4) * 32;
	var yOffset = Math.floor(((this.id - 1) / 4)) * 32;
	ctx.drawImage(tileSheet, xOffset, yOffset, 32, 32, this.x + Game.screen.xOffset, this.y + Game.screen.yOffset, 32, 32);
};

function isSolidTile(x, y) {
	if (Game.level.tiles[x][y] === undefined) return;
	if (Game.level.tiles[x][y] === null) return;
	if (Game.level.tiles[x][y].solid) return true;
	else return false;
}