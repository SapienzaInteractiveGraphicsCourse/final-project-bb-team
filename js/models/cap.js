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
			model.scale.set(10.0, 10.0, 10.0);
			model.rotateY(22);
			model.translateY(-1.6);
			model.translateZ(-2.8);
			model.name = 'CapAmerica';
			scene.add(model);
		}, function(xhr){
			console.log((xhr.loaded/xhr.total * 100) + "% loaded");
		}, function(error){
			console.log("[Cap Load Function]: An error occurred");
   		});
	}
	
	move(cmd, scene){
		var cap = scene.getObjectByName("CapAmerica");

		if (cmd == 'a') {
			cap.translateX(1.3);
		}
		if (cmd == 'd') {
			cap.translateX(-1.3);
		}
	}
	
	jump(scene){
		var cap = scene.getObjectByName("CapAmerica");

		var jumpTween1 = new TWEEN.Tween(cap.position).to({y: cap.position.y + 0.9}, 700).easing(TWEEN.Easing.Quadratic.Out);
        var jumpTween2 = new TWEEN.Tween(cap.position).to({y: cap.position.y}, 700).easing(TWEEN.Easing.Quadratic.In);

        jumpTween1.chain(jumpTween2);

        jumpTween1.start();

	}
	
}