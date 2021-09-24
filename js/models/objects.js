import {GLTFLoader} from '../GLTFLoader.js'

 
 export class Car {
	 
	 constructor(mesh){
	 	this.mesh = new THREE.Mesh(
	 		new THREE.BoxGeometry(1.5, 1, 3),
			new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000})
			//new THREE.MeshBasicMaterial({opacity: 0.5, transparent: true, color: 0xff0000})
	 	).add(mesh)
		this.id = mesh.id;
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
	 			//console.log(object);
	 			mesh.scale.set(.005, .005, .005);
				//model.visible = false;
				//mesh.rotation.y = - Math.PI/2;
				mesh.rotation.z = - Math.PI/2;
				//mesh.position.z -= 10;
				//mesh.position.y = 5;
	 			mesh.name = 'Car';
				resolve(mesh);
			}, null, reject);
		}); 
	 }

 }
 
 export class PoliceCar {
 	
	 constructor(mesh){
	 	this.mesh = new THREE.Mesh(
	 		new THREE.BoxGeometry(1.5, 1.5, 3),
	 		new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ff00})
			//new THREE.MeshBasicMaterial({opacity: 0.5, transparent: true, color: 0x00ff00})	
	 	).add(mesh)
		this.id = mesh.id;
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
				//console.log(object);
				mesh.scale.set(.5, .5, .5);
				mesh.rotation.z = - Math.PI/2;
				//mesh.rotation.x = 0;
				//mesh.position.x = 7;
				//mesh.position.y = 10;
				//mesh.position.z -= 2;
				mesh.name = 'PoliceCar';
				resolve(mesh);
 			}, null, reject);
		});
	 }
 }
 
 export class Taxi {
	 
	constructor(mesh){
	 	this.mesh = new THREE.Mesh(
	 		new THREE.BoxGeometry(1.5, 1.3, 3),
	 		new THREE.MeshBasicMaterial({wireframe: true, color: 0xffff00})
			//new THREE.MeshBasicMaterial({opacity: 0.5, transparent: true, color: 0xffff00})
	 	).add(mesh);
		this.id = mesh.id;
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
				//console.log(object);
				mesh.scale.set(.05, .05, .05);
				//mesh.position.z -= 8;
				//mesh.position.x = 3;
				//mesh.position.y = 0.8;
				mesh.rotation.z = - Math.PI/2;
				resolve(mesh);
			}, null, reject);
		});
	}

 }
 
 export class Tesseract {
  
   	constructor(mesh){
		 	this.mesh = new THREE.Mesh(
		 		new THREE.BoxGeometry(5, 1, 1),
				new THREE.MeshBasicMaterial({wireframe: true, color: 0x0000ff})
		 	).add(mesh)
			this.id = mesh.id;
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
      		  mesh.scale.set(.004, .004, .004);
			  		//mesh.position.y = -2;
			  		//mesh.position.z = 4;
			  		mesh.position.x = 2;
	     		  resolve(mesh);
	    	  }, null, reject);
	   		});
   	}
  }
