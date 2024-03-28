// three js code goes here
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const canvas = document.querySelector("#container3D");

canvas.appendChild(renderer.domElement);

// Camera positioning
camera.position.set(0, 0, 4.3);
camera.lookAt(0, 0, 0);

// Responsive canvas
const resizeWindow = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", resizeWindow);

// Loading the 3D model
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");
loader.setDRACOLoader(dracoLoader);

async function loadModel() {
  return new Promise((resolve, reject) => {
    loader.load(
      "porsche_gt3.glb",
      (glb) => {
        const mesh = glb.scene;
        mesh.position.set(0, -1, -5);
        mesh.rotation.set(0.15, 0.7, 0);
        resolve(mesh);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
}

async function init() {
  try {
    const mesh = await loadModel();
    // gsap code
    let tl = gsap.timeline();
    tl.to(mesh.position, { z: 0, duration: 0.3, ease: "expoScale" });
    tl.from(mesh.rotation, { y: -10, duration: 2 });
    scene.add(mesh);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

init();

// lights

const directionalLight = new THREE.DirectionalLight("#fff", 5);
directionalLight.position.set(0, 10, 5);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight("#fff", 5);
directionalLight2.position.set(10, 20, 5);
scene.add(directionalLight2);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// For the navbar
const hamburger = document.querySelector("#hamburger");
const navItems = document.querySelector(".nav-items");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");

hamburger.addEventListener("click", () => {
  let visibility = navItems.getAttribute("data-visible");
  if (visibility === "false") {
    navItems.setAttribute("data-visible", true);
    navItems.style.transform = "translate(-5%,50%)";
    hamburger.style.transform = "rotate(360deg)";
    bar1.style.transform = "rotate(45deg) translate(38%, 31%)";
    bar1.style.width = "25px";
    bar3.style.width = "25px";
    bar2.style.display = "none";
    bar3.style.transform = "rotate(-45deg) translate(-1%, 7%)";
  } else if (visibility === "true") {
    navItems.setAttribute("data-visible", false);
    bar1.style.transform = "rotate(360deg) translate(0, 0)";
    bar1.style.width = "15px";
    bar3.style.width = "15px";
    bar2.style.display = "block";
    bar3.style.transform = "rotate(-360deg) translate(0, 0)";
  }
});

// gsap code
gsap.from(".card", {
  opacity: 0,
  y: 100,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".discover-cards",
    start: "top center",
    // markers: true,
  },
});

gsap.from(".card-util", {
  opacity: 0,
  y: 100,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".util",
    start: "top center",
    // markers: true,
  },
});
