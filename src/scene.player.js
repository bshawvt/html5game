function PlayerObject(opt) {
	this.sceneManager = null; // SceneManager ref set by SceneManager.add
	this.cell = {x: (opt.x ? opt.x:0.0), y:(opt.y ? opt.y:0.0)}; // reference to location in SceneManager.level
	this.deleted = false; // flag for deletion, set by SceneManager.remove
	this.isReady = false; // set by SceneManager.flush
	this.threeObj = null; // object3d
	this.id = 0; // set by SceneManager.add










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



	/*var uvs = [ 1.0, 0.0, 
				1.0, 1.0, 
				0.0, 0.0, 

				0.0, 0.0,
				1.0, 1.0, 
				0.0, 1.0	];*/

	var uvs = [ 0.5, 0.0, 
				0.5, 0.5, 
				0.0, 0.0, 

				0.0, 0.0,
				0.5, 0.5, 
				0.0, 0.5	];

	this.boffx = 0.5;
	this.boffy = 1;

	geo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
	geo.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
	var tex = new THREE.TextureLoader().load('data/player.png');
	//console.log(tex);
	tex.repeat.set(0.5, 0.5);//1.0/128, 1.0/128)
	tex.offset.y = 0.5;
	var mat = new THREE.MeshBasicMaterial( { transparent: true, map: tex } );//{ color: 0x5f5faf});//, side: THREE.DoubleSide } );
	this.threeObj = new THREE.Mesh(geo, mat); // player
	
	this.threeObj.position.x = (opt.x ? opt.x:0.0) - this.boffx;
	this.threeObj.position.y = (opt.y ? opt.y:0.0) + this.boffy;
	this.threeObj.position.z = (opt.z ? opt.z:0.0);

	this.threeObj.scale.x = 2;
	this.threeObj.scale.y = 2;

	this.threeObj.renderOrder = 10;

	this.travelTo = null; // takes cell

	this.lastStepTime = 0;
	this.speed = 1;

	this.anim = [];
	//this.anim["move"] = {tick: 0, rotation: 0.02};

	this.type = 0;//"humanoid";
	this.health = 5;
	this.magic = 0;

	this.equipment = {head: null, chest: null, legs: null, feet: null, hands: null, amulet: null, rings: [null, null] };
	this.likeList = [];
	this.hateList = [];

}
PlayerObject.prototype.setPosition = function(x, y) {
	this.cell = {x: x, y: y};
	this.threeObj.position.x = x - this.boffx;
	this.threeObj.position.y = y + this.boffy;
};
PlayerObject.prototype.step = function(state) {
	if (state.dt - this.lastStepTime > this.speed) {
		this.lastStepTime = state.dt;
		if (this.travelTo !== null) {
			if (this.travelTo.skip === false) {
				this.travelTo.skip = true;
				if (this.travelTo.next === undefined) {
					this.travelTo.next = { x: 0, y: 0};
				}
				
				var dx = this.travelTo.x - this.cell.x;
				var dy = this.travelTo.y - this.cell.y;
				if (dx > 0) {
					this.travelTo.next.x = this.cell.x+1;
				}
				else if (dx < 0) {
					this.travelTo.next.x = this.cell.x-1;
				}
				else {
					this.travelTo.next.x = this.cell.x;
				}

				if (dy > 0) {
					this.travelTo.next.y = this.cell.y+1;
				}
				else if (dy < 0) {
					this.travelTo.next.y = this.cell.y-1;
				}
				else {
					this.travelTo.next.y = this.cell.y;
				}

				if (this.sceneManager.level.moveObject(this, this.cell, {x: this.travelTo.next.x, y: this.travelTo.next.y})) {
					this.cell = {x: this.travelTo.next.x, y: this.travelTo.next.y};
					this.threeObj.position.x = this.travelTo.next.x - this.boffx;
					this.threeObj.position.y = this.travelTo.next.y + this.boffy;
					
					if ((this.travelTo.x == this.cell.x) && (this.travelTo.y == this.cell.y)) {
						if (this.sceneManager.level.cells[this.travelTo.next.x][this.travelTo.next.y].type=="stair_down") {
							this.sceneManager.level.generateDungeon(this);
						}
						this.travelTo = null;
					}
				}
				else {
					this.travelTo = null;
				}

			}
			else{
				this.travelTo.skip = false;
			}
		}
	}

	//if (Controller.getMouseState(Input.MOUSE_LEFT) && state.active==true) {
	if (Controller.getMouseState(Input.MOUSE_LEFT) && state.active==true) {
		if (canMove == false) { return; }

		var m2d = Controller.getCursorPosition();
		//if (m2d.x > (window.innerWidth/2)) {
			//this.threeObj.scale.x = 2;
			//this.threeObj.scale.y = 2;
			//////this.threeObj.position.x = this.cell.x - this.boffx;
			//this.threeObj.position.y = this.cell.y + this.boffy;
		//}
		//else {
			//this.threeObj.position.x = this.cell.x - 1.5;
			//this.threeObj.position.y = this.cell.y - 3.0;
			//this.threeObj.scale.x = -2;
			//this.threeObj.scale.y = 2;
			//this.threeObj.position.x = this.cell.x - 5;
		//	//this.threeObj.position.y = this.cell.y - this.boffx;
		//}

		var m3d = {x: (m2d.x/window.innerWidth) * 2 - 1, y: -(m2d.y/window.innerHeight) * 2 + 1};
		var p0 = new THREE.Vector3(m3d.x, m3d.y, 0.0).unproject(this.sceneManager.scene.camera);
		var p1 = new THREE.Vector3(m3d.x, m3d.y, 1.0).unproject(this.sceneManager.scene.camera);
		
		var t = -p0.z / (p1.z - p0.z);
		var p2 = {x: p0.x + (p1.x-p0.x) * t, y: p0.y + (p1.y-p0.y) * t, z: 0.0};
		//p2.add()
		canMove = false;

		var nx = Math.floor(p2.x);
		var ny = Math.floor(p2.y);
		if ((nx >= 0 && nx < this.sceneManager.level.width) && (ny >= 0 && ny < this.sceneManager.level.height)) {
			this.travelTo = {x:nx, y:ny};
		}
	} else {
		canMove = true;
	}
};
PlayerObject.prototype.onReady = function(sm) {
	this.sceneManager = sm;
	this.isReady = true;
	this.sceneManager.level.moveObject(this, {x: 0, y: 0}, this.cell);
};
PlayerObject.prototype.getObject = function() {
	return this.threeObj;
};
PlayerObject.prototype.render = function() {
	//console.log("asdasd")
	//this.threeObj.quaternion.copy(this.sceneManager.scene.camera.quaternion);
	//console.log(this.threeObj.rotation.z);
	if (this.travelTo !== null) {
		
		if (this.anim["move"] !== undefined) {
			if (this.anim["move"].tick % 2 == 1) {

				if (this.threeObj.rotation.z >= -(0.630 - 0.08)) {
					this.anim["move"].rotation = -0.02;
					//-0.6290148024266757
				}
				else if (this.threeObj.rotation.z <= -(0.630 + 0.08)) {
					this.anim["move"].rotation = 0.02;
				}
				this.threeObj.rotation.z += this.anim["move"].rotation;
				//this.threeObj.rotation.z = -0.630;
				//this.threeObj.rotation.z = -0.550;
				//this.threeObj.rotation.z = -0.630;
				//this.threeObj.rotation.z = -0.710;

			}
			else {
				//this.threeObj.scale.x = 2;
			}
			this.anim["move"].tick++;
		}
		else {
			this.anim["move"] = {tick: 0, rotation: 0.02};
		}

	}
	else {
		//this.threeObj.rotation.x = 0;
		this.threeObj.quaternion.copy(this.sceneManager.scene.camera.quaternion);
	}
	//this.threeObj.quaternion.copy(this.sceneManager.scene.camera.quaternion);
};