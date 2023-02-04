import './style.css'
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// Inicializar variables
let camera, scene, renderer;
let mouseX = 0, mouseY = 0;

// Globales para cambio de tamaño en ventana
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

var troca;
var trocaObj;

// Funcion principal
init();
animate();


function init() {

    // Inserta canvas al DOM
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Inicializa y posiciona camara
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 350;

    // Inicializa Escena
    scene = new THREE.Scene();
    scene.add(camera);

    // Crea Luces
    const pointLight = new THREE.PointLight(0xffffff, 0.7);
    pointLight.position.x = 60;
    pointLight.position.y = 100;
    pointLight.position.z = 30;
    pointLight.castShadow = true;
    scene.add(pointLight);

    //Set up shadow properties for the light
    pointLight.shadow.mapSize.width = 512; // default
    pointLight.shadow.mapSize.height = 512; // default
    pointLight.shadow.camera.near = 0.5; // default
    pointLight.shadow.camera.far = 500; // default

    // Loaders de modelos

    // Puerta de Chihuahua
    new MTLLoader()
        .setPath('./models/')   // En que carpeta esta el modelo
        .load('puerta.mtl', function (materials) {  // Carga .mtl

            materials.preload();

            new OBJLoader()
                .setMaterials(materials)
                .setPath('./models/')
                .load('puerta.obj', function (object) {
                    object.castShadow = true;
                    object.receiveShadow = true;
                    scene.add(object);

                });

        });

    // Podio de la puerta
    new MTLLoader()
        .setPath('./models/')
        .load('podio.mtl', function (materials) {

            materials.preload();

            new OBJLoader()
                .setMaterials(materials)
                .setPath('./models/')
                .load('podio.obj', function (object) {
                    object.castShadow = true;
                    object.receiveShadow = true;
                    scene.add(object);

                });

        });


    // Troca
    trocaObj = new THREE.Object3D();
    scene.add(trocaObj)
    new MTLLoader()
        .setPath('./models/')
        .load('troca.mtl', function (materials) {

            materials.preload();

            new OBJLoader()
                .setMaterials(materials)
                .setPath('./models/')
                .load('troca.obj', function (object) {
                    object.castShadow = true;
                    object.receiveShadow = true;
                    troca = object;
                    trocaObj.add(object);

                });

        });

    new MTLLoader()
        .setPath('./models/')
        .load('plano.mtl', function (materials) {

            materials.preload();

            new OBJLoader()
                .setMaterials(materials)
                .setPath('./models/')
                .load('plano.obj', function (object) {
                    object.receiveShadow = true;
                    scene.add(object);

                });

        });

    // Crea el renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // Agrega eventos
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);

}

// Eventos
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 4;
    mouseY = (event.clientY - windowHalfY) / 4;
}

function animate() {
    requestAnimationFrame(animate);
    // Animacion
    trocaObj.rotation.y += 0.0125;
    render();
}

function render() {
    // Permite movimiento de camara
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (- mouseY - camera.position.y) * .05;

    // Apunta a escena y renderiza
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
