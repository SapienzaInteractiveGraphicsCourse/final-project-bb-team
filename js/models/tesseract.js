import {GLTFLoader} from '../GLTFLoader.js'

export default class Tesseract {
	
	async load(scene){
		var loader = new GLTFLoader();
		loader.load('./models/tesseract_cube/scene.gltf', (object) => {
			this.mesh = new THREE.Mesh(
				new THREE.BoxGeometry(20, 20, 20),
				new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0})
			).add(object.scene);
			this.mesh.scale.set(.006, .006, .006);
			this.mesh.position.y = 0.7;
			this.mesh.name = "Tesseract";
			scene.add(this.mesh);
			this.move();
		}, null, null);
			
	}
	
	move(){
		var tesseractTween = new TWEEN.Tween(this.mesh.children[0].rotation).to({ x: this.mesh.children[0].rotation.x + 2*Math.PI, y: this.mesh.children[0].rotation.y + 2*Math.PI}, 3000).repeat(Infinity).start();
	}
	
    /*async load(scene) {
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
	} */
 }
