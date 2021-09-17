import {Car, PoliceCar, Taxi, Shield} from './models/objects.js'
import CapAmerica from './models/cap.js'

class GameSettings {
	settings = {
		
		streetRadius:3.5,
		streetLength:20,
		
		nCars:3,
		nPoliceCars:2,
		
		collidableArray:[],
		carArray:[],
		policeArray:[]
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
		
		Car.load().then((mesh) => {this.carMesh = mesh});
		//PoliceCar.load().then((mesh) => {this.policeMesh = mesh});
		
		this.worldMesh = new THREE.Object3D();
		this.worldMesh.name = "World";
			
		this.obstacleMesh = new THREE.Object3D();
		this.obstacleMesh.name = "Obstacle";
		
		//var sideTween;
		//var worldTexture;
		var loader = new THREE.TextureLoader();
		loader.load('../textures/street.jpeg', (texture) => {
			this.worldTexture = texture;
			this.init();
			
			document.addEventListener("keydown", (event) => {
				switch (event.key) {
					case 'Enter':
						this.play();
						break;
					case 'a':
						this.cap.moveLeft();
						break;
					case 'd':
						this.cap.moveRight();
						break;
					case ' ':
						this.cap.jump();
						break;
						
					default:
						break;
				}					
					
			}, false);		
		});
		
	}
	
	init(){
		
		this.camera.position.y = 2;
		this.camera.position.z = 7.5;
		this.camera.lookAt(0, -0.5, 0);
		
		var geometry = new THREE.CylinderGeometry(this.game.streetRadius, this.game.streetRadius, this.game.streetLength, 50, 10);
		var material = new THREE.MeshBasicMaterial({map: this.worldTexture});
		var street = new THREE.Mesh(geometry, material);
		street.name = 'Street';
		
		street.position.y = -4.5;
		street.rotation.z = Math.PI/2;
			
		//this.obstacleMesh.add(this.carMesh);
		street.add(this.obstacleMesh);	
		this.worldMesh.add(street);
		
		
		//this.scene.add(this.worldMesh);
		
		//var capamerica = new CapAmerica();
		//capamerica.load(this.scene);
		
	}
	
	play(){

		this.scene.remove(this.scene.getObjectByName("Tesseract"));
		document.getElementById('loading').style.visibility = "hidden";
		document.getElementsByClassName('header')[0].style.visibility = 'visible';
		document.getElementsByClassName('header')[1].style.visibility = 'visible';
		
		this.scene.add(this.worldMesh);
		//this.cap.visible = true;
		
		this.cap = new CapAmerica();
		this.cap.load(this.scene);
		//console.log(this.capMesh);
		
		//, (mesh) => {
			//mesh.children[0].visible = true;
		//})
		
		
		var rotationTween1 = new TWEEN.Tween(this.worldMesh.children[0].rotation).to( {x: this.worldMesh.children[0].rotation.x + 2*Math.PI}, 3500).repeat(Infinity).start();
		
		//var sideTween;
		//var cap = this.scene.getObjectByName("CapAmerica");
		//console.log(cap);
			
		/*	document.addEventListener("keydown", function(event){
				if (cap){
					if (event.key == 'a')
						sideTween = new TWEEN.Tween(cap.position).to( {x: cap.position.x - 2.0}, 5).start();
					if (event.key == 'd')
						sideTween = new TWEEN.Tween(cap.position).to( {x: cap.position.x + 2.0}, 5).start();
						//this.capamerica.move(event.key, this.scene)
					if (event.key == ' '){
						var jumpTween1 = new TWEEN.Tween(cap.position).to({y: cap.position.y + 0.9}, 700).easing(TWEEN.Easing.Quadratic.Out);
			        	var jumpTween2 = new TWEEN.Tween(cap.position).to({y: cap.position.y}, 700).easing(TWEEN.Easing.Quadratic.In);

			        	jumpTween1.chain(jumpTween2);	

			        	jumpTween1.start();
					}
				}
				if (event.key != 'a' && event.key != 'd' && event.key != ' ')
					console.log("Wrong key pressed");
				
					
				
			})
		
		}).repeat(Infinity).start();*/
		
		
		
		this.spawnCar(this.game.nCars);
		//this.spawnPolice(this.game.nPoliceCars);
			
	}
	
	update(){
	}
	
	spawnCar(n){
		this.randomGenerator(this.game.carArray, 'Car', n);
	}
	
	/*spawnPolice(n){
		this.randomGenerator(this.game.policeArray, 'PoliceCar', n);
	}*/
	
	randomGenerator(arr, object, n){
		var a = Math.PI*2/n;
		var height = this.game.streetRadius;
		
		for (var i=0; i<n; i++){
			var o;
			switch (object){
				
				case 'Car':
					o = new Car(this.carMesh.clone());
					break;
					
					/*case 'PoliceCar':
					o = new PoliceCar(this.policeMesh.clone());
					break;*/
					
				default:
					break;
			}
			//o.mesh.position.z = Math.cos(a*i)*height;
			o.mesh.position.y = Math.sin(a*i)*(height + 6);
			//o.mesh.position.z = 125 - (Math.random()*250 + 1);
			console.log(o.mesh);
			//if (o.mesh.position.y != 0 ) o.mesh.position.y = 0;
			//if (o.mesh.rotation.x != - Math.PI) o.mesh.rotation.z = - Math.PI;
			o.move();
			arr.push(o);
			this.game.collidableArray.push(o.mesh);
			this.obstacleMesh.add(o.mesh);
		}
	}
}