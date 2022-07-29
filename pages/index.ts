import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useEffect } from 'react';


function HomePage() {
  //init scene class
  const scene: THREE.Scene = new THREE.Scene()

  //init camera class
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  //init webgl renderer
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //init control module
  const controls = new OrbitControls(camera, renderer.domElement)

  //create a simple wireframe box
  const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
  const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

  // add box to scene
  const box: THREE.Mesh = new THREE.Mesh(geometry, material)
  scene.add(box)

  //init camera position
  camera.position.z = 2;

  //event listener updates the canvas when the window is resized
  window.addEventListener('resize', onWindowResize, false)
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
  }

  //animation loop
  var animate = function () {
    requestAnimationFrame(animate)

    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    controls.update()

    renderer.render(scene, camera)
  };

  function render() {
    renderer.render(scene, camera)
  }
  render()
  animate();

}




export default function IndexPage() {

  //force next to run clientside
  useEffect(() => {
    HomePage();
  })
}
