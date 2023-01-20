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
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    camera.add(pointLight);

    // Loaders de modelos
    new MTLLoader()
        .setPath('./models/')   // En que carpeta esta el modelo
        .load('puerta.mtl', function (materials) {  // Carga .mtl

            materials.preload();

            new OBJLoader()
                .setMaterials(materials)
                .setPath('./models/')
                .load('puerta.obj', function (object) {

                    object.rotation.x = -1.5;
                    scene.add(object);

                });

        });

    new MTLLoader()
        .setPath('./models/')
        .load('podio.mtl', function (materials) {

            materials.preload();

            new OBJLoader()
                .setMaterials(materials)
                .setPath('./models/')
                .load('podio.obj', function (object) {

                    object.position.y = -12;
                    object.rotation.x = -1.5;
                    scene.add(object);

                });

        });

    new MTLLoader()
        .setPath('./models/')
        .load('troca.mtl', function (materials) {

            materials.preload();

            new OBJLoader()
                .setMaterials(materials)
                .setPath('./models/')
                .load('troca.obj', function (object) {


                    object.position.y = -18;
                    object.position.z = 100;
                    object.rotation.x = -1.5;
                    object.rotation.z = -1.5;
                    scene.add(object);

                });

        });

    // Crea el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

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
