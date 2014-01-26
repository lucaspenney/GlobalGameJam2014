function Level(num) {
	var fileName = 'maps/level' + num + '.tmx';
	tmxloader.load(fileName);

	this.tiles = [];
	this.collisionTiles = [];
	this.xOffset = 0;
	this.yOffset = 0;
	this.width = tmxloader.map.width;
	this.height = tmxloader.map.height;
	this.overlayAlpha = 0;
	this.fadeStep = 0;
	this.isFading = false;
	this.levelTime = 0;
	this.lastUpdate = 0;
	this.tileSize = 32;

	for (var x = 0; x < this.width; x++) {
		this.tiles[x] = [];
		for (var y = 0; y < this.height; y++) {
			this.tiles[x][y] = new Tile(x * 32, y * 32, tmxloader.map.layers[0].data[y][x]);
		}
	}
	for (var x = 0; x < this.width; x++) {
		this.collisionTiles[x] = [];
		for (var y = 0; y < this.height; y++) {
			if (this.tiles[x][y].solid) {
				this.collisionTiles[x][y] = 1;
			} else {
				this.collisionTiles[x][y] = 0;
			}
		}
	}

	for (var x = 0; x < this.width; x++) {
		for (var y = 0; y < this.height; y++) {
			switch (tmxloader.map.layers[1].data[y][x] - 64) { //Subtract the # of tiles on the first (tile) layer
				case 1:
					new PlayerSpawn(x, y);
					break;
			}
		}
	}
	new PlayerSpawn(64, 64);
}

Level.prototype.update = function() {
	if (getCurrentMs() - this.lastUpdate > 1) {
		this.levelTime++;
		this.lastUpdate = getCurrentMs();
	}
};

Level.prototype.render = function() {
	for (var x = 0; x < this.width; x++) { //These ifs check to render tiles only on screen based on pixel values of screen size
		if (x > (((Game.screen.xOffset + this.tileSize - (Game.screen.xOffset % this.tileSize)) / this.tileSize) * -1) && x < (((Game.screen.xOffset - Game.width - this.tileSize - (Game.screen.xOffset % this.tileSize)) / this.tileSize) * -1)) {
			for (var y = 0; y < this.height; y++) {
				if (y > (((Game.screen.yOffset + this.tileSize - (Game.screen.yOffset % this.tileSize)) / this.tileSize) * -1) && y < (((Game.screen.yOffset - Game.height - this.tileSize - (Game.screen.yOffset % this.tileSize)) / this.tileSize) * -1))
					this.tiles[x][y].render();
			}
		}
	}
};

Level.prototype.update = function() {
	if (getCurrentMs() - this.lastUpdate > 1) {
		this.levelTime++;
		this.lastUpdate = getCurrentMs();
	}
};

Level.prototype.fadeIn = function() {
	//ambience1.play();
	this.overlayAlpha = 1;
	this.isFading = true;
	this.fadeStep = 0;
	setTimeout(fadeInLevel, 50);
};

Level.prototype.fadeOut = function() {
	Game.sound.ambience1.stop();
	this.overlayAlpha = 0;
	this.isFading = true;
	this.fadeStep = 0;
	setTimeout(fadeOutLevel, 50);
};

function fadeInLevel() {
	if (Game.level !== null) {
		Game.level.overlayAlpha -= 0.030;
		Game.level.fadeStep++;
		if (Game.level.fadeStep < 75 && Game.level.isFading) {
			setTimeout(fadeInLevel, 50);
		} else {
			Game.level.isFading = false;
		}
	}
}

function fadeOutLevel() {
	if (Game.level !== null) {
		Game.level.overlayAlpha += 0.015;
		Game.level.fadeStep++;
		if (Game.level.fadeStep < 75 && Game.level.isFading) {
			setTimeout(fadeOutLevel, 50);
		} else {
			Game.level.isFading = false;
		}
	}
}

Level.prototype.drawOverlay = function() {
	ctx.fillStyle = "rgba(0, 0, 0, " + this.overlayAlpha + ")";
	ctx.fillRect(0, 0, 600, 450);
};