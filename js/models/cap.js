import {GLTFLoader} from '../GLTFLoader.js'

export default class CapAmerica {
	
	cap = {
		isJumping:false,
		isRunning:false,
		isPalying:false,
		isWaiting:false,
		isShilded:false,
		
		aKeyPressed:false,
		dKeyPrassed:false,
		rightBound:-110,
		leftBound:110,
		
		delta:0.5,
		radius:0
	}
	
	constructor(){
		
		this.capTweens = new TWEEN.Group();
		this.playingTweens = new TWEEN.Group();
		this.runningTweens = new TWEEN.Group();
		
		//insert audio
	}
	
	async load(scene){
		var model;
		const loader = new GLTFLoader();
		loader.load('./models/captain_america/scene.gltf', function(gltf){
			console.log(gltf);
			model = gltf.scene;
			model.scale.set(15.0, 15.0, 15.0);
			model.rotateY(22);
			model.translateY(-1.6);
			model.translateZ(-2.6);
			model.name = 'CapAmerica';
			scene.add(model);
		}, function(xhr){
			console.log((xhr.loaded/xhr.total * 100) + "% loaded");
		}, function(error){
			console.log("[Cap Load Function]: An error occurred");
   		});
	}
	
	move(cmd, scene){
		if (cmd == 'a') scene.getObjectByName("CapAmerica").translateX(1.3);
		if (cmd == 'd') scene.getObjectByName("CapAmerica").translateX(-1.3);
	}
	
	jump(scene){
		var cap = scene.getObjectByName("CapAmerica");
		var start = { x: cap.position.x, y: cap.position.y, z: cap.position.z };
		var end = { x: cap.position.x, y: cap.position.y - 0.05, z: cap.position.z };
		var jumpTween = new TWEEN.Tween(start).to(end).delay(300);
		jumpTween.onUpdate(function(){
			cap.position.y = cap.position.y - 0.05;

		})
		var up = { x: cap.position.x, y: cap.position.y, z: cap.position.z };
		var down = { x: cap.position.x, y: cap.position.y + 0.005, z: cap.position.z };
		var retTween = new TWEEN.Tween(up).to(down);
		retTween.onUpdate(function(){
			cap.position.y = cap.position.y + 0.05;
		})
		jumpTween.start();
		retTween.start();

	}
	
}