function UI() {
	this.towerSprites = [];
	for (var i = 0; i < TOWERS.length; i++) {
		this.towerSprites[i] = new Sprite("img/towers.png");
		this.towerSprites[i].xOffset = i * 32;
		this.towerSprites[i].frameWidth = 32;
		this.towerSprites[i].frameHeight = 32;
		this.towerSprites[i].scale = 2;
	}
	this.buttons = [];
	for (var i = 0; i < this.towerSprites.length; i++) {
		this.buttons.push(new Button(i * 150 + 5, 375, 140, 75, i));
	}
}

UI.prototype.draw = function() {
	ctx.fillStyle = "#000";
	ctx.fillRect(480, 0, 200, Game.height);

	ctx.fillRect(0, 352, Game.width, 150);

	for (var i = 0; i < this.towerSprites.length; i++) {
		ctx.fillStyle = "#333333";
		ctx.fillRect(i * 150 + 5, 375, 140, 75);
		this.towerSprites[i].renderOnScreen(i * 150 + 5, 380);
		ctx.fillStyle = "#FFFFFF";
		ctx.font = '12px Calibri';
		ctx.fillText(TOWERS[i].name, i * 150 + 90, 380 + 10);
	}
};

UI.prototype.drawLoadingScreen = function() {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//ctx.fillText(this.alert, canvas.width/2,canvas.height/4);
	ctx.textAlign = 'center';
	ctx.fillStyle = "#FFF";
	ctx.font = 'normal 20px arial';
	ctx.fillText("Loading...", canvas.width / 2, canvas.height / 4);
	ctx.fillRect(130, canvas.height / 3, Game.loader.getLoadPercent() * 3, 30);
	ctx.fillText(Math.floor(Game.loader.getLoadPercent()) + "%", canvas.width / 2, canvas.height / 2);
};

UI.prototype.handleInput = function() {
	var m = new BoundingBox(Game.input.mouse.x, Game.input.mouse.y, 1, 1);
	for (var i = 0; i < this.buttons.length; i++) {
		if (m.isColliding(this.buttons[i])) {
			this.buttons[i].press();
		}
	}
};

function Button(x, y, width, height, id) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
	this.id = id;
}

Button.prototype.press = function() {
	Game.player.placeTower(this.id);
};