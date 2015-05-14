function Brick() {
	this.brickWidth = 80;
	this.brickHeight = 30;
	this.brickClass = 'brick';
	this.brickId = 'B_'+ (Math.floor(Math.random() * 100000000));
	this.offset = {};
	this.collided = false;

	this.appendBrick();
}

Brick.prototype.appendBrick = function() {
	var b = document.createElement('span');
	b.setAttribute('class', this.brickClass);
	b.setAttribute('id', this.brickId);
	document.getElementsByClassName(game.bricksContainerClass)[0].appendChild(b);
}

Brick.prototype.getBrick = function() {
	return document.getElementById(this.brickId);
}

Brick.prototype.setOffset = function() {
	this.offset.top = this.getBrick().getBoundingClientRect().top;
	this.offset.left = this.getBrick().getBoundingClientRect().left;
}

Brick.prototype.collision = function() {
	this.getBrick().style.visibility = 'hidden';
 	game.bricks.splice(game.bricks.indexOf(this),1);
 	console.log(game.bricks.length);
}