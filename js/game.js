import {Car, PoliceCar, Taxi, Shield} from './models/objects.js'
import CapAmerica from './models/cap.js'
import * as THREE from './three.js-master/build/three.module.js'

/*class GameSettings {
	
	settings = {
		speed:1,
		initSpeed:1,
		targetSpeed:.0001,
		incrementSpeedByDistance:.0001,
		incrementSpeedByLevel:.005,
		distanceForSpeedUpdate:100,
		speedLastUpdate:0,
		maxSpeed:30,
		
		rotationSpeed:0,
		ratioRotationSpeed:.05,
		maxRotation:false,
		maxRotationSpeed:12,
		capSpeed:1,
		ratioCapSpeed:.0000001,
		
		distance:0,
		ratioSpeedDistance:.25,
		energy:100,
		
		level:0,
		levelLastUpdate:0,
		distanceForLevelUpdate:1000,
		
		streetRadius:800,
		streetLength:1000,
		yPosition:615,
		
		cameraOffsetX:100.87,
		
		tesseractValue:5,
		carValue:2,
		taxiValue:3,
		policeValue:4,
		
		tesseractSpawn:false,
		carSpawn:false,
		taxiSpawn:false,
		policeSpawn:false,
		shieldSpawn:false,
		
		nTesseract:30,
		nCar:10,
		nTaxi:15,
		nPoliceCar:20,
		nShield:2,
		
		minTesseract:15,
		minCar:5,
		minTaxi:7,
		minPoliceCar:10,
		minShield:1,
		
		tesseractArray:[],
		carArray:[],
		taxiArray:[],
		policeCarArray:[],
		shieldArray:[],
		
		collidableArray:[],
		
		title: 'Tesseract Hunt',
		
		status: 'init'
	}
}

export default class Game {
	
	game = new GameSettings().settings;
	
	level = document.getElementById('level');
	distance = document.getElementById('distance');
	energy = document.getElementById('energy');
	
	streetDistance = document.getElementById('distValue');
	streetLevel = document.getElementById('levelValue');
	streetEnergy = document.getElementById('energyValue');
	
	aKey = document.getElementById('aKey');
	dKey = document.getElementById('dKey');
	spaceKey = document.getElementById('spaceKey');
	
	constructor(scene, camera, renderer, tesseract){
		
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.tesseract = tesseract;
		
		//add audios
		
		new CapAmerica().load(this.scene).then((model) => {this.capModel = model});
		new Car().load(this.scene).then((model) => {this.carModel = model});
		new PoliceCar().load(this.scene).then((model) => {this.policeModel = model});
		new Taxi().load(this.scene).then((model) => {this.taxiModel = model});
		new Shield().load(this.scene).then((model) => {this.shieldModel = model});
		
		this.worldMesh = new THREE.Object3D();
		this.worldMesh.name = 'World';
		this.friendMesh = new THREE.Object3D();
		this.friendMesh.name = 'Friend';
		this.enemyMesh = new THREE.Object3D();
		this.enemyMesh.name = 'Enemy';
		
		new THREE.TextureLoader().load('./textures/street.jpeg', (texture) => {
			this.worldTexture = texture;
			this.init();
			
			document.addEventListener('keydown', function(event){
				switch (event.key){
					case 'Enter':
						this.play();
						break;
					case 'a':
						this.aKey.style.transform = 'translateX(3px)';
						break;
					case 'd':
						this.dKey.style.transform = 'translateX(3px)';
						break;
					case ' ':
						this.spaceKey.style.transform = 'translateY(2px)';
						break;
					default:
						break
				}
			}, false);
			
			document.addEventListener('keyup', function(event){
				switch (event.key){
					case 'a':
						this.aKey.style.transform = 'translateX(0px)';
						break;
					case 'd':
						this.dKey.style.transform = 'translateX(0px)';
						break;
					case ' ':
						this.spaceKey.style.transform = 'translateY(0px)';
						break;
					default:
						break;
				}
			})
		})
		
	}
	
	init(){
		//street
		var geometry = new THREE.CylinderGeometry(this.game.streetRadius, this.game.streetRadius, this.game.streetLength, 75);
		var material = new THREE.MeshBasicMaterial({ map: this.worldTexture });
		var street = new THREE.Mesh(geometry, material);
		street.rotation.x = Math.PI/2;
		street.name = 'Street';
		this.worldMesh.add(street);
		
		this.wordlMesh.add(this.friendMesh);
		this.worldMesh.add(this.enemyMesh);
	}
	
	play(){
		
		if (this.capModel.cap.isJumping) return;
			
		if (this.game.status == 'playing' || this.game.status == 'busy') return;
		
		else if (this.game.status == 'init'){
			this.game.status = 'busy';
			this.scene.background = null;
			this.scene.add(this.worldMesh);
			this.level.style.visibility = 'visible';
			this.distance.style.visibility = 'visible';
			this.energy.style.visibility = 'visible';
			this.renderer.setClearColor(Colors.blue, 1); 
		}
		
		else if (this.game.status == 'waiting') this.reset();
		
		this.capModel.playPose();
		
		this.camera.position.set(100, 600, -600);
		new TWEEN.Tween(this.camera.position).to({ x:this.game.cameraOffsetX, y:this.game.streetRadius + 68, z: 0 }, 3000).onUpdate(() =>{
			this.camera.lookAt(this.capModel.mesh.position);
		}).start();
		this.capModel.play(() => {
			this.game.status = 'playing';
		}, 2400);
		//this.gameAudio.play()
		
		this.spawnTesseract(this.game.nTesseract);
		this.spawnCar(this.game.nCar);
		this.spawnPoliceCar(this.game.nPoliceCar);
		this.spawnTaxi(this.game.nTaxi);
		this.spawnShield(this.game.nShield); 
	}
	
	reset(){
		this.game = new GameSettings().settings;
		this.game.status = 'busy';
		this.streetDistance.innerHTML = this.game.distance;
		this.streetLevel.innerHTML = this.game.level;
		this.streetEnergy.innerHTML = this.game.energy;
		this.title.innerHTML = this.game.title;
		this.enemyMesh.children.length = 0;
		this.friendMesh.children.length = 0;
		this.worldMesh.rotation.z = 0;
		this.capModel.mesh.position.z = 0;
	}
	
	spawnTesseract(n){
		this.randomGenerator(this.game.tesseractArray, n, 'Tesseract');
	}
	
	spawnCar(n){
		this.randomGenerator(this.game.carArray, n, 'Car');
	}
	
	spawnPoliceCar(n){
		this.randomGenerator(this.game.policeCarArray, n, 'PoliceCar');
	}
	
	spawnTaxi(n){
		this.randomGenerator(this.game.taxiArray, n, 'Taxi');
	}
	
	spawnShield(n){
		this.randomGenerator(this.game.shieldArray, n, 'Shield');
	}
		
}*/

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
		
		this.worldMesh = new THREE.Object3D();
		this.worldMesh.name = "World";
		
		var worldTexture;
		var loader = new THREE.TextureLoader();
		loader.load('../textures/street.jpeg', (texture) => {
			this.worldTexture = texture;
			
		});
	}
	
	init(){
		
		var geometry = new THREE.CylinderGeometry(2.8, 2.8, 15, 50, 10);
		var material = new THREE.MeshBasicMaterial({map: this.worldTexture});
		var street = new THREE.Mesh(geometry, material);
		street.name = 'Street';
		
		street.position.y = -4.5;
		street.rotation.z = Math.PI/2;
		this.worldMesh.add(street);
		this.scene.add(street); 
		
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