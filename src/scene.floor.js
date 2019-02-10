function FloorObject(opt) {
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
	var tex = new THREE.TextureLoader().load('data/grass.png');
	//console.log(tex);
	//tex.repeat.set(0.25, 0.25);//1.0/128, 1.0/128)
	//tex.offset.y = 0.5;
	var mat = new THREE.MeshBasicMaterial( { transparent: true, map: tex } );//{ color: 0x5f5faf});//, side: THREE.DoubleSide } );
	this.threeObj = new THREE.Mesh(geo, mat); // player
	
	this.threeObj.position.x = this.cell.x;
	this.threeObj.position.y = this.cell.y;
	this.threeObj.position.z = 0.0;

	this.threeObj.scale.x = 1;
	this.threeObj.scale.y = 1;

	this.threeObj.renderOrder = -1;
	

}
FloorObject.prototype.step = function(state) {
	
};
FloorObject.prototype.setReady = function(state) {
	this.isReady = state;
};
FloorObject.prototype.getObject = function() {
	return this.threeObj;
};
FloorObject.prototype.setSceneManager = function(sm) {
	this.sceneManager = sm;
};
FloorObject.prototype.render = function() {

};