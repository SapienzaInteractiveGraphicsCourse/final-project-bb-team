import {GLTFLoader} from '../GLTFLoader.js'

export default class IronMan {
	
	constructor(){
		
		this.runningTweens = new TWEEN.Group();
	}
	
	load(scene){
		var loader = new GLTFLoader();
		loader.load('./models/iron_man_mark_46/scene.gltf', object => {
			this.mesh = new THREE.Mesh(
                new THREE.BoxGeometry(20, 30, 15),
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0})
            ).add(object.scene);
			this.mesh.name = "IronMan";
			this.mesh.scale.set(.03, .03, .03);
			this.mesh.rotateY(Math.PI/2);
			//this.mesh.translateY(-2);
			//this.mesh.translateZ(-4.5);
			//this.mesh.visible = true;
			this.init();
			scene.add(this.mesh);
		}, null, null);
	}
	
	init(){
	    this.bones();
	    // position bones
	   	this.body.position.y = -50;
		this.body.position.x = -160;
	    //this.spine.rotation.x = 0.0
	    //this.head.position.set(0, 0.37, 0)
	    //this.head.rotation.x = 0.1
	    //this.nose.position.y = 0.27
	    //this.L_arm.rotation.set(-4.0, 0.0, -1.5707960072844427)
	    //this.L_arm.children[0].rotation.set(0.5, 0.0, 0.5)
	    //this.L_arm.children[0].children[0].rotation.set(0.0, 0.0, 0.6)
	    //this.L_hand.rotation.set(0.0, 2.0, 0.0)
	    //this.R_arm.rotation.set(-0.5, 0.0, -1.570795870291479)
	    //this.R_arm.children[0].rotation.set(0.5, 0.0, 0.5)
	    //this.R_arm.children[0].children[0].rotation.set(0.0, 0.0, 0.6)
	    //this.R_hand.rotation.set(0.0, 2.0, 0.0)
        
	    this.run();	
	}	
	
	bones() {
		// retrieve bones
	    this.body = this.mesh.children[0].children[0];
		//this.spine = this.mesh.children[0].children[0].children[0].children[0].children[0].children[2];
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
		
		
		console.log(this.mesh.children[0].children[0].children[0].children[0].children[0]);
		//console.log(this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0]); 
		//console.log(this.mesh.children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[2]);
		
		
	    //this.spine = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[45].skeleton.bones[4];
	    //this.head = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[46].skeleton.bones[5]
	    //this.nose = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[45].skeleton.bones[7]
	    //this.mouth = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[45].skeleton.bones[8]
	    //this.L_arm = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[45].skeleton.bones[23]
	    //this.L_hand = this.L_arm.children[0].children[0].children[0]
	    //this.R_arm = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[45].skeleton.bones[37]
	    //this.R_hand = this.R_arm.children[0].children[0].children[0]
	    //this.L_hand = this.L_arm.children[0].children[0].children[0]
	    //this.L_leg = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[45].skeleton.bones[52]
	    //this.L_calf = this.L_leg.children[0]
	    //this.L_foot = this.L_calf.children[0]
	    //this.R_leg = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[45].skeleton.bones[56]
	    //this.R_calf = this.R_leg.children[0]
	    //this.R_foot = this.R_calf.children[0]
	    //this.tail = this.mesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[45].skeleton.bones[60]
	}	
		
	run(){
		
		//Body movement
		var meshTween1 = new TWEEN.Tween(this.body.position, this.runningTweens).to({x: this.body.position.x + 0.5}, 1000);
		var meshTween2 = new TWEEN.Tween(this.body.position, this.runningTweens).to({x: this.body.position.x - 0.5}, 1000);
		meshTween1.chain(meshTween2.chain(meshTween1));
		this.runningTweens.add(meshTween1);
		
		//Spine rotation
		var spineTween = new TWEEN.Tween(this.spine.rotation, this.runningTweens).to({x: 0.5}, 2000);
		this.runningTweens.add(spineTween);
		
		//Leg rotation
		var legTween1 = new TWEEN.Tween(this.L_hip.rotation, this.runningTweens).to({x:  this.L_hip.rotation.x - 0.4}, 1000);
		var legTween2 = new TWEEN.Tween(this.L_hip.rotation, this.runningTweens).to({x:  this.L_hip.rotation.x + 0.8}, 2000);
		var legTween3 = new TWEEN.Tween(this.L_hip.rotation, this.runningTweens).to({x:  this.L_hip.rotation.x}, 1000);
		legTween1.chain(legTween2.chain(legTween3.chain(legTween1)));
		this.runningTweens.add(legTween1);
		//legTween1.start();
		
		var legTween4 = new TWEEN.Tween(this.R_hip.rotation, this.runningTweens).to({x: this.R_hip.rotation.x + 0.4}, 1000);
		var legTween5 = new TWEEN.Tween(this.R_hip.rotation, this.runningTweens).to({x: this.R_hip.rotation.x - 0.8}, 2000);
		var legTween6 = new TWEEN.Tween(this.R_hip.rotation, this.runningTweens).to({x: this.R_hip.rotation.x}, 1000);
		legTween4.chain(legTween5.chain(legTween6.chain(legTween4)));
		this.runningTweens.add(legTween4);
		//legTween4.start();
		
		//Arm rotation
		var armTween1 = new TWEEN.Tween(this.L_shoulder.rotation, this.runningTweens).to({y: this.L_shoulder.rotation.y + 0.5}, 1000);
		var armTween2 = new TWEEN.Tween(this.L_shoulder.rotation, this.runningTweens).to({y: this.L_shoulder.rotation.y - 1.0}, 2000);
		var armTween3 = new TWEEN.Tween(this.L_shoulder.rotation, this.runningTweens).to({y: this.L_shoulder.rotation.y}, 1000);
		armTween1.chain(armTween2.chain(armTween3.chain(armTween1)));
		this.runningTweens.add(armTween1);
		//armTween1.start();
		
		var armTween4 = new TWEEN.Tween(this.R_shoulder.rotation, this.runningTweens).to({y: this.R_shoulder.rotation.y + 0.5}, 1000);
		var armTween5 = new TWEEN.Tween(this.R_shoulder.rotation, this.runningTweens).to({y: this.R_shoulder.rotation.y - 1.0}, 2000);
		var armTween6 = new TWEEN.Tween(this.R_shoulder.rotation, this.runningTweens).to({y: this.R_shoulder.rotation.y}, 1000);
		armTween4.chain(armTween5.chain(armTween6.chain(armTween4)));
		this.runningTweens.add(armTween4);
		//armTween4.start();
		this.startRunningTweens();
	}
	
	moveLeft(){
		var tween = new TWEEN.Tween(this.mesh.position).to( {x: this.mesh.position.x - 2.0}, 5).start()
	}
	
	moveRight(){
		var tween = new TWEEN.Tween(this.mesh.position).to( {x: this.mesh.position.x + 2.0}, 5).start();
	}
	
	jump(){
		var jumpTween1 = new TWEEN.Tween(this.mesh.position).to({y: this.mesh.position.y + 0.9}, 700).easing(TWEEN.Easing.Quadratic.Out);
    	var jumpTween2 = new TWEEN.Tween(this.mesh.position).to({y: this.mesh.position.y}, 700).easing(TWEEN.Easing.Quadratic.In);

    	jumpTween1.chain(jumpTween2);	

    	jumpTween1.start();
		
	}
	
	startRunningTweens(){
		//console.log(this.runningTweens.getAll());
		this.runningTweens.getAll().forEach(element => {
			//console.log(element);
			element.start();
		})	
		
	}
	
	update(){
		this.runningTweens.update();
	}
	/*move(cmd, scene){
		var cap = scene.getObjectByName("CapAmerica");
		var sideTween;
		
		if (cmd == 'a') 
			sideTween = new TWEEN.Tween(cap.position).to( {x: cap.position.x - 2.0}, 5);
			//cap.translateX(2.0);
		
		if (cmd == 'd') 
			sideTween = new TWEEN.Tween(cap.position).to( {x: cap.position.x + 2.0}, 5);
			//cap.translateX(-2.0);
		sideTween.start();
	}*/
	
	/*jump(scene){
		var cap = scene.getObjectByName("CapAmerica");

		var jumpTween1 = new TWEEN.Tween(cap.position).to({y: cap.position.y + 0.9}, 700).easing(TWEEN.Easing.Quadratic.Out);
        var jumpTween2 = new TWEEN.Tween(cap.position).to({y: cap.position.y}, 700).easing(TWEEN.Easing.Quadratic.In);

        jumpTween1.chain(jumpTween2);

        jumpTween1.start();

	}*/
	
}