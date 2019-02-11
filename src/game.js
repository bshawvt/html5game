function Game(invoker) {
	var self = this;
	
	//this.camera.rotation.z = 0 * Math.PI / 180;
	//this.camera.rotation.x = 45 * Math.PI / 180;
	//this.camera.rotation.z = 0 * Math.PI / 180;
	//this.camera.rotation.y = Math.atan( - 1 / Math.sqrt( 2 ) );
	//this.camera.rotation.y = Math.PI / 4;
	

	this.renderer = new THREE.WebGLRenderer({canvas: invoker.components.canvas});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.setClearColor(0xffffff); 

	this.scene = new THREE.Scene();

	this.scene.camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);
	//console.log(this.scene.camera);
	//this.camera = new THREE.OrthographicCamera(window.innerWidth / -25, window.innerWidth / 25, window.innerHeight / 25, window.innerHeight / -25, 0.1, 10);
	//this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
	//this.camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, -window.innerHeight, window.innerHeight, -1000, 1000);
	this.scene.camera.up = new THREE.Vector3(0, 0, 1);
	
	

	this.scene.camera.position.x = -10;//-300;//-window.innerWidth / 2;
	this.scene.camera.position.y = -10;//-300;//-window.innerHeight / 2;
	this.scene.camera.position.z = 15;//125;//300;
	//this.camera.position.set(20, 20, 20);
	//this.camera.rotation.order = 'XYZ';

	this.scene.camera.lookAt(new THREE.Vector3(0, 0, 0));

	window.addEventListener('resize', function() {
		self.onResize(invoker);
	});

	this.onResize(invoker);
	this.level = new SceneLevel(this, {w:50, h: 50});
	this.level.generateLevelMesh();

	this.sceneManager = new SceneManager(this);
	console.log(this.level);
	this.sceneManager.add(this.level);
	this.sceneManager.add(new PlayerObject(), true);
	this.sceneManager.add(new BearObject({x:2, y:3}));

	/*for(var ix = 0; ix < 10; ix++) {
		//this.sceneManager.add(new FloorObject({x:ix, y:iy}));
		for(var iy = 0; iy < 10; iy++) { 
			this.sceneManager.add(new FloorObject({x:ix, y:iy}));
		}
	}*/

}
//var editor = false;
Game.prototype.update = function(dt) {
	this.sceneManager.flush();

	// update game state logic
	

	this.sceneManager.update({active:!this.level.edit,dt:dt});
	
};
Game.prototype.render = function(dt) {
	this.scene.camera.position.x = this.sceneManager.player.getObject().position.x - 10;
	this.scene.camera.position.y = this.sceneManager.player.getObject().position.y - 10;
	this.scene.camera.lookAt(this.sceneManager.player.getObject().position);
	
	this.sceneManager.render(dt);
	this.renderer.render(this.scene, this.scene.camera);
};
Game.prototype.onResize = function(e) {
	
	e.components.canvas.width = window.innerWidth;
	e.components.canvas.height = window.innerHeight;

	this.renderer.setSize(window.innerWidth, window.innerHeight);
	
	//var viewSize = 500;//window.innerWidth * window.innerHeight;
	this.scene.camera.aspect = window.innerWidth/window.innerHeight;
	
	/*this.camera.left = 		-this.camera.aspect * viewSize / 2;//-window.innerWidth;// / 2;
	this.camera.right = 	this.camera.aspect * viewSize / 2;//window.innerWidth;// / 2;
	this.camera.top = 		-viewSize / 2;//-window.innerHeight;// / 2;
	this.camera.bottom = 	viewSize / 2;//window.innerHeight;// / 2;*/
	this.scene.camera.updateProjectionMatrix();

};