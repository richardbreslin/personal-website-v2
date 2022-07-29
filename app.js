// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.143.0/build/three.min.js"
// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.143.0/examples/jsm/controls/OrbitControls.js"
// import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.143.0/examples/jsm/postprocessing/RenderPass.js"
// import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.143.0/examples/jsm/postprocessing/EffectComposer.js"
// import { GammaCorrectionShader } from "https://cdn.jsdelivr.net/npm/three@0.143.0/examples/jsm/shaders/GammaCorrectionShader.js"
// import { ShaderPass } from "https://cdn.jsdelivr.net/npm/three@0.143.0/examples/jsm/postprocessing/ShaderPass.js"
// import { RGBShiftShader } from "https://cdn.jsdelivr.net/npm/three@0.143.0/examples/jsm/shaders/RGBShiftShader.js"
// import { UnrealBloomPass } from "https://cdn.jsdelivr.net/npm/three@0.143.0/examples/jsm/postprocessing/UnrealBloomPass.js"




// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene

function Index() {
  var scene = new THREE.Scene();

  // Create a basic perspective camera
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4;

  // var camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // camera.position.z = 4;

  // Create a renderer with Antialiasing
  var renderer = new THREE.WebGLRenderer({ antialias: true });

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // const controls = new OrbitControls(camera2, renderer.domElement);

  // Configure renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);

  // ------------------------------------------------
  // FUN STARTS HERE
  // ------------------------------------------------

  // Create a Cube Mesh with basic material
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
  var cube = new THREE.Mesh(geometry, material);

  // Add cube to Scene
  scene.add(cube);

  // Render Loop
  var render = function () {
    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
  };

  render();
}

Index()
