
// import * as THREE from '/node_modules/three/build/three.module.js';
// import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
// //import URDFLoader from '/node_modules/urdf-loader/src/URDFLoader.js';
// import URDFLoader from 'urdf-loader/src/URDFLoader.js';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import URDFLoader from 'urdf-loader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
let scene, camera, renderer, controls;

// Initialize the scene
function init() {
scene = new THREE.Scene();
window.scene = scene;
scene.background = new THREE.Color(0xffffff); // White background

const container = document.getElementById('simulation-view');
camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x2a2a2a, 1);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Add orbit controls
controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 10);
controls.update();

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Add ground plane
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x808080,
    roughness: 0.8,
    metalness: 0.2
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Add grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// // Initialize URDFLoader
const manager = new THREE.LoadingManager();
const loader = new URDFLoader(manager);

// // Set package path if necessary
// loader.packages = {
//     packageName: './package/dir/' // Adjust as needed
// };

// // Load the URDF file
console.log("Starting to load URDF...");

loader.load('./window-simulator/robot_files/go2_description.urdf', (robot) => {
    console.log("add robot");
    robot.name = 'robot';
    scene.add(robot);

    if (robot) {
        // Position adjustment
        robot.position.set(0, 5.5, 0.5);  // Center at origin
        
        // Rotation adjustment (90 degrees around X-axis to correct sideways orientation)
        robot.rotation.x = -Math.PI / 2;
        
        // Scale if needed
        robot.scale.set(12, 12, 12);
        
        scene.add(robot);
    }
}, undefined, (error) => {
    console.error('An error happened while loading the robot:', error);
});

animate();
}

console.log("Loader call done...");

// Function to get camera coordinates
function getCameraCoordinates() {
    const { x, y, z } = camera.position;
    return `Camera Coordinates: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`;
}

// Function to output coordinates to console editor
function outputCameraCoordinates() {
    const consoleOutput = ace.edit("console-output");
    const coordinates = getCameraCoordinates();
    consoleOutput.session.insert({
        row: consoleOutput.session.getLength(),
        column: 0
    }, coordinates + '\n');
}

// Set interval to call the function every second
// setInterval(outputCameraCoordinates, 1000);


// // Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    const container = document.getElementById('simulation-view');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animateCameraToPosition() {
    const targetPosition = new THREE.Vector3(0.81, 0.85, -0.01);
    const startPosition = camera.position.clone();
    const duration = 2000; // Duration in milliseconds
    const startTime = Date.now();

    function updateCamera() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Interpolate position only
        camera.position.lerpVectors(startPosition, targetPosition, progress);

        if (progress < 1) {
            requestAnimationFrame(updateCamera);
        }
    }

    updateCamera();
}

// Immediately start camera animation and repeat
async function startCameraAnimation() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    animateCameraToPosition();
    // Repeat the animation every 3 seconds (2 seconds for animation + 1 second pause)
    setInterval(animateCameraToPosition, 5000);
}

// Start the animation immediately when the scene loads
// startCameraAnimation();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


document.addEventListener('DOMContentLoaded', init);