import {Car, PoliceCar, Taxi, Tesseract, Reactor} from 'models/objects.js'
import IronMan from 'models/ironman.js'

class GameSettings {
	settings = {
		
		distance:0,
		distanceIncrease:0.1,
		rotationIncrease:2,
		level:1,
		energy:500,
		
		streetRadius:10.5,
		streetLength:50,

		isPlaying:false,
		
		nCars:3,
		nPoliceCars:8,
		nTaxi:5,
		nTesseracts:6,
		nReactors:6,

		carValue:5,
		policeValue:7,
		taxiValue:6,
		tesseractValue:20,
		reactorValue:15,
		
		collidableArray:[],
		carArray:[],
		policeArray:[],
		taxiArray:[],
		tesseractArray:[],
		reactorArray:[]
	}
}

export default class Game {
	
	game = new GameSettings().settings;
	
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
		Reactor.load().then((mesh) => {this.reactorMesh = mesh});
		
		this.worldMesh = new THREE.Object3D();
		this.worldMesh.name = "World";
			
		this.obstacleMesh = new THREE.Object3D();
		this.obstacleMesh.name = "Obstacle";
		
		//var sideTween;
		//var worldTexture;
		var loader = new THREE.TextureLoader();
		loader.load('./textures/street.jpeg', (texture) => {
			this.worldTexture = texture;
			this.init();
			
			document.addEventListener("keydown", (event) => {
				switch (event.key) {
					case 'Enter':
						if(this.game.isPlaying == false)
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
		
	}
	
	play(){

		this.game.isPlaying = true;

		this.scene.remove(this.scene.getObjectByName("Tesseract"));
		document.getElementById('loading').style.visibility = "hidden";
		document.getElementsByClassName('header')[0].style.visibility = 'visible';
		document.getElementsByClassName('header')[1].style.visibility = 'visible';
		document.getElementById('gameover').style.visibility = 'hidden';
		
		this.scene.add(this.worldMesh);
		this.ironman.mesh.visible = true;

		this.camera.position.set(0, 18, 15);

		
		//var rotationTween1 = new TWEEN.Tween(this.worldMesh.children[0].rotation).to( {x: this.worldMesh.children[0].rotation.x + 2*Math.PI}, 5000).repeat(Infinity).start();
		
		this.spawnCar(this.game.nCars);
		this.spawnPolice(this.game.nPoliceCars);
		this.spawnTesseract(this.game.nTesseracts);
		this.spawnTaxi(this.game.nTaxi);
		this.spawnReactor(this.game.nReactors);
		
	}
	
	update(){

		//console.log(this.game.isPlaying);

		this.ironman.update();
		//console.log(this.ironman.ironman.isJumping);

		if(this.game.isPlaying == true){

			this.worldMesh.children[0].rotation.x = this.game.rotationIncrease;

		    this.game.distance += this.game.distanceIncrease;
		    //console.log(this.game.distance);
		    document.getElementById("distValue").innerHTML = Math.floor(this.game.distance);

		    for (var i=0; i<11; i++) {
		    	if(this.game.distance > 100*i){
		    		this.game.level = i+1;
		    		this.game.distanceIncrease += 0.0001;
		    		this.game.rotationIncrease += 0.006;
		    		//console.log(this.game.rotationIncrease)
		    	}
		    }
		    
		    document.getElementById("levelValue").innerHTML = Math.floor(this.game.level);

		    this.collisionDetection();
		}

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

	spawnReactor(n){
		this.randomGenerator(this.game.reactorArray, 'Reactor', n);
	}

	
	randomGenerator(arr, object, n){

		var a = 2*Math.PI/n;
		var h = this.game.streetRadius;
		
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
				
				case 'Tesseract':
					o = new Tesseract(this.tessMesh.clone());
					break;

				case 'Reactor':
					o = new Reactor(this.reactorMesh.clone());
					break;
				
				default:
					break;
			}

			o.mesh.position.x = Math.cos(a*i)*h;
            o.mesh.position.y = 20 - (Math.random()*40); 
			o.mesh.position.z = Math.sin(a*i)*h;
			o.mesh.rotation.y = 2*Math.PI - a*i;

			o.move();
			arr.push(o);
			this.game.collidableArray.push(o.mesh);
			this.obstacleMesh.add(o.mesh);
		}
	}



	collisionDetection() {

        if (this.ironman.ironman.isJumping) return;

        var nTot = this.game.nCars+this.game.nPoliceCars+this.game.nTaxi+this.game.nTesseracts+this.game.nReactors;
        //console.log(nTot);

        if(this.game.isPlaying == true){

	        this.ironman.mesh.geometry.boundingBox.applyMatrix4(this.ironman.mesh.matrixWorld);

	        var ironmanBB = this.ironman.mesh.geometry.boundingBox.clone();
	        ironmanBB.applyMatrix4(this.ironman.mesh.matrixWorld);

	        for (var i = 0;  i < nTot; i++){

	        	var obstacleBB = this.game.collidableArray[i].geometry.boundingBox.clone();
		        obstacleBB.applyMatrix4(this.game.collidableArray[i].matrixWorld);

		        //console.log(ironmanBB.intersectsBox(obstacleBB));
		        //console.log(this.game.collidableArray[i].children[0].name);

		        if (ironmanBB.intersectsBox(obstacleBB)){

			        var obstacle = this.game.collidableArray[i].children[0].name;

			        switch (obstacle) {
			        	case 'Car':
	                        this.removeEnergy(this.game.carValue);
	                        break;

	                    case 'PoliceCar':
	                        this.removeEnergy(this.game.policeValue);
	                        break;

	                    case 'Taxi':
	                        this.removeEnergy(this.game.taxiValue);
	                        break;

	                    case 'Tesseract':
	                        this.addEnergy(this.game.tesseractValue);
	                        break;

	                    case 'Reactor':
	                        this.addEnergy(this.game.reactorValue);
	                        break;

	                    default:
	                        break;
			        }
			    }
	        }
	    }
    }


	addEnergy(bonus){
		//console.log("Aggiungi Energia")
		this.game.energy += bonus;
		document.getElementById("energyValue").innerHTML = this.game.energy;
	}

	removeEnergy(malus){
		//console.log("Rimuovi Energia")
		this.game.energy -= malus;
		this.game.energy = Math.max(0, this.game.energy);
		document.getElementById("energyValue").innerHTML = this.game.energy;

		if (this.game.energy == 0) {
            //console.log('Game Over');
			//location.reload();
			document.getElementById('gameover').style.visibility = 'visible';
			setTimeout(function(){location.reload()}, 3000);
            
        }
	}

}
