function Game() {

	//
	this.gameStarted = false;
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
	var that = this;
	this.prepareBricksContainer();
	for (var i = 0; i < this.totalNumOfBricks; i++) {
		this.bricks[i] = new Brick(i);
	}
	for (b in this.bricks) {
		this.bricks[b].setOffset();
	}
	document.addEventListener('keypress', function() {
		if (!that.gameStarted) {
			that.startGame();
		}
	}, false);
}

Game.prototype.startGame = function() {
	document.getElementsByClassName('intro')[0].style.display = 'none';
	this.gameStarted = true;
	this.ball.move();
	this.checkBallCollision();
}

Game.prototype.checkBallCollision = function() {

	var that = this;
	this.collisionInterval = setInterval(function() {
		if (that.ball.getBall().offsetLeft <= 1) {
			that.ball.direction = that.ball.direction == 1 ? 2 : 3;
		} else if (that.ball.getBall().offsetLeft > that.gameWidth - that.ball.ballSize) {
			that.ball.direction = that.ball.direction == 2 ? 1 : 4;
		} else if (that.ball.getBall().offsetTop <= 1) {
			that.ball.direction = that.ball.direction == 2 ? 3 : 4;
		} else if (that.ball.getBall().offsetTop > that.gameHeight - (that.controller.controllerMargin + that.controller.controllerHeight + that.ball.ballSize)
			&& that.ball.getBall().offsetLeft > that.controller.getController().offsetLeft &&
			that.ball.getBall().offsetLeft < that.controller.getController().offsetLeft + that.controller.getControllerWidth()) {
			that.ball.direction = that.ball.direction == 3 ? 2 : 1;
		} else if (that.ball.getBall().offsetTop > that.gameHeight - (that.ball.ballSize * 2)) {
			that.lose();
		} else {
			for (var i = 0; i < that.bricks.length; i++) {
				if (that.bricks[i] == undefined) {
					//
				} else if (that.ball.getBall().offsetLeft + that.ball.ballSize >= that.bricks[i].offset.left - 1 && 
					that.ball.getBall().offsetLeft + that.ball.ballSize <= that.bricks[i].offset.left &&
					that.ball.getBall().offsetTop >= that.bricks[i].offset.top - Math.ceil((that.ball.ballSize / 2)) && 
					that.ball.getBall().offsetTop <= that.bricks[i].offset.top + that.bricks[i].brickHeight && 
					(that.bricks[i - 1] == undefined || i % that.bricksInRow == 0)) {
					// ball touches the left side of a brick
					that.bricks[i].collision();
					that.ball.direction = that.ball.direction == 2 ? 1 : 4;
				} else if (that.ball.getBall().offsetLeft >= that.bricks[i].offset.left + that.bricks[i].brickWidth && 
					that.ball.getBall().offsetLeft <= that.bricks[i].offset.left + that.bricks[i].brickWidth + 1 &&
					that.ball.getBall().offsetTop >= that.bricks[i].offset.top - Math.ceil((that.ball.ballSize / 2)) && 
					that.ball.getBall().offsetTop <= that.bricks[i].offset.top + that.bricks[i].brickHeight &&
					(that.bricks[i + 1] == undefined || ((i + 1) % that.bricksInRow == 0))) {
					// ball touches the right side of a brick
					that.bricks[i].collision();
					that.ball.direction = that.ball.direction == 1 ? 2 : 3;
				} else if (that.ball.getBall().offsetTop + that.ball.ballSize >= that.bricks[i].offset.top - 1 && 
					that.ball.getBall().offsetTop + that.ball.ballSize <= that.bricks[i].offset.top && 
					that.ball.getBall().offsetLeft + that.ball.ballSize >= that.bricks[i].offset.left &&
					that.ball.getBall().offsetLeft <= that.bricks[i].offset.left + that.bricks[i].brickWidth &&
					that.bricks[i - that.bricksInRow] == undefined) {
					// ball touches the top side of a brick
					that.bricks[i].collision();
					that.ball.direction = that.ball.direction == 3 ? 2 : 1;
				} else if (that.ball.getBall().offsetTop >= that.bricks[i].offset.top + that.bricks[i].brickHeight && 
					that.ball.getBall().offsetTop <= that.bricks[i].offset.top + that.bricks[i].brickHeight + 1 && 
					that.ball.getBall().offsetLeft + that.ball.ballSize >= that.bricks[i].offset.left && 
					that.ball.getBall().offsetLeft <= that.bricks[i].offset.left + that.bricks[i].brickWidth &&
					that.bricks[i + that.bricksInRow] == undefined) {
					// ball touches the bottom side of a brick
					that.bricks[i].collision();
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

Game.prototype.lose = function() {
	clearTimeout(this.collisionInterval);
	clearInterval(this.ball.ballInterval);
	alert('Game Over');
}

Game.prototype.win = function() {
	clearTimeout(this.collisionInterval);
	clearInterval(this.ball.ballInterval);
	alert('Well Done!');
}

var game = new Game;
game.init()
