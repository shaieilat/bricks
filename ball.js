function Ball() {

	// ball id
	this.ballId = 'B_'+Math.floor(Math.random() * 1000);
	// at first - we pick the direction randomlly - 
	// there are 4 possible directions (1,2,3,4)
	// 1: up left, 2: up right, 3: down right, 4: down left
	this.direction = Math.floor(Math.random() * 2) + 1;
	//
	this.ballSpeed = 1;
	//
	this.ballSize = 15; // in px
	//
	this.ballInterval = undefined;
	//
	this.ballClass = 'ball';
	//
	this.init();
}

Ball.prototype.init = function() {
	this.appendBall();
}

Ball.prototype.ball = function() {
	return document.getElementById(this.ballId);
}

Ball.prototype.appendBall = function() {
	var b = document.createElement('div');
	b.setAttribute('id',this.ballId);
	b.setAttribute('class',this.ballClass);
	document.body.appendChild(b);
}

Ball.prototype.move = function() {
	var that = this;
	that.ballInterval = setInterval(function() {
		switch (that.direction) {
			case 1:
				that.ball().style.left = that.ball().offsetLeft - that.ballSpeed + 'px';
				that.ball().style.top = that.ball().offsetTop - that.ballSpeed + 'px';
				break;
			case 2:
				that.ball().style.left = that.ball().offsetLeft + that.ballSpeed + 'px';
				that.ball().style.top = that.ball().offsetTop - that.ballSpeed + 'px';
				break;
			case 3:
				that.ball().style.left = that.ball().offsetLeft + that.ballSpeed + 'px';
				that.ball().style.top = that.ball().offsetTop + that.ballSpeed + 'px';
				break;
			case 4:
				that.ball().style.left = that.ball().offsetLeft - that.ballSpeed + 'px';
				that.ball().style.top = that.ball().offsetTop + that.ballSpeed + 'px';
				break;
		}
	},1);

}