function BearObject(opt) {
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
	var tex = new THREE.TextureLoader().load('data/player.png');
	tex.repeat.set(0.25, 0.25);
	tex.offset.y = 0.75;
	var mat = new THREE.MeshBasicMaterial( { transparent: true, map: tex } );
	this.threeObj = new THREE.Mesh(geo, mat); // enemy
	
	this.threeObj.position.x = (opt.x ? opt.x:0.0);// - this.boffx;
	this.threeObj.position.y = (opt.y ? opt.y:0.0);// + this.boffy;
	this.threeObj.position.z = (opt.z ? opt.z:0.01);

	this.threeObj.scale.x = 2;
	this.threeObj.scale.y = 2;

	

}
BearObject.prototype.step = function() {
	this.threeObj.quaternion.copy(this.sceneManager.scene.camera.quaternion);
};
BearObject.prototype.setReady = function(state) {
	this.isReady = state;
};
BearObject.prototype.getObject = function() {
	return this.threeObj;
};
BearObject.prototype.setSceneManager = function(sm) {
	this.sceneManager = sm;
};
BearObject.prototype.render = function() {

};