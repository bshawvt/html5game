
var Audio = null;
function init() {

	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);


	var main = new Main(canvas);
	main.loop(0);
};

function Main(canvas) {
	
	this.components = {canvas: canvas};
	this.metrics = {
		render: {frameTime: (new Date()).getTime(), framesPerSecond: 0, frameRate: 0},
		update: {stepTime: (new Date()).getTime(), stepsPerSecond: 0, stepRate: 0, stepElapsedTime: 0}
	}; 

	this.game = new Game(this);
	Controller = new Input();
};

Main.prototype.loop = function(dt) {
	
	var frameStartTime = (new Date()).getTime();//in milliseconds

	if (frameStartTime > this.metrics.update.stepTime + 1000) {
		this.metrics.update.stepTime = frameStartTime;
		console.log("skipped frame");
	}

	// count steps per second
	if (frameStartTime > this.metrics.update.stepElapsedTime + 1000) {
		this.metrics.update.stepElapsedTime = frameStartTime;
		this.metrics.update.stepsPerSecond = this.metrics.update.stepRate;
		this.metrics.update.stepRate = 0;
	}

	// step
	while(this.metrics.update.stepTime < frameStartTime) { // oddwarg loop!
		this.metrics.update.stepTime+=1000/30;
		this.game.update(frameStartTime, this);
		this.metrics.update.stepRate++;
	}

	// count frames per second
	if (frameStartTime > this.metrics.render.frameTime + 1000) {
		this.metrics.render.frameTime = frameStartTime;
		this.metrics.render.framesPerSecond = this.metrics.render.frameRate;
		this.metrics.render.frameRate = 0;
	}
	this.game.render(frameStartTime);
	this.metrics.render.frameRate++;
	
	var self = this;
	window.requestAnimationFrame(function(dt) {self.loop(dt)});
};