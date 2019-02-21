function SceneLevel(invoker, opt) {
	this.sceneManager = null;
	this.width = opt.w?opt.w:1;
	this.height = opt.h?opt.h:1;
	
	this.cells = [];
	this.rooms = [];
	this.exits = {up: null, down: null};

	this.generateDungeon();
		//var to = this.rooms[Math.floor(Math.random() * this.rooms.length)];

		/*var connections = 1 + Math.floor(Math.random() * 2);
		for(var c = 0; c < connections; c++) {
			var to = Math.floor(Math.random() * this.rooms.length);
			if (to != i) {
				var dx = this.rooms[i].x - this.rooms[to].x;
				var cxd = 1;
				if (dx > 0) {
					cxd = -1;
				}
				else if (dx < 0) {
					cxd = 1;
				}
				var dy = this.rooms[i].y - this.rooms[to].y;
				var cyd = 1;
				if (dy > 0) {
					cyd = -1;
				}
				else if (dy < 0) {
					cyd = 1;
				}
				console.log(i, dx, dy);
				for(var cx = this.rooms[i].x; cx < this.rooms[to].x; cx+=cxd) {
					for(var cy = this.rooms[i].y; cy < this.rooms[to].y; cy+=cyd) {
						this.cells[cx][cy].solid = false;
						this.cells[cx][cy].texCoord = {x: 0.0, y: 0.0};
					}	
				}
			}
		}*/

	this.threeObj = null;
	this.edit = false;
	this.texCoord = {x: 0.0, y:0.0}
}
SceneLevel.prototype.generateDungeon = function(player) {

	this.cells = [];
	this.rooms = [];
	this.exits = {up: null, down: null};

	 // init grid
	for(var lx = 0; lx < this.width; lx++) {
		this.cells[lx] = [];
		for(var ly = 0; ly < this.height; ly++) {
			this.cells[lx][ly] = {solid: true, type: 0, texCoord: {x: 0.0, y: 0.0}, objects: []};
		}
	}

	// generate randomized rooms
	var numRooms = 15;
	for(var i = 0; i < 2+numRooms; i++) { // generate 2-10 rooms
		this.rooms[i] = {x:0, y: 0, w: 0, h: 0};

		this.rooms[i].x = 5 + Math.floor(Math.random() * (this.width - 18));// + offset.x;
		this.rooms[i].y = 5 + Math.floor(Math.random() * (this.width - 18));// + offset.y;
		this.rooms[i].w = 3 + Math.floor(Math.random() * 5);
		this.rooms[i].h = 3 + Math.floor(Math.random() * 5);

		var offset = {x: -2 + Math.floor(Math.random() * 4), y: -2 + Math.floor(Math.random() * 4)};

		for(var fillx = -2; fillx < this.rooms[i].w; fillx++) {
			for(var filly = -2; filly < this.rooms[i].h; filly++) {
				var coord = {x: 0.25, y: 0.50};
				/*if (this.exits.down == null && Math.floor(Math.random() * 25) == 1) {
					this.cells[this.rooms[i].x+fillx][this.rooms[i].y+filly].type = 1;
					coord = {x: 0.50, y: 0.50};
					this.exits.down = {x: this.rooms[i].x+fillx, y: this.rooms[i].y+filly};
				}
				if (this.exits.up == null && Math.floor(Math.random() * 25) == 1) {
					this.cells[this.rooms[i].x+fillx][this.rooms[i].y+filly].type = 2;
					coord = {x: 0.50, y: 0.50};
					this.exits.up = {x: this.rooms[i].x+fillx, y: this.rooms[i].y+filly};
				}*/
				this.cells[this.rooms[i].x+fillx][this.rooms[i].y+filly].solid = false;
				this.cells[this.rooms[i].x+fillx][this.rooms[i].y+filly].texCoord = coord;
			}
		}
	}
	
	// connect rooms
	for (var i = 0; i < this.rooms.length; i++) {
		var next = (i+1>=this.rooms.length-1?0:i+1);
		var from = {x: this.rooms[i].x, y: this.rooms[i].y};
		var to = {x: this.rooms[next].x, y: this.rooms[next].y};
		var tileStep = {x:from.x, y:from.y}

		var done = false;
		while (!done) {

			if (this.cells[tileStep.x][tileStep.y].type == "passage") { done = true; }
			this.cells[tileStep.x][tileStep.y].solid = false;
			this.cells[tileStep.x][tileStep.y].type = "passage";
			this.cells[tileStep.x][tileStep.y].texCoord = {x: 0.25, y: 0.50};
			
			var dx = tileStep.x - to.x;
			var dy = tileStep.y - to.y;

			if (dx > 0) {
				tileStep.x--;
			}
			else if ( dx < 0) {
				tileStep.x++;
			}

			if (dy > 0) {
				tileStep.y--;
			}
			else if ( dy < 0) {
				tileStep.y++;
			}

			if (tileStep.x == to.x && tileStep.y == to.y) {
				done = true;
			}

		}


	}
	
	if (this.exits.down == null) {
		var r = this.rooms.length - 1;
		this.exits.down = {x: this.rooms[r].x, y: this.rooms[r].y};
		this.cells[this.rooms[r].x][this.rooms[r].y].type = "stair_down";
		this.cells[this.rooms[r].x][this.rooms[r].y].solid = false;
		this.cells[this.rooms[r].x][this.rooms[r].y].texCoord = {x: 0.50, y: 0.50};
	}
	if (this.exits.up == null) {
		var r = Math.floor(Math.random()*(this.rooms.length-1));
		//console.log(this.rooms.length, rx);
		this.exits.up = {x: this.rooms[r].x, y: this.rooms[r].y};
		this.cells[this.rooms[r].x][this.rooms[r].y].type = "stair_up";
		this.cells[this.rooms[r].x][this.rooms[r].y].solid = false;
		this.cells[this.rooms[r].x][this.rooms[r].y].texCoord = {x: 0.50, y: 0.50};
	}

	// verify rooms are connected, else fix
	for(var i = 0; i < this.rooms.length; i++) { 
		var from = this.rooms[i];
		var to = this.exits.down;

	}

	console.log(this.exits);
	console.log(this.cells[this.exits.up.x][this.exits.up.y], this.cells[this.exits.down.x][this.exits.down.y])
	
	if (this.isReady == true) {
		this.sceneManager.removeSceneObject(this.threeObj);
		this.generateLevelMesh();
		this.sceneManager.scene.add(this.threeObj);

		if (player!==undefined) {
			console.log("reee");
			console.log(player, this.exits.up);
			this.moveObject(player, player.cell, {x: this.exits.up.x, y: this.exits.up.y} );
			player.setPosition(this.exits.up.x, this.exits.up.y);
		}
	}
};
SceneLevel.prototype.findExit = function(from, to) {
	var done = false;
	var step = {x: from.x, y: from.y};
	var steps = 0;
	while (!done || steps > 1000) {

		var dx = step.x - to.x;
		var dy = step.y - to.y;

		if (dx > 0) {
			step.x--;
		}
		else if ( dx < 0) {
			step.x++;
		}

		if (dy > 0) {
			step.y--;
		}
		else if ( dy < 0) {
			step.y++;
		}

		if (step.x == to.x && step.y == to.y) {
			return true;
		}
		steps++;
	}
	return false;

};
SceneLevel.prototype.moveObject = function(obj, from, to) {
	//console.log(to, from, this.width, this.height);
	//console.log(to);
	if ((to.x > this.width || to.x < 0) || (to.y > this.height || to.y < 0)) {
		return false;
	}
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
		//console.log("asdasd");
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

	this.boffx = 0.2;
	this.boffy = 1;

	geo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
	geo.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
	var tex = new THREE.TextureLoader().load('data/floors.png');
	//tex.anisotropy = 0;
	tex.magFilter = THREE.NearestFilter;
	tex.minFilter = THREE.NearestFilter;
	tex.wrapS = THREE.RepeatWrapping;
	tex.wrapT = THREE.RepeatWrapping;
	//console.log(tex);
	//tex.repeat.set(0.25, 0.25);//1.0/128, 1.0/128)
	//tex.offset.y = 0.5;
	var mat = new THREE.MeshBasicMaterial( { transparent: true, map: tex } );//{ color: 0x5f5faf});//, side: THREE.DoubleSide } );
	//mat.blending = THREE.CustomBlending;
	//mat.blendSrc = THREE.OneFactor;
	//mat.blendDst = THREE.OneMinusSrcAlphaFactor;
	this.threeObj = new THREE.Mesh(geo, mat); // player
	
	this.threeObj.position.x = 0.0;
	this.threeObj.position.y = 0.0;
	this.threeObj.position.z = 0.0;

	this.threeObj.scale.x = 1;
	this.threeObj.scale.y = 1;

	this.threeObj.renderOrder = 1;
	this.threeObj.geometry.attributes.position.needsUpdate = true;
	this.threeObj.geometry.attributes.uv.needsUpdate = true;
	//console.log(this.threeObj);
	return this.threeObj;
};
SceneLevel.prototype.onReady = function(sm) {
	this.sceneManager = sm;
	this.isReady = true;
};
SceneLevel.prototype.getObject = function() {
	return this.threeObj;
};
SceneLevel.prototype.render = function() {

};
SceneLevel.prototype.step = function() {
	if (this.edit == true) {
		
		if (Controller.getMouseState(Input.MOUSE_LEFT)) {
			if (this.hasClicked == true) { return; }

			var m2d = Controller.getCursorPosition();

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