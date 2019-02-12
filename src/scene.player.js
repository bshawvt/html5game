function PlayerObject() {
	this.sceneManager = null; // SceneManager ref set by SceneManager.add
	this.cell = {x: 0, y:0}; // reference to location in SceneManager.level
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
	
	this.threeObj.position.x = 0.0;// - this.boffx;
	this.threeObj.position.y = 0.0;// + this.boffy;
	this.threeObj.position.z = 0.25;

	this.threeObj.scale.x = 2;
	this.threeObj.scale.y = 2;

	this.threeObj.renderOrder = 10;



}
PlayerObject.prototype.step = function(state) {

	if (Controller.getMouseState(Input.MOUSE_LEFT) && state.active==true) {
		if (canMove == false) { return; }

		var m2d = Controller.getMousePosition();

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
			if (this.sceneManager.level.moveObject(this, this.cell, {x: nx, y: ny})) {
				this.cell = {x:nx, y:ny};
				this.threeObj.position.x = nx - this.boffx;//0.2;
				this.threeObj.position.y = ny + this.boffy;//1;
			}
			//console.log(this);

		}
		//console.log(nx, ny);

		//this.level[this.player.position.x + boffx][this.player.position.x - boffy].objects.push(this.player);

		//var p2 = new THREE.Vector3()
		//console.log(m3d.x, m3d.y);
	} else {
		canMove = true;
	}
	this.threeObj.quaternion.copy(this.sceneManager.scene.camera.quaternion);
};
PlayerObject.prototype.setReady = function(state) {
	this.isReady = state;
};
PlayerObject.prototype.getObject = function() {
	return this.threeObj;
};
PlayerObject.prototype.setSceneManager = function(sm) {
	this.sceneManager = sm;
};
PlayerObject.prototype.render = function() {

};