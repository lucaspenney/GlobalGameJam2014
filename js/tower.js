var TOWERS = [{
	name: 'Dot Tower',
	cost: 50,
	damage: 25,
	effect: 'none'
}, {
	name: 'Ice Tower',
	cost: 75,
	damage: 15,
	effect: 'ice'
}, {
	name: 'Fire Tower',
	cost: 100,
	damage: 30,
	effect: 'burn'
}, {
	name: 'Laser Tower',
	cost: 250,
	damage: 100,
	effect: 'laser'
}];

function Tower(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = TOWERS[type];
	this.sprite = new Sprite("img/towers.png");
	this.sprite.xOffset = (type) * 32;
	this.sprite.frameWidth = 32;
	this.sprite.frameHeight = 32;
	Game.entities.push(this);
}

Tower.prototype.update = function() {

};

Tower.prototype.render = function() {
	this.sprite.renderOnScreen(this.x + 1, this.y);
};