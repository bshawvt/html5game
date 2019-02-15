function SceneLevel(invoker, opt) {
	this.sceneManager = null;
	this.width = opt.w?opt.w:1;
	this.height = opt.h?opt.h:1;
	this.cells = [];
	for(var lx = 0; lx < this.width; lx++) {
		this.cells[lx] = [];
		for(var ly = 0; ly < this.height; ly++) {
			this.cells[lx][ly] = {solid: true, texCoord: {x: 0.0, y: 0.0}, objects: []};
		}
	}
	this.threeObj = null;
	this.edit = false;
	this.texCoord = {x: 0.0, y:0.0}
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
	//this.threeObj = null;
	if (this.threeObj !== null) {
		this.threeObj.geometry.dispose();
		this.threeObj = null;
		console.log("asdasd");
	}
	var geo = new THREE.BufferGeometry();
	/*var verts = [	0, 0, 0,
					0, 1, 0,
					1, 0, 0,

					1, 1, 0,
					1, 0, 0,
					0, 1, 0 ];*/

	var xv = 0.0;
	var yv = 0.0;
	var verts = [];
	var uvs = [];

	for(var x = 0; x < this.cells.length; x++) {
		for(var y = 0; y < this.cells[x].length; y++) {
			//if (Math.floor(Math.random()*10)==5) {
			if (this.cells[x][y].solid == false) {
				verts.push(1 + x); 
				verts.push(0 + y);
				verts.push(0);

				verts.push(1 + x);
				verts.push(1 + y);
				verts.push(0);

				verts.push(0 + x);
				verts.push(0 + y);
				verts.push(0);

				verts.push(0 + x);
				verts.push(0 + y);
				verts.push(0);

				verts.push(1 + x);
				verts.push(1 + y);
				verts.push(0);

				verts.push(0 + x);
				verts.push(1 + y);
				verts.push(0);

				var cell = this.cells[x][y];
				var texCoord = {x: cell.texCoord.x, y: cell.texCoord.y};

				uvs.push(0.25 + texCoord.x);
				uvs.push(0.00 + texCoord.y);

				uvs.push(0.25 + texCoord.x);
				uvs.push(0.25 + texCoord.y);

				uvs.push(0.00 + texCoord.x);
				uvs.push(0.00 + texCoord.y);

				uvs.push(0.00 + texCoord.x);
				uvs.push(0.00 + texCoord.y);

				uvs.push(0.25 + texCoord.x);
				uvs.push(0.25 + texCoord.y);

				uvs.push(0.00 + texCoord.x);
				uvs.push(0.25 + texCoord.y);
			};

		}

	}
	/*
	0.25 + xoff1, 0.00 + yoff1, 
	0.25 + xoff1, 0.25 + yoff1, 
	0.00 + xoff1, 0.00 + yoff1, 

	0.00 + xoff1, 0.00 + yoff1,
	0.25 + xoff1, 0.25 + yoff1, 
	0.00 + xoff1, 0.25 + yoff1,	

	0.25 + xoff2, 0.00 + yoff2, 
	0.25 + xoff2, 0.25 + yoff2, 
	0.00 + xoff2, 0.00 + yoff2, 

	0.00 + xoff2, 0.00 + yoff2,
	0.25 + xoff2, 0.25 + yoff2, 
	0.00 + xoff2, 0.25 + yoff2	
	*/
	/*var verts = [	1, 0, 0,
					1, 1, 0,
					0, 0, 0,

					0, 0, 0,
					1, 1, 0, 
					0, 1, 0]
	var uvs = [ 0.5, 0.0, 
				0.5, 0.5, 
				0.0, 0.0, 

				0.0, 0.0,
				0.5, 0.5, 
				0.0, 0.5	];*/
	/*var verts = [	1 + xv, 0 + yv, 0,
					1 + xv, 1 + yv, 0,
					0 + xv, 0 + yv, 0,

					0 + xv, 0 + yv, 0,
					1 + xv, 1 + yv, 0, 
					0 + xv, 1 + yv, 0,

					2 + xv, 1 + yv, 0,
					2 + xv, 2 + yv, 0,
					1 + xv, 1 + yv, 0,

					1 + xv, 1 + yv, 0,
					2 + xv, 2 + yv, 0, 
					1 + xv, 2 + yv, 0]


	var xoff1 = 0.25;//0.25;
	var yoff1 = 0.75;//1.0;
	var xoff2 = 0.0;
	var yoff2 = 0.75;

	var uvs = [ 0.25 + xoff1, 0.00 + yoff1, 
				0.25 + xoff1, 0.25 + yoff1, 
				0.00 + xoff1, 0.00 + yoff1, 

				0.00 + xoff1, 0.00 + yoff1,
				0.25 + xoff1, 0.25 + yoff1, 
				0.00 + xoff1, 0.25 + yoff1,	

				0.25 + xoff2, 0.00 + yoff2, 
				0.25 + xoff2, 0.25 + yoff2, 
				0.00 + xoff2, 0.00 + yoff2, 

				0.00 + xoff2, 0.00 + yoff2,
				0.25 + xoff2, 0.25 + yoff2, 
				0.00 + xoff2, 0.25 + yoff2	];*/

	this.boffx = 0.2;
	this.boffy = 1;

	geo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
	geo.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
	var tex = new THREE.TextureLoader().load('data/floors.png');
	tex.wrapS = THREE.RepeatWrapping;
	tex.wrapT = THREE.RepeatWrapping;
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

	this.threeObj.renderOrder = 1;
	this.threeObj.geometry.attributes.position.needsUpdate = true;
	this.threeObj.geometry.attributes.uv.needsUpdate = true;
	console.log(this.threeObj);
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
				//this.sceneManager.add(new FloorObject({x:nx, y:ny}));
				this.cells[nx][ny].solid = false;
				this.cells[nx][ny].texCoord.x = this.texCoord.x;
				this.cells[nx][ny].texCoord.y = this.texCoord.y;
				this.sceneManager.removeSceneObject(this.threeObj);
				this.generateLevelMesh();
				this.sceneManager.scene.add(this.threeObj);
			}
		} else {
			this.hasClicked = false;
		}

		if (Controller.getButtonState(Input.KEY_1)) {
			this.texCoord.x = 0.25;
			this.texCoord.y = 0.75;
			console.log("test");
		}
		if (Controller.getButtonState(Input.KEY_2)) {
			this.texCoord.x = 0.25;
			this.texCoord.y = 0.50;
		}
	}
};