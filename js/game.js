import {Car, PoliceCar, Taxi} from './models/objects.js'
import IronMan from './models/ironman.js'

class GameSettings {
	settings = {
		
		streetRadius:3.5,
		streetLength:20,
		
		nCars:3,
		nPoliceCars:2,
		nTaxi:2,
		
		collidableArray:[],
		carArray:[],
		policeArray:[],
		taxiArray:[]
	}
}

export default class Game {
	
	game = new GameSettings().settings;
	//distVal = document.getElementById("distValue");

	
	constructor(scene, camera, renderer, tesseract, ironman){
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.tesseract = tesseract;
		this.ironman = ironman;
		
		Car.load().then((mesh) => {this.carMesh = mesh});
		PoliceCar.load().then((mesh) => {this.policeMesh = mesh});
		//Taxi.load().then((mesh) => {this.taxiMesh = mesh});
		
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
						this.ironman.moveLeft();
						break;
					case 'd':
						this.ironman.moveRight();
						break;
					case ' ':
						this.ironman.jump();
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
		
		var geometry = new THREE.CylinderGeometry(this.game.streetRadius, this.game.streetRadius, this.game.streetLength, 64);
		var material = new THREE.MeshBasicMaterial({map: this.worldTexture});
		var street = new THREE.Mesh(geometry, material);
		street.name = 'Street';
		this.worldMesh.add(street)
		
		street.position.y = -4.5;
		street.rotation.z = Math.PI/2;
			
		//this.obstacleMesh.add(this.carMesh);
		street.add(this.obstacleMesh);	

		
		
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
		this.ironman.mesh.visible = true;
		
		//this.ironman = new IronMan();
		//this.ironman.load(this.scene);
		
		//, (mesh) => {
			//mesh.children[0].visible = true;
		//})
			
		//this.camera.position.set(0, 600, -600);
		//this.camera.lookAt(this.ironman.position)
		
		
		var rotationTween1 = new TWEEN.Tween(this.worldMesh.children[0].rotation).to( {x: this.worldMesh.children[0].rotation.x + 2*Math.PI}, 5000).repeat(Infinity).start();
		
		this.spawnCar(this.game.nCars);
		this.spawnPolice(this.game.nPoliceCars);
		//this.spawnTaxi(this.game.nTaxi);
			
	}
	
	update(){
		this.ironman.update();
		
		
	}
	
	spawnCar(n){
		this.randomGenerator(this.game.carArray, 'Car', n);
	}
	
	spawnPolice(n){
		this.randomGenerator(this.game.policeArray, 'PoliceCar', n);
	}
	
	/*spawnTaxi(n){
		this.randomGenerator(this.game.taxiArray, 'Taxi', n);
	}*/
	
	randomGenerator(arr, object, n){
		var a = 2*Math.PI/n;
		var height = this.game.streetRadius;
		
		for (var i=0; i<n; i++){
			var o;
			switch (object){
				
				case 'Car':
					o = new Car(this.carMesh.clone());
					break;
					
				case 'PoliceCar':
					o = new PoliceCar(this.policeMesh.clone());
					break;
				
				case 'Taxi':
					o = new Taxi(this.taxiMesh.clone());
					break;
				
				default:
					break;
			}
			o.mesh.position.x = Math.cos(a*i)*(height);
            o.mesh.position.y = Math.sin(a*i)*(height); 
			o.mesh.position.z = (Math.random()*20+1) - 10;
			o.mesh.rotation.z = a*i - Math.PI/2;
			//o.mesh.rotation.z = a*i - Math.PI/2;
         	console.log(o.mesh);
			//if (o.mesh.position.y != 0 ) o.mesh.position.y = 0;
			//if (o.mesh.rotation.z != - Math.PI/2) o.mesh.rotation.z = - Math.PI/2; 
			//if (i == 0){
				//o.mesh.rotation.z = Math.PI/2;
				//o.mesh.position.y = this.game.streetRadius;
				//o.mesh.position.x = this.game.streetRadius;
				/*if (object == 'PoliceCar'){
					o.mesh.position.y = this.game.streetRadius - 3.6;
					o.mesh.position.x = this.game.streetRadius + 3.3;
				}*/
			//}
			/*if (i == 0 && object != 'PoliceCar'){ 
				o.mesh.position.y = height - 2.0;
				o.mesh.position.x = this.game.streetRadius;
			}*/
			o.move();
			arr.push(o);
			this.game.collidableArray.push(o.mesh);
			this.obstacleMesh.add(o.mesh);
		}
	}
}