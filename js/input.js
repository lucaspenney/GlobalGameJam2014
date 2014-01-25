function InputManager() {
	this.mouse = new Mouse();
	this.keys = [];
}

function Mouse() {
	this.x = 0;
	this.y = 0;
	this.down = false;
}

InputManager.prototype.handleInteractions = function() {
	if (Game.player === null) return;
	if (this.keys[38] || this.keys[87]) { //Up arrow
		Game.player.move(0, -2);
	}
	if (this.keys[37] || this.keys[65]) { //Left Arrow
		Game.player.move(-2, 0);
	}
	if (this.keys[39] || this.keys[68]) { //right arrow
		Game.player.move(2, 0);
	}
	if (this.keys[40] || this.keys[83]) { //down arrow
		Game.player.move(0, 2);
	}
	if (this.keys[32]) { //spacebar

	}
	if (this.keys[69]) { //e

	}
	if (this.keys[70]) { //f

	}
	if (this.keys[71]) { //g

	}
	if (this.keys[82]) { //r

	}
};

$(window).load(function() {
	window.focus();
	$(window).keydown(function(evt) {
		Game.input.keys[evt.keyCode] = true;
	});
	$(window).keyup(function(evt) {
		Game.input.keys[evt.keyCode] = false;
	});
});

//Disable browsers usual function of scrolling with up/down arrow keys
document.onkeydown = function(event) {
	return event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 32;
};

$('#canvas').bind('contextmenu', function(e) {
	//Right click callback
	return false; //Disable usual context menu behaviour
});
$("#canvas").mousedown(function(event) {
	event.preventDefault();
	Game.input.mouse.down = true;
});
$("#canvas").mouseup(function(event) {
	Game.input.mouse.down = false;
});

//Mouse movement
$('#canvas').mousemove(function(e) {
	Game.input.mouse.x = e.pageX - this.offsetLeft;
	Game.input.mouse.y = e.pageY - this.offsetTop;
	if (Game === null) return;
	if (Game.screen !== null) {
		//mouse.x += screen.xOffset;
		//mouse.y += screen.yOffset;
	}
});

//Mouse clicks hook
$("#canvas").click(function(e) {
	window.focus();
	Game.player.click();
});