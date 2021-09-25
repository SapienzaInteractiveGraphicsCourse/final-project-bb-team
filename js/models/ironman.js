import {GLTFLoader} from '../GLTFLoader.js'

export default class IronMan {

	ironman = {

        isJumping: false,
        vertices:[]
    }
	
	constructor(){
		
		this.runningTweens = new TWEEN.Group();
		this.jumpTweens = new TWEEN.Group();
	}
	
	async load(scene, callback){
		var loader = new GLTFLoader();
		loader.load('./models/iron_man_mark_46/scene.gltf', object => {
			this.mesh = new THREE.Mesh(
                new THREE.BoxGeometry(50, 150, 45),
                new THREE.MeshBasicMaterial({wireframe: true, color: 0xff0000})
                //new THREE.MeshBasicMaterial({opacity: 0.5, transparent: true, color: 0xff0000})
            ).add(object.scene);

            this.mesh.geometry.computeBoundingBox();
            //this.mesh.geometry.computeBoundingSphere();

			this.mesh.name = "IronMan";
			this.mesh.scale.set(.06, .06, .06);
			this.mesh.position.y = 6;
			this.mesh.position.z = 4.6;
			this.mesh.rotateY(Math.PI/2);
			this.mesh.visible = false;
			this.init();

			//this.ironman.vertices = this.adjustVertices(this.mesh.geometry.attributes.position.array);

			scene.add(this.mesh);
			callback(this.mesh);
		}, null, null);
	}


	// adjustVertices(arr){
	// 	//var vertices = new Array(arr.length/9);
	// 	var vertices = new Array(8);
	// 	var vertex = new THREE.Vector3();
	// 	var start, end;
	// 	for (var i=0; i<8; i++){
	// 		start = 3*i;
	// 		end = start + 3;
	// 		vertices[i] = arr.slice(start, end);
	//   	}
  
 //  		//console.log(vertices[0]);
 //  		return vertices;
 // 	}

	
	init(){
	    this.bones();
	    this.run();	
	}	
	
	bones() {
		// retrieve bones
	    this.body = this.mesh.children[0].children[0];
		this.spine = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[7];
		
		this.L_shoulder = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[11];
		this.R_shoulder = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[42];
		this.L_ankle = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[80];
		this.R_ankle = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[71];
		this.L_elbow = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[12];
		this.R_elbow = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[43];
	    this.L_wrist = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[15];
	    this.R_wrist = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[46];
		this.L_hip = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[78];
		this.R_hip = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[69];
		this.L_knee = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[79];
		this.R_knee = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[70];
		
		this.head = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2].skeleton.bones[39];
	}	
		
	run(){
		
		//Body movement
		var meshTween1 = new TWEEN.Tween(this.body.position, this.runningTweens).to({x: this.body.position.x + 0.5}, 300);
		var meshTween2 = new TWEEN.Tween(this.body.position, this.runningTweens).to({x: this.body.position.x - 0.5}, 300);
		meshTween1.chain(meshTween2.chain(meshTween1));
		this.runningTweens.add(meshTween1);
		
		//Spine rotation
		var spineTween = new TWEEN.Tween(this.spine.rotation, this.runningTweens).to({x: 0.5}, 600);
		this.runningTweens.add(spineTween);

		//Spine rotation
		var spineTween1 = new TWEEN.Tween(this.spine.rotation, this.runningTweens).to({z: this.spine.rotation.z + 0.2}, 300);
		var spineTween2 = new TWEEN.Tween(this.spine.rotation, this.runningTweens).to({z: this.spine.rotation.z - 0.1}, 600);
		var spineTween3 = new TWEEN.Tween(this.spine.rotation, this.runningTweens).to({z: this.spine.rotation.z}, 300);
		spineTween1.chain(spineTween2.chain(spineTween3.chain(spineTween1)));
		this.runningTweens.add(spineTween1);


		//Head rotation
		var headTween1 = new TWEEN.Tween(this.head.rotation, this.runningTweens).to({z: this.head.rotation.z + 0.4}, 300);
		var headTween2 = new TWEEN.Tween(this.head.rotation, this.runningTweens).to({z: this.head.rotation.z - 0.4}, 600);
		var headTween3 = new TWEEN.Tween(this.head.rotation, this.runningTweens).to({z: this.head.rotation.z}, 300);
		headTween1.chain(headTween2.chain(headTween3.chain(headTween1)));
		this.runningTweens.add(headTween1);

		
		//Leg rotation
		var legTween1 = new TWEEN.Tween(this.L_hip.rotation, this.runningTweens).to({x: this.L_hip.rotation.x - 0.3}, 300);
		var legTween2 = new TWEEN.Tween(this.L_hip.rotation, this.runningTweens).to({x: this.L_hip.rotation.x + 0.6}, 600);
		var legTween3 = new TWEEN.Tween(this.L_hip.rotation, this.runningTweens).to({x: this.L_hip.rotation.x}, 300);
		legTween1.chain(legTween2.chain(legTween3.chain(legTween1)));
		this.runningTweens.add(legTween1);
		var legTween4 = new TWEEN.Tween(this.R_hip.rotation, this.runningTweens).to({x: this.R_hip.rotation.x + 0.3}, 300);
		var legTween5 = new TWEEN.Tween(this.R_hip.rotation, this.runningTweens).to({x: this.R_hip.rotation.x - 0.6}, 600);
		var legTween6 = new TWEEN.Tween(this.R_hip.rotation, this.runningTweens).to({x: this.R_hip.rotation.x}, 300);
		legTween4.chain(legTween5.chain(legTween6.chain(legTween4)));
		this.runningTweens.add(legTween4);

		//Knee rotation
		var legTween7 = new TWEEN.Tween(this.L_knee.rotation, this.runningTweens).to({x: this.L_knee.rotation.x + 0.4}, 300);
		var legTween8 = new TWEEN.Tween(this.L_knee.rotation, this.runningTweens).to({x: this.L_knee.rotation.x - 0.8}, 600);
		var legTween9 = new TWEEN.Tween(this.L_knee.rotation, this.runningTweens).to({x: this.L_knee.rotation.x}, 300);
		legTween7.chain(legTween8.chain(legTween9.chain(legTween7)));
		this.runningTweens.add(legTween7);

		var legTween10 = new TWEEN.Tween(this.R_knee.rotation, this.runningTweens).to({x: this.R_knee.rotation.x - 0.8}, 300);
		var legTween11 = new TWEEN.Tween(this.R_knee.rotation, this.runningTweens).to({x: this.R_knee.rotation.x + 0.4}, 600);
		var legTween12 = new TWEEN.Tween(this.R_knee.rotation, this.runningTweens).to({x: this.R_knee.rotation.x}, 300);
		legTween10.chain(legTween11.chain(legTween12.chain(legTween10)));
		this.runningTweens.add(legTween10);

		
		//Arm rotation
		var armTween1 = new TWEEN.Tween(this.L_shoulder.rotation, this.runningTweens).to({y: this.L_shoulder.rotation.y + 0.4}, 300);
		var armTween2 = new TWEEN.Tween(this.L_shoulder.rotation, this.runningTweens).to({y: this.L_shoulder.rotation.y - 0.8}, 600);
		var armTween3 = new TWEEN.Tween(this.L_shoulder.rotation, this.runningTweens).to({y: this.L_shoulder.rotation.y}, 300);
		armTween1.chain(armTween2.chain(armTween3.chain(armTween1)));
		this.runningTweens.add(armTween1);
		var armTween4 = new TWEEN.Tween(this.R_shoulder.rotation, this.runningTweens).to({y: this.R_shoulder.rotation.y + 0.4}, 300);
		var armTween5 = new TWEEN.Tween(this.R_shoulder.rotation, this.runningTweens).to({y: this.R_shoulder.rotation.y - 0.8}, 600);
		var armTween6 = new TWEEN.Tween(this.R_shoulder.rotation, this.runningTweens).to({y: this.R_shoulder.rotation.y}, 300);
		armTween4.chain(armTween5.chain(armTween6.chain(armTween4)));
		this.runningTweens.add(armTween4);

		//Elbow rotation
		var armTween7 = new TWEEN.Tween(this.L_elbow.rotation, this.runningTweens).to({x: this.L_elbow.rotation.x - 1.2}, 300);
		var armTween8 = new TWEEN.Tween(this.L_elbow.rotation, this.runningTweens).to({x: this.L_elbow.rotation.x + 0.6}, 600);
		var armTween9 = new TWEEN.Tween(this.L_elbow.rotation, this.runningTweens).to({x: this.L_elbow.rotation.x}, 300);
		armTween7.chain(armTween8.chain(armTween9.chain(armTween7)));
		this.runningTweens.add(armTween7);
		var armTween10 = new TWEEN.Tween(this.R_elbow.rotation, this.runningTweens).to({x: this.R_elbow.rotation.x + 0.6}, 300);
		var armTween11 = new TWEEN.Tween(this.R_elbow.rotation, this.runningTweens).to({x: this.R_elbow.rotation.x - 1.2}, 600);
		var armTween12 = new TWEEN.Tween(this.R_elbow.rotation, this.runningTweens).to({x: this.R_elbow.rotation.x}, 300);
		armTween10.chain(armTween11.chain(armTween12.chain(armTween10)));
		this.runningTweens.add(armTween10);


		this.startRunningTweens();
	}
	
	moveLeft(){
		var tween = new TWEEN.Tween(this.mesh.position).to( {x: this.mesh.position.x - 2.0}, 5).start()
	}
	
	moveRight(){
		var tween = new TWEEN.Tween(this.mesh.position).to( {x: this.mesh.position.x + 2.0}, 5).start();
	}
	
	jump(){

		this.ironman.isJumping = true;
        
        var jumpTween1 = new TWEEN.Tween(this.mesh.position, this.jumpTweens).to({y: this.mesh.position.y + 1.3}, 400).easing(TWEEN.Easing.Quadratic.Out);
        var jumpTween2 = new TWEEN.Tween(this.mesh.position, this.jumpTweens).to({y: this.mesh.position.y}, 400).easing(TWEEN.Easing.Quadratic.In)
	        .onComplete(() => {
	                this.ironman.isJumping = false;
	            })
        jumpTween1.chain(jumpTween2);
        
        this.jumpTweens.add(jumpTween1);
        this.startJumpTweens();

	}

	
	startRunningTweens(){
		//console.log(this.runningTweens.getAll());
		this.runningTweens.getAll().forEach(element => {
			element.start();
		})	
		
	}

	startJumpTweens(){
		this.jumpTweens.getAll().forEach(element => {
			element.start();
		});
	}
	
	update(){
		this.runningTweens.update();
		this.jumpTweens.update();
	}
	
}