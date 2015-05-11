function Game() {

	// screen width
	this.gameWidth = document.body.clientWidth;
	// screen height
	this.gameHeight = document.body.clientHeight;
	//
	this.collisionInterval = undefined;


	// controller instance
	this.controller = new Controller;
	// ball instance
	this.ball = new Ball;
	//
}

Game.prototype.init = function() {
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
		}
	},1);
}

var game = new Game;
game.init()
