function HighlightObject(opt) {
	if (opt===undefined) {
		opt = {};
	}
	this.sceneManager = null; // SceneManager ref set by SceneManager.add
	this.cell = {x: opt.x?opt.x:0, y:opt.y?opt.y:0}; // reference to location in SceneManager.level
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
	//console.log(tex);
	//tex.repeat.set(0.25, 0.25);//1.0/128, 1.0/128)
	//tex.offset.y = 0.5;
	var mat = new THREE.MeshBasicMaterial({color: 0xf79696, opacity: 0.0});//, side: THREE.DoubleSide } );
	this.threeObj = new THREE.Mesh(geo, mat); // player
	
	this.threeObj.position.x = this.cell.x;
	this.threeObj.position.y = this.cell.y;
	this.threeObj.position.z = 0.0;

	this.threeObj.scale.x = 1;
	this.threeObj.scale.y = 1;

	this.threeObj.renderOrder = 1;

	this.hasClicked = false;
	this.color = 0;

}
HighlightObject.prototype.step = function(state) {
	var m2d = Controller.getMousePosition();

	var m3d = {x: (m2d.x/window.innerWidth) * 2 - 1, y: -(m2d.y/window.innerHeight) * 2 + 1};
	var p0 = new THREE.Vector3(m3d.x, m3d.y, 0.0).unproject(this.sceneManager.scene.camera);
	var p1 = new THREE.Vector3(m3d.x, m3d.y, 1.0).unproject(this.sceneManager.scene.camera);
	
	var t = -p0.z / (p1.z - p0.z);
	var p2 = {x: p0.x + (p1.x-p0.x) * t, y: p0.y + (p1.y-p0.y) * t, z: 0.0};

	this.hasClicked = true;

	var nx = Math.floor(p2.x);
	var ny = Math.floor(p2.y);
	if ((nx >= 0 && nx < this.sceneManager.level.width) && (ny >= 0 && ny < this.sceneManager.level.height)) {
		
		this.threeObj.position.x = nx;
		this.threeObj.position.y = ny;

		if (this.sceneManager.level.cells[nx][ny].solid == false) {
			if (this.color == 1) {
				this.color = 0;
				this.threeObj.material.color.r = 0.580;
				this.threeObj.material.color.g = 0.960;
				this.threeObj.material.color.b = 0.580;
				this.threeObj.material.needsUpdate = true;
			}
		}
		else {
			if (this.color == 0) {
				this.color = 1;
				this.threeObj.material.color.r = 0.960;
				this.threeObj.material.color.g = 0.580;
				this.threeObj.material.color.b = 0.580;
				this.threeObj.material.needsUpdate = true;
			}
		};
		var pcell = this.sceneManager.player.cell;
		var to1 = Math.floor((nx * nx) + (ny * ny));
		var to2 = Math.floor((pcell.x * pcell.x) + (pcell.y * pcell.y));
		console.log(to1, to2, to1-to2);


		//this.sceneManager.player.cell.x;// = 0.0;

		//if (Controller.getMouseState(Input.MOUSE_LEFT) && state.active==true) {
		//	console.log(this.sceneManager.player);
		//}

	}
	
};
HighlightObject.prototype.setReady = function(state) {
	this.isReady = state;
};
HighlightObject.prototype.getObject = function() {
	return this.threeObj;
};
HighlightObject.prototype.setSceneManager = function(sm) {
	this.sceneManager = sm;
};
HighlightObject.prototype.render = function() {

};