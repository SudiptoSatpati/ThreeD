import * as THREE from "three";
import "../css/styles.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import skin1 from "../images/skin1.jpg";
import skin2 from "../images/skin2.jpg";
import skin3 from "../images/skin3.jpg";
import skin4 from "../images/skin4.webp";
import skin5 from "../images/skin5.jpg";
import starsTexture from "../images/stars.jpg";

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// Creating a scene
const scene = new THREE.Scene();

//SETTING UP BSCKGROUND
const bckArray = [
  { name: "000000", val: 0x000000 },
  { name: "023245", val: 0x023245 },
  { name: "099999", val: 0x099999 },
  { name: "888888", val: 0x888888 },
  { name: "111111", val: 0x111111 },
];
let bckColor = bckArray[0];
scene.background = new THREE.Color(bckColor.val); // Replace 0x000000 with your desired color

const textureLoader = new THREE.TextureLoader();

// Creating a camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);

//SETTING UP ADD BUTTONs

//Skins

const skinImage1 = textureLoader.load(skin1);
const skinImage2 = textureLoader.load(skin2);
const skinImage3 = textureLoader.load(skin3);
const skinImage4 = textureLoader.load(skin4);
const skinImage5 = textureLoader.load(skin5);

let skinArray = [
  { name: "Default", obj: null },
  { name: "Basket Ball", obj: skinImage1 },
  { name: "Earth", obj: skinImage2 },
  { name: "Illuminati", obj: skinImage3 },
  { name: "Lizard Face", obj: skinImage4 },
  { name: "The Eye", obj: skinImage5 },
];
let skinImage = skinArray[0];

//MATERIAL ARRAY
let materialArray = [
  {
    name: "Standard Material",
    obj: new THREE.MeshStandardMaterial({ color: "#00ff83" }),
  },
  {
    name: "Basic Material",
    obj: new THREE.MeshBasicMaterial({ color: "#00ff83" }),
  },
  {
    name: "Lambert Material",
    obj: new THREE.MeshLambertMaterial({ color: "#00ff83" }),
  },
  {
    name: "Matcap Material",
    obj: new THREE.MeshMatcapMaterial({ color: "#00ff83" }),
  },
  {
    name: "Normal Material",
    obj: new THREE.MeshNormalMaterial(),
  },
  {
    name: "Toon Material",
    obj: new THREE.MeshToonMaterial({ color: "#00ff83" }),
  },
];

let materialType = materialArray[0];

//Position Array

let positionArray = [{ pos: "X+1", val: 3 }];

// Creating object list
//SPHERE
const geometry1 = new THREE.SphereGeometry(3, 64, 64);
const material1 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const sphere = new THREE.Mesh(geometry1, material1);

//KNOT
const geometry2 = new THREE.TorusKnotGeometry(2, 0.8, 140, 42, 2, 6);
const material2 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const knot = new THREE.Mesh(geometry2, material2);

//TORUS
const geometry3 = new THREE.TorusGeometry(2, 0.5, 100, 100);
const material3 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const torus = new THREE.Mesh(geometry3, material3);

//TETRAHEDRON
const geometry4 = new THREE.TetrahedronGeometry(3, 0);
const material4 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const tetra = new THREE.Mesh(geometry4, material4);

//RING SHAPE
const geometry5 = new THREE.RingGeometry(2, 3, 9, 30);
const material5 = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  side: THREE.DoubleSide,
});
const ring = new THREE.Mesh(geometry5, material5);

//POLYHEDRON
const verticesOfCube = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1,
];
const indicesOfFaces = [
  2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3,
  7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
];
const geometry6 = new THREE.PolyhedronGeometry(
  verticesOfCube,
  indicesOfFaces,
  4,
  1
);
const material6 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const poly = new THREE.Mesh(geometry6, material6);

//BOX
const geometry7 = new THREE.BoxGeometry(4, 4, 4, 10, 10, 10);
const material7 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const box = new THREE.Mesh(geometry7, material7);

//Capsule
const geometry8 = new THREE.CapsuleGeometry(1.5, 3, 20, 3);
const material8 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const capsule = new THREE.Mesh(geometry8, material8);

//CONE
const geometry9 = new THREE.ConeGeometry(3, 5, 15, 10, 10, 10);
const material9 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const cone = new THREE.Mesh(geometry9, material9);

//CYLENDER

const geometry10 = new THREE.CylinderGeometry(1, 1, 6, 100, 100, 100);
const material10 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const cylinder = new THREE.Mesh(geometry10, material10);

//Dodecahedron

const geometry11 = new THREE.DodecahedronGeometry(3, 0);
const material11 = new THREE.MeshStandardMaterial({ color: "#00ff83" });
const dodecahedron = new THREE.Mesh(geometry11, material11);

//ARRAY
let shapeArray = [
  { name: "Sphere", obj: sphere, geo: geometry1 },
  { name: "Capsule", obj: capsule, geo: geometry8 },
  { name: "Tetrahedron", obj: tetra, geo: geometry4 },
  { name: "Cube", obj: box, geo: geometry7 },
  { name: "Ring", obj: ring, geo: geometry5 },
  { name: "Dodecahedron", obj: dodecahedron, geo: geometry11 },
  { name: "Polyhedron", obj: poly, geo: geometry6 },
  { name: "Cone", obj: cone, geo: geometry9 },
  { name: "Cylinder", obj: cylinder, geo: geometry10 },
  { name: "Torus", obj: torus, geo: geometry3 },
  { name: "TorusKnot", obj: knot, geo: geometry2 },
];
let shape = shapeArray[0];
scene.add(shape.obj);

//wire frame
let isWire = false;
let isSelected = false;
const wireFunc = () => {
  if (isWire == true) {
    let wireframe = new THREE.WireframeGeometry(shape.geo);
    line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.75;
    line.material.transparent = true;
    scene.add(line);
  } else {
    scene.remove(line);
  }
};

let wireframe = new THREE.WireframeGeometry(shape.geo);
//WIREFRAME
let line = new THREE.LineSegments(wireframe);
line.material.depthTest = false;
line.material.opacity = 0.75;
line.material.transparent = true;

wireFunc();

///WIREFRAME

const addWire = document.querySelector(".wire-btn");
addWire.addEventListener("click", () => {
  if (isWire == true) {
    console.log(isWire);
    isWire = false;
    scene.remove(line);
    addWire.classList.remove("selected");
  } else if (isWire == false) {
    console.log(isWire);
    isWire = true;
    addWire.classList.add("selected");
    wireFunc();
  } else {
    return;
  }
});

//POINT LIGHT
const pointLight = new THREE.PointLight(0xffffff, 100, 100);
pointLight.position.set(0, 10, 3);

//AMBIENT LIGHT
const ambLight = new THREE.AmbientLight(0xffffff); // soft white light
//HEMISPHERE LIGHT
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
//DIRECTIONAL LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, -1, 0);
//Rect LIGHT
const width = 10;
const height = 10;
const intensity = 1;
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(5, 5, 0);
rectLight.lookAt(0, 0, 0);

//ARRAY OF LIGHT
let lightArray = [
  { name: "Rectangular Light", obj: rectLight },
  { name: "Point Light", obj: pointLight },
  { name: "Ambient Light", obj: ambLight },
  { name: "Hemisphere Light", obj: hemiLight },
  { name: "Directional Light", obj: directionalLight },
];

let light = lightArray[0];
scene.add(light.obj);

//Camera distance

let sizeArray = [
  { size: "Normal", val: 20 },
  { size: "Large", val: 16 },
  { size: "Larger", val: 12 },
  { size: "Small", val: 28 },
  { size: "Smaller", val: 36 },
];
let objSize = sizeArray[0];
camera.position.z = objSize.val;

//rotationspeed

let rotationArray = [
  { speed: "Normal", val: 40 },
  { speed: "slow", val: 25 },
  { speed: "Slower", val: 10 },
  { speed: "Fast", val: 75 },
  { speed: "faster", val: 100 },
];

let speedVal = rotationArray[0];

//Material ARRAY

//Details Section
const detailsDivShape = document.querySelector("#details");
detailsDivShape.innerText = `${shape.name}`;

const detailsDivLight = document.querySelector("#details-light");
detailsDivLight.innerText = `${light.name}`;

const detailsDivSize = document.querySelector("#details-size");
detailsDivSize.innerText = `${objSize.size}`;

const detailsDivSpeed = document.querySelector("#details-speed");
detailsDivSpeed.innerText = `${speedVal.speed}`;

const detailsDivMaterial = document.querySelector("#details-material");
detailsDivMaterial.innerText = `${materialType.name}`;

const detailsDivSkin = document.querySelector("#details-skin");
detailsDivSkin.innerText = `${skinImage.name}`;

const detailsDivBck = document.querySelector("#details-bck");
detailsDivBck.innerText = `${bckColor.name}`;

// Renderer
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(3);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = speedVal.val;

// Setting up the Change shape button
const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  if (selectedOption == "Change Shape") {
    scene.remove(line);
    scene.remove(shape.obj);
    let index = shapeArray.findIndex((s) => s.obj === shape.obj);
    if (index == shapeArray.length - 1) {
      shape = shapeArray[0];
    } else {
      shape = shapeArray[index + 1];
    }
    shape.obj.material = materialType.obj;
    scene.add(shape.obj);
    gsap.fromTo(
      shape.obj.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1 }
    );
    detailsDivShape.innerText = `${shape.name}`;
    changeSkin(skinImage);
    wireframe = new THREE.WireframeGeometry(shape.geo);
    line = new THREE.LineSegments(wireframe);
    line.material.depthTest = true;
    line.material.opacity = 0.75;
    line.material.transparent = true;

    wireFunc();
  }
  console.log(selectedOption);
  if (selectedOption == "Change Light") {
    scene.remove(light.obj);
    let index = lightArray.findIndex((l) => l.obj === light.obj);
    if (index == lightArray.length - 1) {
      light = lightArray[0];
    } else {
      light = lightArray[index + 1];
    }
    scene.add(light.obj);
    detailsDivLight.innerText = `${light.name}`;
  }
  if (selectedOption == "Change Size") {
    let index = sizeArray.findIndex((s) => s.val === objSize.val);
    console.log(index);
    if (index == sizeArray.length - 1) {
      objSize = sizeArray[0];
    } else {
      objSize = sizeArray[index + 1];
    }

    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: objSize.val,
      duration: 1, // Duration of 1 second for the transition
      onUpdate: () => {
        camera.updateProjectionMatrix(); // Update the camera projection matrix
      },
    });

    detailsDivSize.innerText = `${objSize.size}`;
  }

  if (selectedOption == "Change Rotation Speed") {
    let index = rotationArray.findIndex((r) => r.val === speedVal.val);
    if (index == rotationArray.length - 1) {
      speedVal = rotationArray[0];
    } else {
      speedVal = rotationArray[index + 1];
    }
    console.log(speedVal);
    controls.autoRotateSpeed = speedVal.val;
    detailsDivSpeed.innerText = `${speedVal.speed}`;
  }

  if (selectedOption == "Change Material") {
    let index = materialArray.findIndex((m) => m.obj === materialType.obj);
    if (index == materialArray.length - 1) {
      materialType = materialArray[0];
    } else {
      materialType = materialArray[index + 1];
    }
    console.log(speedVal);

    shape.obj.material = materialType.obj;
    detailsDivMaterial.innerText = `${materialType.name}`;
    changeSkin(skinImage);
    //WIREFRAME
  }

  if (selectedOption == "Change Skins") {
    let index = skinArray.findIndex((s) => s.obj === skinImage.obj);
    if (index == skinArray.length - 1) {
      skinImage = skinArray[0];
      changeSkin(skinImage);
    } else {
      skinImage = skinArray[index + 1];
      changeSkin(skinImage);
    }
    detailsDivSkin.innerText = `${skinImage.name}`;
  }

  if (selectedOption == "Change Background") {
    let index = bckArray.findIndex((b) => b.val === bckColor.val);
    if (index == bckArray.length - 1) {
      bckColor = bckArray[0];
    } else {
      bckColor = bckArray[index + 1];
    }
    const newColor = new THREE.Color(bckColor.val);
    const currentColor = scene.background.clone();

    gsap.to(currentColor, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
      duration: 1,
      onUpdate: () => {
        scene.background.set(currentColor);
      },
    });
    detailsDivBck.innerText = `${bckColor.name}`;
  }
});

// Size Management
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

// Animation
const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();

// GSAP timeline magic
const t1 = gsap.timeline({ defaults: { duration: 1 } });

t1.fromTo(shape.obj.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo("nav", { y: "-100%" }, { y: "0%" });
t1.fromTo(".title", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".btn", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".deep", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".details", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".details-light", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".details-camera", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".details-speed", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".details-material", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".details-skin", { opacity: 0 }, { opacity: 1 });
t1.fromTo(".details-bck", { opacity: 0 }, { opacity: 1 });

// Mouse drag animation
let mouseDown = false;

window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    let rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      Math.round(Math.random() * 255),
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(shape.obj.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});

// HTML DOM manipulation for explore button
const expDiv = document.querySelector(".explore-div");
const exp = document.querySelector("#explore-btn");
let selectedOption = "Change Shape";
let detailsVisible = true;

exp.addEventListener("click", () => {
  const t2 = gsap.timeline({ defaults: { duration: 1.5 } });

  if (expDiv.innerHTML.trim() === "") {
    // Show the content
    expDiv.innerHTML = `
      <div class="explore">
        <ul>
          <li class="op1">Change Shape</li>
          <li class="op2">Change Light</li>
          <li class="op3">Change Size</li>
          <li class="op4">Change Rotation Speed</li>
          <li class="op5">Change Material</li>
          <li class="op6">Change Skins</li>
          <li class="op7">Change Background</li>
          <li class="op8">${
            detailsVisible ? "Hide Details" : "Show Details"
          }</li>
        </ul>
      </div>`;
    t2.fromTo(".explore", { opacity: 0 }, { opacity: 1 });

    // document.querySelector(".op1").classList.add("selected");
    // Apply the 'selected' class to the previously selected option
    document.querySelectorAll(".explore ul li").forEach((li) => {
      if (li.innerText === selectedOption) {
        li.classList.add("selected");
      }
    });

    document.querySelectorAll(".explore ul li").forEach((li) => {
      li.addEventListener("click", (e) => {
        document.querySelectorAll(".explore ul li").forEach((li) => {
          li.classList.remove("selected");
        });
        e.target.classList.add("selected");
        selectedOption = e.target.innerText;
      });
    });

    // Add event listener for the toggle functionality

    const detailsSection = document.querySelector(".details-section");
    document.querySelector(".op8").addEventListener("click", function () {
      if (this.textContent === "Hide Details") {
        detailsSection.style.display = "none";
        this.textContent = "Show Details";
        detailsVisible = false;
      } else {
        detailsSection.style.display = "block";
        this.textContent = "Hide Details";
        detailsVisible = true;
      }
    });
    detailsSection.style.transition = "all 1s ease";
  } else {
    // Hide the content
    t2.fromTo(
      ".explore",
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: () => {
          expDiv.innerHTML = "";
        },
      }
    );
  }
});

const changeSkin = (skin) => {
  if (skinImage.name === "Default") {
    shapeArray.forEach((shape) => {
      shape.obj.material.map = skinImage.obj;
      shape.obj.material.color.set("#00ff83");
      shape.obj.material.needsUpdate = true; // Ensure material update
    });
  } else {
    shapeArray.forEach((shape) => {
      shape.obj.material.map = skinImage.obj;
      shape.obj.material.color.set("#ffffff");
      shape.obj.material.needsUpdate = true; // Ensure material update
    });
  }
};

//Add Sectiomn CREATE
const createBtn = document.getElementById("create-btn");
const createBtnsDiv = document.querySelector(".create-btns");

createBtn.addEventListener("click", () => {
  if (createBtnsDiv.classList.contains("show")) {
    createBtnsDiv.classList.remove("show");
  } else {
    createBtnsDiv.classList.add("show");
  }
});

const cubeTextureLoader = new THREE.CubeTextureLoader();

const starsBtn = document.querySelector(".stars-btn");
let isStarBtnOn = false;
starsBtn.addEventListener("click", () => {
  if (isStarBtnOn == false) {
    isStarBtnOn = true;
    scene.background = cubeTextureLoader.load([
      starsTexture,
      starsTexture,
      starsTexture,
      starsTexture,
      starsTexture,
      starsTexture,
    ]);
    controls.autoRotateSpeed = 0;
    starsBtn.classList.add("selected");
  } else {
    isStarBtnOn = false;
    scene.background = new THREE.Color(bckColor.val); // Replace 0x000000 with your desired color
    starsBtn.classList.remove("selected");
    controls.autoRotateSpeed = speedVal.val;
  }
});
