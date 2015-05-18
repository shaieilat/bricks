function Game() {

	// screen width
	this.gameWidth = document.body.clientWidth;
	// screen height
	this.gameHeight = document.body.clientHeight;
	//
	this.collisionInterval = undefined;
	//
	this.bricksContainerClass = 'bricks-container';
	//
	this.bricksContainerWidth = this.gameWidth - 400;
	//
	this.bricksContainerHeight = this.gameHeight / 2;
	//
	this.bricksInRow = Math.floor(this.bricksContainerWidth / 84);
	//
	this.bricksInColumn = Math.floor(this.bricksContainerHeight / 34);
	//
	this.totalNumOfBricks = this.bricksInRow * this.bricksInColumn;
	// controller instance
	this.controller = new Controller;
	// ball instance
	this.ball = new Ball;
	//
	this.bricks = [];
	//
}

Game.prototype.init = function() {
	this.prepareBricksContainer();
	for (var i = 0; i < this.totalNumOfBricks; i++) {
		this.bricks[i] = new Brick(i);
	}
	for (b in this.bricks) {
		this.bricks[b].setOffset();
	}
	this.startGame();
}

Game.prototype.startGame = function() {
	this.ball.move();
	this.checkBallCollision();
}

Game.prototype.checkBallCollision = function() {

	var that = this;
	this.collisionInterval = setInterval(function() {
		if (that.ball.ball().offsetLeft <= 1) {
			that.ball.direction = that.ball.direction == 1 ? 2 : 3;
		} else if (that.ball.ball().offsetLeft > that.gameWidth - that.ball.ballSize) {
			that.ball.direction = that.ball.direction == 2 ? 1 : 4;
		} else if (that.ball.ball().offsetTop <= 1) {
			that.ball.direction = that.ball.direction == 2 ? 3 : 4;
		} else if (that.ball.ball().offsetTop > that.gameHeight - (that.controller.controllerMargin + that.controller.controllerHeight + that.ball.ballSize)
			&& that.ball.ball().offsetLeft > that.controller.controller().offsetLeft &&
			that.ball.ball().offsetLeft < that.controller.controller().offsetLeft + that.controller.getControllerWidth()) {
			that.ball.direction = that.ball.direction == 3 ? 2 : 1;
		} else if (that.ball.ball().offsetTop > that.gameHeight - (that.ball.ballSize * 2)) {
			clearTimeout(that.collisionInterval);
			clearInterval(that.ball.ballInterval);
			alert('game over');
		} else {
			for (var i = 0; i < that.bricks.length; i++) {
				if (that.bricks[i] == undefined) {
					//
				} else if (that.ball.ball().offsetLeft + that.ball.ballSize == that.bricks[i].offset.left && 
					that.ball.ball().offsetTop >= that.bricks[i].offset.top - Math.ceil((that.ball.ballSize / 2)) && 
					that.ball.ball().offsetTop <= that.bricks[i].offset.top + that.bricks[i].brickHeight && 
					(that.bricks[i - 1] == undefined || i % that.bricksInRow == 0)) {
					that.bricks[i].collision();
					console.log('left side');
					that.ball.direction = that.ball.direction == 2 ? 1 : 4;
				} else if (that.ball.ball().offsetLeft == that.bricks[i].offset.left + that.bricks[i].brickWidth && 
					that.ball.ball().offsetTop >= that.bricks[i].offset.top - Math.ceil((that.ball.ballSize / 2)) && 
					that.ball.ball().offsetTop <= that.bricks[i].offset.top + that.bricks[i].brickHeight &&
					(that.bricks[i + 1] == undefined || ((i + 1) % that.bricksInRow == 0))) {
					that.bricks[i].collision();
					console.log('right side');
					that.ball.direction = that.ball.direction == 1 ? 2 : 3;
				} else if (that.ball.ball().offsetTop + that.ball.ballSize == that.bricks[i].offset.top && 
					that.ball.ball().offsetLeft >= that.bricks[i].offset.left - Math.ceil((that.ball.ballSize / 2)) &&
					that.ball.ball().offsetLeft <= that.bricks[i].offset.left + that.bricks[i].brickWidth &&
					that.bricks[i - that.bricksInRow] == undefined) {
					that.bricks[i].collision();
					console.log('top side');
					that.ball.direction = that.ball.direction == 3 ? 2 : 1;
				} else if (that.ball.ball().offsetTop == that.bricks[i].offset.top + that.bricks[i].brickHeight && 
					that.ball.ball().offsetLeft >= that.bricks[i].offset.left - Math.ceil((that.ball.ballSize / 2)) && 
					that.ball.ball().offsetLeft <= that.bricks[i].offset.left + that.bricks[i].brickWidth &&
					that.bricks[i + that.bricksInRow] == undefined) {
					that.bricks[i].collision();
					console.log('bottom side');
					that.ball.direction = that.ball.direction == 2 ? 3 : 4;
				}
			}			
		}
	},1);
}

Game.prototype.prepareBricksContainer = function() {
	var c = document.createElement('div');
	c.setAttribute('class', this.bricksContainerClass);
	document.body.appendChild(c);
	c.style.width = this.bricksContainerWidth + 'px';
	c.style.height = this.bricksContainerHeight + 'px';
	c.style.left = (this.gameWidth - this.bricksContainerWidth) / 2 + 'px';
}

Game.prototype.getBricksContainer = function() {
	return document.getElementsByClassName(this.bricksContainerClass)[0];
}

var game = new Game;
game.init()
