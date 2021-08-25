import {Car, PoliceCar, Taxi, Shield} from './models/objects.js'
import CapAmerica from './models/cap.js'

class GameSettings {
	settings = {
		distance:0,
		//distanceForSpeedUpdate:50
	}
}

export default class Game {
	
	game = new GameSettings().settings;
	//distVal = document.getElementById("distValue");

	
	constructor(scene, camera, renderer, tesseract){
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.tesseract = tesseract;
		//this.capamerica = capamerica;
		
		this.worldMesh = new THREE.Object3D();
		this.worldMesh.name = "World";
		
		var worldTexture;
		var loader = new THREE.TextureLoader();
		loader.load('../textures/street.jpeg', (texture) => {
			this.worldTexture = texture;
			
		});

	}
	
	init(){

		//this.renderer.render(this.scene, this.camera);
		
		var geometry = new THREE.CylinderGeometry(3.5, 3.5, 18, 50, 10);
		var material = new THREE.MeshBasicMaterial({map: this.worldTexture});
		var street = new THREE.Mesh(geometry, material);
		street.name = 'Street';
		
		street.position.y = -6.5;
		street.rotation.z = Math.PI/2;
		this.worldMesh.add(street);
		this.scene.add(street);
		

		//this.camera.position.y = 3;
		//this.camera.position.z = 7;
		
		//this.distanceForSpeedUpdate = 50
		//var distance = 0;
		this.play();
	}
	
	play(){
		//console.log(this.distVal.getAttribute('value'));
		var game = new GameSettings().settings;
		var str = this.scene.getObjectByName('Street');
		var start = { x: str.position.x, y: str.position.y, z: str.position.z, rotation: 0};
		var end = { x: str.position.x, y: str.position.y, z: str.position.z, rotation: 20};
		var tween = new TWEEN.Tween(start).to(end, 500).repeat(Infinity);
		tween.onUpdate(function(){
			if (str) str.rotateOnWorldAxis(new THREE.Vector3(1,0,0), 0.0001);
			game.distance += 5;
			document.getElementById("distValue").innerHTML = game.distance;

			
		});
		tween.start();
		
		
	}
}