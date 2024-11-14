import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// Camera setup
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(window.innerWidth / 380,  - window.innerHeight / 700, 30);

const scene = new THREE.Scene();

let planet;
const loader = new GLTFLoader();
loader.load(
    'models/Mars.gltf',
    function (gltf) {
        planet = gltf.scene;
        scene.add(planet);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D-v2').appendChild(renderer.domElement);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Handle screen resizing
window.addEventListener('resize', () => {
    // Update the camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Resize the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    scene.rotation.y += 0.005;
    renderer.render(scene, camera);
};

reRender3D();
