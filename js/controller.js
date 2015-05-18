var Controller = function() {
	
	//
	this.controllerId = 'C_'+ (Math.floor(Math.random() * 100));
	this.pageMargin = 2;
	this.controllerMoveSpeed = 50;
	this.controllerHeight = 50; // in px
	this.controllerMargin = 20; // margin between the controller to the bottom of the window in px
	this.controllerClass = 'controller';
	//

	//
	this.init();
}

Controller.prototype.init = function() {
	this.appendController();
	this.attachEvent();
}

Controller.prototype.getController = function() {
	return document.getElementById(this.controllerId);
}

Controller.prototype.appendController = function() {
	var c = document.createElement('div');
	c.setAttribute('id', this.controllerId);
	c.setAttribute('class', this.controllerClass);
	document.body.appendChild(c);
}

Controller.prototype.attachEvent = function() {
	var that = this;
	document.addEventListener('keydown', function(e){
		if(e.keyCode == 39) {
			that.moveRight();
		} else if (e.keyCode == 37) {
			that.moveLeft();
		}
	}, false);
}

Controller.prototype.moveLeft = function() {
	if (this.getController().offsetLeft < this.controllerMoveSpeed) {
		this.getController().style.left =  '0px';
	} else if (this.getController().offsetLeft > this.pageMargin) {
		this.getController().style.left = this.getController().offsetLeft - this.controllerMoveSpeed + 'px';
	}
}

Controller.prototype.moveRight = function() {
	if (this.getController().offsetLeft  + this.getControllerWidth() > game.gameWidth - this.controllerMoveSpeed) {
		this.getController().style.left =  game.gameWidth - this.getControllerWidth() + 'px';
	} else if (this.getController().offsetLeft < game.gameWidth - this.getControllerWidth() - this.pageMargin) {
		this.getController().style.left = this.getController().offsetLeft + this.controllerMoveSpeed + 'px';
	}
}

Controller.prototype.getControllerWidth = function() {
	var s = getComputedStyle(this.getController());
	return parseFloat(s.getPropertyValue('width'));
}
