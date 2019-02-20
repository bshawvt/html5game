function SceneManager(invoker) {
	this.objects = [];
	this.objectsQueue = [];
	this.objectCount = 0;
	this.scene = invoker.scene;
	this.level = invoker.level;
	//console.log(invoker.scene);

	var geo = new THREE.BufferGeometry();
	var verts = [];
	//verts.push(-5.0, -1.0, 0.0); // p1
	//verts.push(5.0, -1.0, 0.0); // p2
	//this.levelWidth = 100; // no intentions on this value ever changing
	//this.levelHeight = 100;
	var len = (invoker.level.width+invoker.level.height)/2;
	for(var ix = 0; ix <= len; ix+=1) {

		verts.push(0.0, 	1.0 * ix, 0.0); // p1
		verts.push(0.0+len, 1.0 * ix, 0.0); // p2

		verts.push(1.0 * ix, 0.0, 0.0); // p3
		verts.push(1.0 * ix, 0.0+len, 0.0); // p4

	}
	var verts = new Float32Array(verts);
	geo.addAttribute('position', new THREE.BufferAttribute(verts, 3));
	var mat = new THREE.LineBasicMaterial( { color: 0xcecece } );
	this.map = new THREE.LineSegments(geo, mat); // map
	this.map.renderOrder = 0;
	//this.scene.add(this.map);
	this.map.position.x = 0.0;//1.0;
	this.map.position.y = 0.0;//-0.5;
	this.map.position.z = 0.0;//-0.5;
	//this.map.position:
	this.map.scale.x = 1;
	this.map.scale.y = 1;
	//this.map.scale.z = 5;

	this.player = null;
	this.add(new CursorObject());

}
// game specific

// core
SceneManager.prototype.add = function(obj, player) {
	
	if (player == true) {
		this.player = obj;
	}
	//obj.setSceneManager(this);
	obj.id = this.objectCount++;

	this.objectsQueue.push(obj);
	return obj;

};
SceneManager.prototype.remove = function(obj) {
	obj.deleted = true;
	this.objectsQueue.push(obj);
};
SceneManager.prototype.removeSceneObject = function(obj) {
	this.scene.remove(obj);
};

SceneManager.prototype.flush = function() {
	for(var i = 0; i < this.objectsQueue.length; i++)  {
		var obj = this.objectsQueue[i];
		if (obj.deleted == true) {
			for(var x = 0; x < this.objects.length; x++) {
				var del = this.objects[i];
				if (del.id == obj.id) {
					this.scene.remove(obj.getObject());
					this.objects.splice(i, 1);
					break;
				}
			}
		}
		else {
			this.scene.add(obj.getObject());
			this.objects.push(obj);
			obj.onReady(this);
		}
	}
	this.objectsQueue = [];
};
SceneManager.prototype.update = function(state) {
	for(var i = 0; i < this.objects.length; i++) {
		if (this.objects[i].isReady == true)
			this.objects[i].step(state);
	}
};
SceneManager.prototype.render = function(dt) {
	for(var i = 0; i < this.objects.length; i++) {
		if (this.objects[i].isReady == true)
			this.objects[i].render(dt);
	}
};