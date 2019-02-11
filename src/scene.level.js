function SceneLevel(invoker, opt) {
	this.sceneManager = null;
	this.width = opt.w?opt.w:1;
	this.height = opt.h?opt.h:1;
	this.cells = [];
	for(var lx = 0; lx < this.width; lx++) {
		this.cells[lx] = [];
		for(var ly = 0; ly < this.height; ly++) {
			this.cells[lx][ly] = {solid: true, objects: []};
		}
	}
	this.threeObj = null;
	this.edit = false;
	var editor = UI.createLevelEditor();
	var self = this;
	editor.toggle.onclick = function(e) {
		self.edit = !self.edit;
	}

	editor.openConsole.onclick = function(e) {
		var item = UI.uiCreateConsole("console");
		UI.uiUpdateElement(item.parent, {x: 10, y: 10, w: 250, h: 150});
		item.input.onkeydown = function(e) { 
			if (e.keyCode == 13) {
				item.console.appendChild(UI.uiCreateElement({name: "span", text: this.value}));// += this.value + 
				item.console.appendChild(UI.uiCreateElement({name: "br"}));
				item.console.scrollTop = item.console.scrollHeight;
				new Command(self, this.value, item.console);
				this.value = "";
				
			}
		};
	}
	//return this;
}
SceneLevel.prototype.moveObject = function(obj, from, to) {
	console.log(this.cells[to.x][to.y]);
	if (this.cells[to.x][to.y].solid == true) { return false; }
	var prev = this.cells[from.x][from.y];
	for(var i = 0; i < prev.objects.length; i++) {
		if (prev.objects[i].id == obj.id) {
			this.cells[from.x][from.y].objects.splice(i, 1);
			break;
		}
	}
	this.cells[to.x][to.y].objects.push(obj);
	return true;
};
SceneLevel.prototype.generateLevelMesh = function() {
	this.threeObj = null;
	
	var geo = new THREE.BufferGeometry();
	/*var verts = [	0, 0, 0,
					0, 1, 0,
					1, 0, 0,

					1, 1, 0,
					1, 0, 0,
					0, 1, 0 ];*/
	var verts = [	1, 0, 0,
					1, 1, 0,
					0, 0, 0,

					0, 0, 0,
					1, 1, 0, 
					0, 1, 0]



	var uvs = [ 1.0, 0.0, 
				1.0, 1.0, 
				0.0, 0.0, 

				0.0, 0.0,
				1.0, 1.0, 
				0.0, 1.0	];

	this.boffx = 0.2;
	this.boffy = 1;

	geo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
	geo.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
	var tex = new THREE.TextureLoader().load('data/grass.png');
	//console.log(tex);
	//tex.repeat.set(0.25, 0.25);//1.0/128, 1.0/128)
	//tex.offset.y = 0.5;
	var mat = new THREE.MeshBasicMaterial( { transparent: true, map: tex } );//{ color: 0x5f5faf});//, side: THREE.DoubleSide } );
	this.threeObj = new THREE.Mesh(geo, mat); // player
	
	this.threeObj.position.x = 0.0;
	this.threeObj.position.y = 0.0;
	this.threeObj.position.z = 0.0;

	this.threeObj.scale.x = 1;
	this.threeObj.scale.y = 1;

	this.threeObj.renderOrder = -1;
	return this.threeObj;
};
SceneLevel.prototype.setReady = function(state) {
	this.isReady = state;
};
SceneLevel.prototype.getObject = function() {
	return this.threeObj;
};
SceneLevel.prototype.setSceneManager = function(sm) {
	this.sceneManager = sm;
};
SceneLevel.prototype.render = function() {

};
SceneLevel.prototype.step = function() {
	if (this.edit == true) {
		
		if (Controller.getMouseState(Input.MOUSE_LEFT)) {
			if (this.hasClicked == true) { return; }

			var m2d = Controller.getMousePosition();

			var m3d = {x: (m2d.x/window.innerWidth) * 2 - 1, y: -(m2d.y/window.innerHeight) * 2 + 1};
			var p0 = new THREE.Vector3(m3d.x, m3d.y, 0.0).unproject(this.sceneManager.scene.camera);
			var p1 = new THREE.Vector3(m3d.x, m3d.y, 1.0).unproject(this.sceneManager.scene.camera);
			
			var t = -p0.z / (p1.z - p0.z);
			var p2 = {x: p0.x + (p1.x-p0.x) * t, y: p0.y + (p1.y-p0.y) * t, z: 0.0};
			//p2.add()
			this.hasClicked = true;

			var nx = Math.floor(p2.x);
			var ny = Math.floor(p2.y);
			if ((nx >= 0 && nx < this.width) && (ny >= 0 && ny < this.height)) {
				this.sceneManager.add(new FloorObject({x:nx, y:ny}));
				this.cells[nx][ny].solid = false;
			}
		} else {
			this.hasClicked = false;
		}
	}
};