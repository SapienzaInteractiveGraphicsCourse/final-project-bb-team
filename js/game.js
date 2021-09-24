import {Car, PoliceCar, Taxi, Tesseract} from './models/objects.js'
import IronMan from './models/ironman.js'

class GameSettings {
	settings = {
		
		distance:0,
		distanceIncrease:0.1,
		rotationIncrease:2,
		level:1,
		
		streetRadius:10.5,
		streetLength:50,
		
		nCars:3,
		nPoliceCars:3,
		nTaxi:2,
		nTesseracts:1,
		
		collidableArray:[],
		carArray:[],
		policeArray:[],
		taxiArray:[],
		tesseractArray:[]
	}
}

export default class Game {
	
	game = new GameSettings().settings;
	//distVal = document.getElementById("distValue");

	
	constructor(scene, camera, renderer, ironman){
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		//this.tesseract = tesseract;
		this.ironman = ironman;
		
		Car.load().then((mesh) => {this.carMesh = mesh});
		PoliceCar.load().then((mesh) => {this.policeMesh = mesh});
		Taxi.load().then((mesh) => {this.taxiMesh = mesh});
		Tesseract.load().then((mesh) => {this.tessMesh = mesh});
		
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
		this.camera.position.z = 4;
		this.camera.lookAt(0, -0.5, -2);
		
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
			
		this.camera.position.set(0, 18, 15);
		//this.camera.lookAt(this.ironman.position)
		
		
		var rotationTween1 = new TWEEN.Tween(this.worldMesh.children[0].rotation).to( {x: this.worldMesh.children[0].rotation.x + 2*Math.PI}, 5000).repeat(Infinity).start();
		
		this.spawnCar(this.game.nCars);
		this.spawnPolice(this.game.nPoliceCars);
		this.spawnTesseract(this.game.nTesseracts);
		//this.spawnTaxi(this.game.nTaxi);
			
	}
	
	update(){

		this.ironman.update();

		//console.log(this.ironman.ironman.isJumping);

		//this.worldMesh.children[0].rotation.x = this.game.rotationIncrease;
		//console.log(this.worldMesh.children[0])

	    this.game.distance += this.game.distanceIncrease;
	    //console.log(this.game.distance);
	    document.getElementById("distValue").innerHTML = Math.floor(this.game.distance);

	    for (var i=1; i<11; i++) {
	    	if(this.game.distance > 20*i){
	    		this.game.level = i+1;
	    		this.game.distanceIncrease += 0.0001;
	    		this.game.rotationIncrease += 0.006;
	    		//console.log(this.game.rotationIncrease)
	    	}
	    }
	    
	    document.getElementById("levelValue").innerHTML = Math.floor(this.game.level);

	    this.collisionDetection();

	}
	
	spawnCar(n){
		this.randomGenerator(this.game.carArray, 'Car', n);
	}
	
	spawnPolice(n){
		this.randomGenerator(this.game.policeArray, 'PoliceCar', n);
	}
	
	spawnTaxi(n){
		this.randomGenerator(this.game.taxiArray, 'Taxi', n);
	}
	
	spawnTesseract(n){
		this.randomGenerator(this.game.tesseractArray, 'Tesseract', n);
	}
	
	randomGenerator(arr, object, n){
		var a = 2*Math.PI/n;
		//var height = this.game.streetRadius;
		//var a;
		var h = this.game.streetRadius;
		
		for (var i=0; i<n; i++){
			var o;
			//a = Math.random()*(2*Math.PI);
			switch (object){
				
				case 'Car':
					o = new Car(this.carMesh.clone());
					break;
					
				case 'PoliceCar':
					o = new PoliceCar(this.policeMesh.clone());
					break;
				
				case 'Taxi':
					o = new Taxi(this.taxiMesh.clone());
					//o.mesh.rotation.x = -Math.PI/2;
					break;
				
				case 'Tesseract':
					o = new Tesseract(this.tessMesh.clone());
					break;
				
				default:
					break;
			}
			o.mesh.position.x = Math.cos(a*i)*h;
            o.mesh.position.y = 10 - (Math.random()*20); 
			o.mesh.position.z = Math.sin(a*i)*h;//height;//1.5 - ((Math.random()*3) + 1);
			//if (i % 2 != 0) o.mesh.rotation.y = - Math.PI;
			//if (i == 3) o.mesh.rotation.y = - Math.PI;
			if (i == 1) o.mesh.rotation.y = - 2*Math.PI/3;
			if (i == 2) o.mesh.rotation.y = - 5*Math.PI/4;
			//if (i==0) o.mesh.rotation.y = Math.PI;
			
			/*o.mesh.position.x = hyp * Math.cos(ang);
			o.mesh.position.y = (Math.random()*22) - 11;
			o.mesh.position.z = hyp * Math.sin(ang);
			o.mesh.rotation.z = -Math.PI/2;*/
			
			
			//o.mesh.rotation.z = a*i - Math.PI/2;
         	//console.log(o.mesh);

			o.move();
			arr.push(o);
			this.game.collidableArray.push(o.mesh);
			this.obstacleMesh.add(o.mesh);
		}
	}


	collisionDetection() {
        // var originPoint = this.ironman.mesh.position.clone();
        if (this.ironman.ironman.isJumping) return

        //console.log(this.ironman.mesh);

        
    }
}