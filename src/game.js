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

	//this.scene.camera.position.x = -10;//-300;//-window.innerWidth / 2;
	//this.scene.camera.position.y = -10;//-300;//-window.innerHeight / 2;
	this.scene.camera.position.z = 125;//15;//125;//300;
	//this.camera.position.set(20, 20, 20);
	//this.camera.rotation.order = 'XYZ';

	this.scene.camera.lookAt(new THREE.Vector3(0, 0, 0));

	this.scene.camera.position.x = 50;
	this.scene.camera.position.y = 50;

	window.addEventListener('resize', function() {
		self.onResize(invoker);
	});

	this.onResize(invoker);
	this.level = new SceneLevel(this, {w:100, h: 100});
	this.level.generateLevelMesh();

	this.sceneManager = new SceneManager(this);
	this.sceneManager.add(this.level);
	this.sceneManager.add(new PlayerObject({x: this.level.rooms[0].x, y: this.level.rooms[0].y}), true);
	this.sceneManager.add(new BearObject({x: this.level.rooms[1].x, y: this.level.rooms[1].y}));


	this.uiListTmp = []; // map for ui elements that need to be tracked
	//var editor = UI.createLevelEditor();
	this.uiListTmp["editor"] = UI.createLevelEditor();
	//editor.toggle.onclick = function(e) {
	this.uiListTmp["editor"].toggle.onclick = function(e) {
		if (!UI.isEnabled()) { return; }
		self.level.edit = !self.level.edit;
		UI.createNotification("Level editor is " + self.level.edit);
	}
	this.uiListTmp["editor"].openConsole.onclick = function(e) {
		if (!UI.isEnabled()) { return; }
		//var item = UI.uiCreateConsole("console");
		self.uiListTmp["console"] = UI.uiCreateConsole("console");
		self.uiListTmp["editor"].consoleInput = self.uiListTmp["console"].input;
		UI.uiUpdateElement(self.uiListTmp["console"].container, {x: 10, y: 10, w: 250, h: 150});
		self.uiListTmp["console"].input.onkeydown = function(e) { 
			//if (!UI.isEnabled()) { return; }
			if (e.keyCode == 13) {
				self.uiListTmp["console"].console.appendChild(UI.uiCreateElement({name: "span", text: this.value}));// += this.value + 
				self.uiListTmp["console"].console.appendChild(UI.uiCreateElement({name: "br"}));
				self.uiListTmp["console"].console.scrollTop = self.uiListTmp["console"].console.scrollHeight;
				new Command(self, this.value, self.uiListTmp["console"].console);
				this.value = "";
				
			}
		};
	}
	// toggle ui mode
	Controller.addInputEvent(Input.KEY_TAB, function(e){ 
		UI.enable(!UI.isEnabled());

		if (UI.isEnabled()) {
			Object.keys(self.uiListTmp).forEach(function(ui) {
				self.uiListTmp[ui].container.className = self.uiListTmp[ui].container.className.replace( /(?:^|\s)hide(?!\S)/g , '' ); // https://stackoverflow.com/a/196038
			});
			if (self.uiListTmp["editor"].consoleInput) {
				self.uiListTmp["editor"].consoleInput.focus();
			}
			UI.createNotification("UI Mode enabled");
		}
		else {
			Object.keys(self.uiListTmp).forEach(function(ui) {
				self.uiListTmp[ui].container.className += " hide";
			});
			UI.createNotification("UI Mode disabled");
		}
	}, 1);

	UI.enable(true);
	UI.createNotification("UI Mode enabled - Press TAB to toggle");

}
//var editor = false;
Game.prototype.update = function(dt) {
	this.sceneManager.flush();

	// update game state logic
	this.sceneManager.update({active:!UI.isEnabled(),dt:dt});
	
};
Game.prototype.render = function(dt) {
	//this.scene.camera.position.x = this.sceneManager.player.cell.x - 10;
	//this.scene.camera.position.y = this.sceneManager.player.cell.y - 10;
	//this.scene.camera.lookAt(this.sceneManager.player.cell.x, this.sceneManager.player.cell.y, this.sceneManager.player.getObject().position.z);
	
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