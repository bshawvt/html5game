function BearObject(opt) {
	this.sceneManager = null; // SceneManager ref set by SceneManager.add
	this.cell = {x: (opt.x ? opt.x:0.0), y:(opt.y ? opt.y:0.0)}; // reference to location in SceneManager.level
	this.deleted = false; // flag for deletion, set by SceneManager.remove
	this.isReady = false; // set by SceneManager.flush
	this.threeObj = null; // object3d
	this.id = 0; // set by SceneManager.add
	this.anim = [];









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
	tex.repeat.set(0.5, 0.5);
	tex.offset.y = 0.75;
	var mat = new THREE.MeshBasicMaterial( { transparent: true, map: tex } );
	this.threeObj = new THREE.Mesh(geo, mat); // enemy
	
	this.threeObj.position.x = (opt.x ? opt.x:0.0) - this.boffx;
	this.threeObj.position.y = (opt.y ? opt.y:0.0) + this.boffy;
	this.threeObj.position.z = (opt.z ? opt.z:0.0);

	this.threeObj.scale.x = 2;
	this.threeObj.scale.y = 2;

	this.threeObj.renderOrder = 10;
	this.travelTo = null;

	this.lastStepTime = 0;
	this.speed = 50;

	this.health = 10;
	this.magic = 0;
}
BearObject.prototype.step = function(state) {
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
					this.travelTo.next.y = this.cell.y+1;//this.travelTo.next.y;
				}
				else if (dy < 0) {
					this.travelTo.next.y = this.cell.y-1;
				}
				else {
					this.travelTo.next.y = this.cell.y;
				}

				if ((this.travelTo.x == this.cell.x) && (this.travelTo.y == this.cell.y)) {
					this.travelTo = null;
				}

				else if (this.sceneManager.level.moveObject(this, this.cell, {x: this.travelTo.next.x, y: this.travelTo.next.y})) {
					this.cell = {x: this.travelTo.next.x, y: this.travelTo.next.y};
					this.threeObj.position.x = this.travelTo.next.x - this.boffx;
					this.threeObj.position.y = this.travelTo.next.y + this.boffy;
					
					if ((this.travelTo.x == this.cell.x) && (this.travelTo.y == this.cell.y)) {
						this.travelTo = null;
					}
				}
				else {
					this.travelTo = {x: this.cell.x+(-1+Math.floor(Math.random() * 3)), y: this.cell.y+(-1+Math.floor(Math.random() * 3))};

				}
			}
			else{
				this.travelTo.skip = false;
			}
		}
		else if (Math.floor(Math.random() * 25) == 1) {
			this.travelTo = {x: this.sceneManager.player.cell.x, y: this.sceneManager.player.cell.y};
		}
	}
	//this.threeObj.quaternion.copy(this.sceneManager.scene.camera.quaternion);
};
BearObject.prototype.onReady = function(sm) {
	this.sceneManager = sm;
	this.isReady = true;

	this.sceneManager.level.moveObject(this, {x: 0, y: 0}, this.cell);
};
BearObject.prototype.getObject = function() {
	return this.threeObj;
};
BearObject.prototype.render = function() {
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
			}
			this.anim["move"].tick++;
		}
		else {
			this.anim["move"] = {tick: 0, rotation: 0.02};
		}

	}
	else {
		this.threeObj.quaternion.copy(this.sceneManager.scene.camera.quaternion);
	}
};