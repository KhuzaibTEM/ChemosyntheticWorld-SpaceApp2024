import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 50;

const scene = new THREE.Scene();
let planet;
const loader = new GLTFLoader();
loader.load('models/Planet.gltf',
    function (gltf) {
        planet = gltf.scene;
        scene.add(planet);
    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
document.getElementById('container3D').appendChild(renderer.domElement);


// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableKeys = false;
controls.enableZoom = false;
controls.enablePan = false;

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    controls.update();
    renderer.render(scene, camera);
};
reRender3D();


let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0, y: -6, z: 0},
        rotation: {x: 0, y: 1.5, z: 0} 
    },
    {
        id: "intro",
        position: { x: -8, y: -4, z: -25 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "description",
        position: { x: 8, y: -5, z: -25 },
        rotation: { x: 0.25, y: -2, z: 0 },
    },
    {
        id: "fur-description",
        position: { x: -8, y: -4, z: -30 },
        rotation: { x: 0.5, y: -1, z: 0 },
    },
    {
        id: "team-info",
        position: { x: -11, y: -6, z: -32 },
        rotation: { x: 0.3, y: 1, z: 0 }
    },
    {
        id: "ending",
        position: { x: 0, y: -3, z: 0},
        rotation: { x: 0.25, y: -0.5, z: 0 },
    },
];


const modelMove = () => {
    const sections = document.querySelectorAll('.sec');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(planet.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(planet.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        });
    }
};


window.addEventListener('scroll', () => {
    if (planet) {
        modelMove();
    }
});

// window.addEventListener('resize', () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
// });
