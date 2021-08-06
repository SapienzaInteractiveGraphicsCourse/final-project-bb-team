import {GLTFLoader} from '../three.js-master/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from '../three.js-master/build/three.module.js'


export default class Tesseract {
	
	/*constructor(mesh){
		this.mesh = new THREE.Mesh(
			new THREE.BoxGeometry(20, 20, 20),
			new THREE.MeshBasicMaterial({
				opacity: 0.0,
				transparent: true
			})
		)//.add(this.mesh)
		//this.id = this.mesh.id
	}*/
	/*move(){
			var start = { x: 0, y: 0, z: 0, rotation: 0 };
			var end = { x: 0, y: 0, z: 0, rotation: 90 };
			var	tween = new TWEEN.Tween( start ).to( end, 500 ).repeat(Infinity);
			tween.onUpdate(function(){
				if(model){
					//root.rotation.x = this.rotation;
					model.rotateOnWorldAxis(new THREE.Vector3(1,0,0), 0.01);
					model.rotateOnWorldAxis(new THREE.Vector3(0,1,0), 0.01);
					//root.rotation.y = start.rotation;
					
				}
			});
			
			tween.start();
			
	}*/
	
    async load(scene) {
		var model;
		const loader = new GLTFLoader();
			loader.load('./models/tesseract_cube/scene.gltf', function(gltf) {
			console.log(gltf);
			model = gltf.scene;
            model.scale.set(.008, .008, .008);
			model.name = 'Tesseract';
			scene.add(model);
   		}, function(xhr){
			console.log((xhr.loaded/xhr.total * 100) + "% loaded");
		}, function(error){
			console.log("[Tesseract Load Function]: An error occurred");
   		})
		
		var start = { x: 0, y: 0, z: 0, rotation: 0 };
		var end = { x: 0, y: 0, z: 0, rotation: 90 };
		var	tween = new TWEEN.Tween( start ).to( end, 500 ).repeat(Infinity);
		tween.onUpdate(function(){
			if(model){
				model.rotateOnWorldAxis(new THREE.Vector3(1,0,0), 0.01);
				model.rotateOnWorldAxis(new THREE.Vector3(0,1,0), 0.01);
				
			}
		});	
		tween.start();		
	} 
 }
 
 export class Car {
 	
	async load(scene){
 		const loader = new GLTFLoader();
 		loader.load('./models/dirty_car/scene.gltf', function(gltf){
 			console.log(gltf);
 			var model = gltf.scene;
 			model.scale.set(.003, .003, .003);
 			model.name = 'Car';
 			scene.add(model);
		}, function(xhr){
			console.log((xhr.loaded/xhr.total * 100) + "% loaded");
		}, function(error){
			console.log("[Car Load Function]: An error occurred");
		})
	}
 }
 
 export class PoliceCar {
 	
	 async load(scene){
		 const loader = new GLTFLoader();
		 loader.load('./models/police_car/scene.gltf', function(gltf){
			 console.log(gltf);
			 var model = gltf.scene;
			 model.scale.set(.003, .003, .003);
			 model.name = 'PoliceCar';
			 scene.add(model);
		 }, function(xhr){
			 console.log((xhr.loaded/xhr.total * 100) + "% lodaded");
		 }, function(error){
			 console.log("[PoliceCar Load Function]: An error occurred");
		 });
	 }
 }
 
 export class Taxi {
 	
	 async load(scene){
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
	 }
 }
 
 export class Shield {
 	   
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
 }
 