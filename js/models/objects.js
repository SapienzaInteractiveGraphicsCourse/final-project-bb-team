import {GLTFLoader} from '../GLTFLoader.js'

 
 export class Car {
	 
	 constructor(mesh){
	 	this.mesh = new THREE.Mesh(
	 		new THREE.BoxGeometry(15, 10, 20),
			new THREE.MeshBasicMaterial({opacity: 0.0, transparent: true})	
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
	 			console.log(object);
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
	 		new THREE.BoxGeometry(15, 10, 20),
			new THREE.MeshBasicMaterial({opacity: 0.0, transparent: true})	
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
				console.log(object);
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
	 		new THREE.BoxGeometry(15, 10, 20),
			new THREE.MeshBasicMaterial({opacity: 0.0, transparent: true})
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
				console.log(object);
				mesh.scale.set(.05, .05, .05);
				//mesh.position.z -= 8;
				//mesh.position.x = 3;
				//mesh.position.y = 0.8;
				mesh.rotation.z = - Math.PI/2;
				resolve(mesh);
			}, null, reject);
		});
	}
	/* async load(scene){
		 const loader = new GLTFLoader();
		 loader.load('./models/nyc_taxi/scene.gltf', function(gltf){
			 console.log(gltf);
			 var model = gltf.scene;
			 model.scale.set(.003, .003, .003);
			 model.name = 'Taxi';
			 scene.add(model);
		 }, function(xhr){
			 console.log((xhr.loaded/xhr.total * 100) + "% loaded");
		 }, function(error){
			 console.log("[Taxi Load Function]: An error occurred");
		 });
	 }*/
 }
 
 export class Tesseract {
  
   	constructor(mesh){
    	this.mesh = new THREE.Mesh(
     	   new THREE.BoxGeometry(20, 20, 20),
    		new THREE.MeshBasicMaterial({opacity: 0.0, transparent: true}) 
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
      		 	//console.log(object);
      		  mesh.scale.set(.004, .004, .004);
			  mesh.position.y = 4;
			  //mesh.position.x = 2;
      		  mesh.name = 'Tesseract';
     		  resolve(mesh);
    	  }, null, reject);
   		}); 
   	}
  }
 
 /*export class Shield {
 	   
	 async load(scene){
		 var model;
		 const loader = new GLTFLoader();
		 loader.load('./models/cap_shield/scene.gltf', function(gltf){
			 console.log(gltf);
			 model = gltf.scene;
			 model.scale.set(.003, .003, .003);
			 model.name = 'Shield';
			 scene.add(model);
		 }, function(xhr){
			 console.log((xhr.loaded/xhr.total * 100) + "% loaded");
		 }, function(error){
			 console.log("[Shield Load Function]: An error occurred");
		 });
		 
		 var start = { x: 0, y: 0, z: 0, rotation: 0};
		 var end = { x: 0, y: 0, z: 0, rotation: 90};
		 var tween = new TWEEN.Tween(start).to( end, 500 ).repeat(Infinity);
		 tween.onUpdate(function(){
			 if (model){
				 model.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.01);
			 }
		 });
	 }
 }*/
 