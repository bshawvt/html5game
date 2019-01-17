function Game(invoker) {
	var self = this;
	this.camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);
	//this.camera = new THREE.OrthographicCamera(window.innerWidth / -25, window.innerWidth / 25, window.innerHeight / 25, window.innerHeight / -25, 0.1, 10);
	//this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
	//this.camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, -window.innerHeight, window.innerHeight, -1000, 1000);
	this.camera.up = new THREE.Vector3(0, 0, 1);
	
	

	this.camera.position.x = -150;//-300;//-window.innerWidth / 2;
	this.camera.position.y = -150;//-300;//-window.innerHeight / 2;
	this.camera.position.z = 15;//125;//300;
	//this.camera.position.set(20, 20, 20);
	//this.camera.rotation.order = 'XYZ';


	

	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	//this.camera.rotation.z = 0 * Math.PI / 180;
	//this.camera.rotation.x = 45 * Math.PI / 180;
	//this.camera.rotation.z = 0 * Math.PI / 180;
	//this.camera.rotation.y = Math.atan( - 1 / Math.sqrt( 2 ) );
	//this.camera.rotation.y = Math.PI / 4;
	

	this.renderer = new THREE.WebGLRenderer({canvas: invoker.components.canvas});
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.setClearColor(0xffffff);

	this.scene = new THREE.Scene();

	var geo = new THREE.BufferGeometry();
	var verts = [];
	//verts.push(-5.0, -1.0, 0.0); // p1
	//verts.push(5.0, -1.0, 0.0); // p2
	this.levelWidth = 50; // no intentions on this value ever changing
	this.levelHeight = 50;
	var len = this.levelWidth+this.levelHeight;
	for(var ix = 0; ix <= len; ix+=2) {

		verts.push(0.0, 	1.0 * ix, 0.0); // p1
		verts.push(0.0+len, 1.0 * ix, 0.0); // p2

		verts.push(1.0 * ix, 0.0, 0.0); // p3
		verts.push(1.0 * ix, 0.0+len, 0.0); // p4

	}
	var verts = new Float32Array(verts);
	geo.addAttribute('position', new THREE.BufferAttribute(verts, 3));
	var mat = new THREE.LineBasicMaterial( { color: 0x8f8f8f } );
	this.map = new THREE.LineSegments(geo, mat); // map
	this.scene.add(this.map);
	this.map.position.x = 0.0;//1.0;
	this.map.position.y = 0.0;//-0.5;
	//this.map.position:
	this.map.scale.x = 1;
	this.map.scale.y = 1;
	//this.map.scale.z = 5;
	console.log(this.map)


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


	geo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
	geo.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
	var tex = new THREE.TextureLoader().load('data/player.png');
	console.log(tex);
	tex.repeat.set(0.25, 0.25);//1.0/128, 1.0/128)
	tex.offset.y = 0.5;
	var mat = new THREE.MeshBasicMaterial( { transparent: true, map: tex } );//{ color: 0x5f5faf});//, side: THREE.DoubleSide } );
	this.player = new THREE.Mesh(geo, mat); // player
	
	this.player.position.x = 0.0;
	this.player.position.y = 0.0;
	this.player.position.z = 0.0;

	this.player.scale.x = 2;
	this.player.scale.y = 2;
	//this.player.scale.z = 1;
	//this.player.computeBounding
	this.scene.add(this.player);

	var geo = new THREE.BufferGeometry();
	geo.addAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
	geo.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
	var tex = new THREE.TextureLoader().load('data/player.png');
	tex.repeat.set(0.25, 0.25);//1.0/128, 1.0/128)
	tex.offset.y = 0.75;
	var mat = new THREE.MeshBasicMaterial( { transparent: true, map: tex } );
	this.enemy = new THREE.Mesh(geo, mat); // enemy
	this.scene.add(this.enemy);
	this.enemy.scale.x = 2;
	this.enemy.scale.y = 2;
	//this.enemy.scale.z = 30;

	this.enemy.position.x = 16.0;//1;
	this.enemy.position.y = 16.0;//25*5;
	this.enemy.position.z = 0.0;//25*5;

	window.addEventListener('resize', function() {
		self.onResize(invoker);
	});

	this.onResize(invoker);

	this.level = [];
	for(var lx = 0; lx < this.levelWidth; lx++) {
		this.level[lx] = [];
		for(var ly = 0; ly < this.levelHeight; ly++) {
			this.level[lx][ly] = {solid: false, objects: []};
		}
	}
	console.log(this.level);
	console.log(this);
}
Game.prototype.update = function(dt) {
	//this.obj.rotation.x += 0.01;
	//this.obj.rotation.y += 0.01;
	//this.obj.rotation.z += 0.01;

	// get player input
	if (Controller.getMouseState(Input.MOUSE_LEFT)) {
		//console.log(this.camera);
		var m2d = Controller.getMousePosition();
		//console.log(m2d);
		var m3d = {x: (m2d.x/window.innerWidth) * 2 - 1, y: -(m2d.y/window.innerHeight) * 2 + 1};
		var p0 = new THREE.Vector3(m3d.x, m3d.y, 0.0).unproject(this.camera);
		var p1 = new THREE.Vector3(m3d.x, m3d.y, 1.0).unproject(this.camera);
		
		var t = -p0.z / (p1.z - p0.z);
		var p2 = {x: p0.x + (p1.x-p0.x) * t, y: p0.y + (p1.y-p0.y) * t, z: 0.0};
		//p2.add()


		console.log(p2);
		//var p2 = new THREE.Vector3()
		//console.log(m3d.x, m3d.y);
	}
	var boffx = 0;
	var boffy = 0;
	if (Controller.getButtonState(Input.KEY_A)) {
		if (this.player.position.x-2 >= 0)
			this.player.position.x -= 2;// + boffx;

		//this.camera.position.x -= 50;
	}
	if (Controller.getButtonState(Input.KEY_D)) {
		if (this.player.position.x+2 < 100)
		this.player.position.x += 2;// + boffx;
		//this.camera.position.x += 50;
	}
	if (Controller.getButtonState(Input.KEY_W)) {
		if (this.player.position.y+2 < 100)
		this.player.position.y += 2;// + boffy;
		//this.camera.position.y -= 50;
	}
	if (Controller.getButtonState(Input.KEY_S)) {
		if (this.player.position.y-2 >= 0)
		this.player.position.y -= 2;// + boffy;
		//this.camera.position.y += 50;
	}
	
	this.camera.position.x = this.player.position.x-20;
	this.camera.position.y = this.player.position.y-20;
	//this.camera.position.z = this.player.position.z;


	// update logic
	this.camera.lookAt(this.player.position);
	this.player.quaternion.copy(this.camera.quaternion);
	this.enemy.quaternion.copy(this.camera.quaternion);
	if (Math.floor(Math.random() * 10) == 1) {
		/*if (Math.floor(Math.random() * 10) == 1)
			if (this.enemy.position.x+2 < 100)
				this.enemy.position.x += 2;

		if (Math.floor(Math.random() * 10) == 2)
			if (this.enemy.position.x-2 >= 0)
				this.enemy.position.x -= 2;

		if (Math.floor(Math.random() * 10) == 3)
			if (this.enemy.position.y+2 < 100)
				this.enemy.position.y += 2;

		if (Math.floor(Math.random() * 10) == 4)
			if (this.enemy.position.y-2 >= 0)
				this.enemy.position.y -= 2;*/
	}
	/*
	if (this.canEnemyAttack(player)) {
	
	}
	*/
};
Game.prototype.render = function(dt) {
	this.renderer.render(this.scene, this.camera);
};
Game.prototype.onResize = function(e) {
	
	e.components.canvas.width = window.innerWidth;
	e.components.canvas.height = window.innerHeight;

	this.renderer.setSize(window.innerWidth, window.innerHeight);
	
	//var viewSize = 500;//window.innerWidth * window.innerHeight;
	this.camera.aspect = window.innerWidth/window.innerHeight;
	
	/*this.camera.left = 		-this.camera.aspect * viewSize / 2;//-window.innerWidth;// / 2;
	this.camera.right = 	this.camera.aspect * viewSize / 2;//window.innerWidth;// / 2;
	this.camera.top = 		-viewSize / 2;//-window.innerHeight;// / 2;
	this.camera.bottom = 	viewSize / 2;//window.innerHeight;// / 2;*/
	this.camera.updateProjectionMatrix();

};