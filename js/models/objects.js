import {GLTFLoader} from '../GLTFLoader.js'

 
 export class Car {
	 
	 constructor(mesh){
	 	this.mesh = new THREE.Mesh(
	 		new THREE.BoxGeometry(3, 2.5, 4),
			new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000})
	 	).add(mesh)
		this.id = mesh.id;

		this.mesh.geometry.computeBoundingBox();
	 }
	 
	 move(){return}
	 
	 catch (callback){
		 callback();
	 }
 	
	 static async load(){
	 	var loader = new GLTFLoader();
		return new Promise((resolve, reject) => {
			loader.load('./models/dirty_car/scene.gltf', object => {
				var mesh = object.scene;
	 			mesh.scale.set(.0075, .0075, .0075);
				mesh.rotation.z = - Math.PI/2;
	 			mesh.name = 'Car';
				resolve(mesh);
			}, null, reject);
		}); 
	 }

 }
 
 export class PoliceCar {
 	
	 constructor(mesh){
	 	this.mesh = new THREE.Mesh(
	 		new THREE.BoxGeometry(3, 2.5, 4),
	 		new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ff00})
	 	).add(mesh)
		this.id = mesh.id;

		this.mesh.geometry.computeBoundingBox();
	 }
	 
	 move(){return}
	 
	 catch (callback){
		 callback();
	 }
	 
	 static async load(){
		var loader = new GLTFLoader();
 		return new Promise((resolve, reject) => {
 			loader.load('./models/police_car/scene.gltf', object => {
 				var mesh = object.scene;
				mesh.scale.set(.7, .7, .7);
				mesh.rotation.z = - Math.PI/2;
				mesh.name = 'PoliceCar';
				resolve(mesh);
 			}, null, reject);
		});
	 }
 }
 
 export class Taxi {
	 
	constructor(mesh){
	 	this.mesh = new THREE.Mesh(
	 		new THREE.BoxGeometry(3, 2.3, 4.5),
	 		new THREE.MeshBasicMaterial({wireframe: true, color: 0xffff00})
	 	).add(mesh);
		this.id = mesh.id;

		this.mesh.geometry.computeBoundingBox();
	}
 	
	move(){return}
	
	catch (callback){
		callback();
	}
	
	static async load(){
		var loader = new GLTFLoader();
		return new Promise((resolve, reject) => {
			loader.load('./models/nyc_taxi/scene.gltf', object => {
				var mesh = object.scene;
				mesh.name = 'Taxi';
				mesh.scale.set(.06, .06, .06);
				mesh.position.x = 0.8;
				mesh.rotation.x = Math.PI*0.9;
				mesh.rotation.z = -Math.PI/2;
				resolve(mesh);
			}, null, reject);
		});
	}

 }
 
 export class Tesseract {
  
   	constructor(mesh){
		 	this.mesh = new THREE.Mesh(
		 		new THREE.BoxGeometry(7.5, 2.3, 1.5),
				new THREE.MeshBasicMaterial({wireframe: true, color: 0x0000ff})
		 	).add(mesh)
			this.id = mesh.id;

			this.mesh.geometry.computeBoundingBox();
	 	}
  
   	move(){
    	var tesseractTween = new TWEEN.Tween(this.mesh.children[0].rotation).to({ x: this.mesh.children[0].rotation.x + 2*Math.PI, y: this.mesh.children[0].rotation.y + 2*Math.PI}, 3000).repeat(Infinity).start();
   	}
  
   	catch (callback){
    	callback();
   	}
  
  	 static async load(){
    	var loader = new GLTFLoader();
   	  	return new Promise((resolve, reject) => {
	    		loader.load('./models/tesseract_cube/scene.gltf', object => {
	     		  	var mesh = object.scene;
	     		  	mesh.name = 'Tesseract';
      		  		mesh.scale.set(.005, .005, .005);
			  		mesh.position.x = 3;
	     		  	resolve(mesh);
	    	  }, null, reject);
	   		});
   	}
  }

  export class Reactor {
  
   	constructor(mesh){
		 	this.mesh = new THREE.Mesh(
		 		new THREE.BoxGeometry(8.5, 2, 1.5),
				new THREE.MeshBasicMaterial({wireframe: true, color: 0xffffff})
		 	).add(mesh)
			this.id = mesh.id;

			this.mesh.geometry.computeBoundingBox();
	 	}
  
   	move(){return}
  
   	catch (callback){
    	callback();
   	}
  
  	 static async load(){
    	var loader = new GLTFLoader();
   	  	return new Promise((resolve, reject) => {
	    		loader.load('./models/arc_reactor_final/scene.gltf', object => {
	     		  	var mesh = object.scene;
	     		  	mesh.name = 'Reactor';
      		  		mesh.scale.set(0.2, 0.2, 0.2);
			  		mesh.position.x = 3;
	     		  	resolve(mesh);
	    	  }, null, reject);
	   		});
   	}
  }
