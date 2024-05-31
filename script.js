// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth damping
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true; // Allow panning
controls.minDistance = 1;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI / 2; // Limit the vertical angle

// Room dimensions (approx 1000 sqft, 31.62ft x 31.62ft or 10m x 10m)
const roomWidth = 10;
const roomHeight = 5;
const roomDepth = 10;

// Create room (a simple box)
const roomGeometry = new THREE.BoxGeometry(roomWidth, roomHeight, roomDepth);
const roomMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.BackSide });
const room = new THREE.Mesh(roomGeometry, roomMaterial);
room.receiveShadow = true;
scene.add(room);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// Random object creation
const objects = [];
const objectCount = 20; // Number of random objects

for (let i = 0; i < objectCount; i++) {
    const geometry = new THREE.BoxGeometry(
        Math.random() * 0.5 + 0.5, // Random width between 0.5 and 1
        Math.random() * 0.5 + 0.5, // Random height between 0.5 and 1
        Math.random() * 0.5 + 0.5  // Random depth between 0.5 and 1
    );
    const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
    const object = new THREE.Mesh(geometry, material);

    // Random position within the room
    object.position.set(
        Math.random() * roomWidth - roomWidth / 2,
        Math.random() * roomHeight - roomHeight / 2,
        Math.random() * roomDepth - roomDepth / 2
    );

    object.castShadow = true;
    objects.push(object);
    scene.add(object);
}

// Camera positioning
camera.position.set(0, 2, 15);
controls.update();

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
