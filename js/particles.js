import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Set sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  10000
);
camera.position.z = 45;

// Set up canvas and renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Enable smooth camera movement

// Particle parameters
const particleCount = 10000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);
const color = new THREE.Color();

for (let i = 0; i < particleCount; i++) {
  const x = (Math.random() - 0.5) * 20; // Initially further away
  const y = (Math.random() - 0.5) * 20;
  const z = (Math.random() - 0.5) * 20;

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 0] = z;

  velocities[i * 3] = (Math.random() - 0.5) * 0.02;
  velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
  velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

  color.setHSL(Math.random(), 1.0, 0.5);
  colors[i * 3] = color.r;
  colors[i * 3 + 1] = color.g;
  colors[i * 3 + 2] = color.b;
}

particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
particles.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 0.05,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.75,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Mouse coordinates
const mouse = new THREE.Vector2();
const target = new THREE.Vector3();
const raycaster = new THREE.Raycaster();

// Event listeners
window.addEventListener("resize", onWindowResize, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onClick, false);
window.addEventListener("dblclick", onDoubleClick, false);
window.addEventListener("contextmenu", onRightClick, false);

let burst = false;
let gather = false;
let shape = "random";

function onWindowResize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
  burst = true;
  setTimeout(() => {
    burst = false;
  }, 1000);
}

function onDoubleClick(event) {
  gather = true;
  setTimeout(() => {
    gather = false;
  }, 2000);
}

function onRightClick(event) {
  event.preventDefault();
  const shapes = ["sphere", "cube", "torus", "torusKnot"];
  if (shape !== "random") {
    burst = true;
    setTimeout(() => {
      burst = false;
      shape = "random";
    }, 1000);
  } else {
    shape = shapes[Math.floor(Math.random() * shapes.length)];
  }
}

// Helper functions to generate shapes
function generateShape(shape, i, positions) {
  switch (shape) {
    case "sphere":
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      positions[i * 3] = 5 * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = 5 * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = 5 * Math.cos(phi);
      break;
    case "cube":
      positions[i * 3] = (i % 10) - 5;
      positions[i * 3 + 1] = (Math.floor(i / 10) % 10) - 5;
      positions[i * 3 + 2] = (Math.floor(i / 100) % 10) - 5;
      break;
    case "torus":
      const torusRadius = 2;
      const torusTube = 1;
      const u = (i / particleCount) * Math.PI * 2;
      const v = ((i % 100) / 100) * Math.PI * 2;
      positions[i * 3] = (torusRadius + torusTube * Math.cos(v)) * Math.cos(u);
      positions[i * 3 + 1] =
        (torusRadius + torusTube * Math.cos(v)) * Math.sin(u);
      positions[i * 3 + 2] = torusTube * Math.sin(v);
      break;
    case "torusKnot":
      const torusKnotRadius = 1.5;
      const torusKnotTube = 0.5;
      const p = 2;
      const q = 3;
      const t = (i / particleCount) * Math.PI * 2 * q;
      positions[i * 3] =
        (torusKnotRadius + torusKnotTube * Math.cos(p * t)) * Math.cos(t);
      positions[i * 3 + 1] =
        (torusKnotRadius + torusKnotTube * Math.cos(p * t)) * Math.sin(t);
      positions[i * 3 + 2] = torusKnotTube * Math.sin(p * t);
      break;
    default:
      positions[i * 3] += (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 1] += (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 2] += (Math.random() - 0.5) * 0.1;
  }
}

// Animate
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update particle positions based on mouse movement
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(particleSystem);
  const positions = particleSystem.geometry.attributes.position.array;
  const velocities = particleSystem.geometry.attributes.velocity.array;

  if (intersects.length > 0) {
    target.copy(intersects[0].point);
  }

  for (let i = 0; i < particleCount; i++) {
    const dx = target.x - positions[i * 3];
    const dy = target.y - positions[i * 3 + 1];
    const dz = target.z - positions[i * 3 + 2];

    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (burst) {
      velocities[i * 3] += (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 1] += (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 2] += (Math.random() - 0.5) * 0.5;
    } else if (gather) {
      const factor = 1 / (distance + 1);
      velocities[i * 3] += dx * factor * 0.1;
      velocities[i * 3 + 1] += dy * factor * 0.1;
      velocities[i * 3 + 2] += dz * factor * 0.1;
    } else {
      const factor = 1 / (distance + 1);
      velocities[i * 3] += dx * factor * 0.01;
      velocities[i * 3 + 1] += dy * factor * 0.01;
      velocities[i * 3 + 2] += dz * factor * 0.01;
    }

    positions[i * 3] += velocities[i * 3];
    positions[i * 3 + 1] += velocities[i * 3 + 1];
    positions[i * 3 + 2] += velocities[i * 3 + 2];

    // Generate shapes
    generateShape(shape, i, positions);
  }

  particleSystem.geometry.attributes.position.needsUpdate = true;

  controls.update(); // Update controls

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
