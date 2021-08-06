import {GLTFLoader} from '../three.js-master/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from '../three.js-master/build/three.module.js'

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
		
		delta:1.5,
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
			model.scale.set(.005, .005, .005);
			model.name = 'CapAmerica';
			scene.add(model);
		}, function(xhr){
			console.log((xhr.loaded/xhr.total * 100) + "% loaded");
		}, function(error){
			console.log("[Cap Load Function]: An error occurred");
   		});
	}
	
}