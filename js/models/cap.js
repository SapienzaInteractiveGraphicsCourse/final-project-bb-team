import {GLTFLoader} from '../GLTFLoader.js'

export default class CapAmerica {
	
	
	load(scene){
		var loader = new GLTFLoader();
		loader.load('./models/captain_america/scene.gltf', object => {
			this.mesh = new THREE.Mesh(
                new THREE.BoxGeometry(20, 30, 15),
                new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0})
            ).add(object.scene);
			this.mesh.name = "CapAmerica";
			this.mesh.scale.set(20.0, 20.0, 20.0);
			this.mesh.rotateY(22);
			this.mesh.translateY(-1.6);
			this.mesh.translateZ(-4.5);
			//this.mesh.visible = true;
			scene.add(this.mesh);
			//console.log(this.mesh);
		}, null, null);
		
		/*var model;
		const loader = new GLTFLoader();
		loader.load('./models/captain_america/scene.gltf', function(gltf){
			console.log(gltf);
			model = gltf.scene;
			model.scale.set(20.0, 20.0, 20.0);
			model.rotateY(22);
			model.translateY(-1.6);
			model.translateZ(-4.5);
			model.name = 'CapAmerica';
			//model.visible = false;
			scene.add(model);
		}, function(xhr){
			console.log((xhr.loaded/xhr.total * 100) + "% loaded");
		}, function(error){
			console.log("[Cap Load Function]: An error occurred");
   		});*/
		
	}
	
	moveLeft(){
		var tween = new TWEEN.Tween(this.mesh.position).to( {x: this.mesh.position.x - 2.0}, 5).start()
	}
	
	moveRight(){
		var tween = new TWEEN.Tween(this.mesh.position).to( {x: this.mesh.position.x + 2.0}, 5).start();
	}
	
	jump(){
		var jumpTween1 = new TWEEN.Tween(this.mesh.position).to({y: this.mesh.position.y + 0.9}, 700).easing(TWEEN.Easing.Quadratic.Out);
    	var jumpTween2 = new TWEEN.Tween(this.mesh.position).to({y: this.mesh.position.y}, 700).easing(TWEEN.Easing.Quadratic.In);

    	jumpTween1.chain(jumpTween2);	

    	jumpTween1.start();
		
	}
	/*move(cmd, scene){
		var cap = scene.getObjectByName("CapAmerica");
		var sideTween;
		
		if (cmd == 'a') 
			sideTween = new TWEEN.Tween(cap.position).to( {x: cap.position.x - 2.0}, 5);
			//cap.translateX(2.0);
		
		if (cmd == 'd') 
			sideTween = new TWEEN.Tween(cap.position).to( {x: cap.position.x + 2.0}, 5);
			//cap.translateX(-2.0);
		sideTween.start();
	}*/
	
	/*jump(scene){
		var cap = scene.getObjectByName("CapAmerica");

		var jumpTween1 = new TWEEN.Tween(cap.position).to({y: cap.position.y + 0.9}, 700).easing(TWEEN.Easing.Quadratic.Out);
        var jumpTween2 = new TWEEN.Tween(cap.position).to({y: cap.position.y}, 700).easing(TWEEN.Easing.Quadratic.In);

        jumpTween1.chain(jumpTween2);

        jumpTween1.start();

	}*/
	
}