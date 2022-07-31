import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import React from 'react';


function HomePage() {

  const manager = new THREE.LoadingManager();
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
  };
  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
  };
  manager.onError = function (url) {

    console.log('There was an error loading ' + url);

  };

  manager.onLoad = function () {
    //meat
    console.log('Loading complete!');

  };

  const loader = new THREE.TextureLoader(manager);
  loader.load('/grid.png', function (object) {

    //

  });



  // const textureLoader = new THREE.TextureLoader();
  const gridTexture: THREE.Texture = textureLoader.load("/grid.png");
  const heightTexture: THREE.Texture = textureLoader.load("/displacement-7.png");
  const metalnessTexture: THREE.Texture = textureLoader.load("/metalness-2.png");
  const bgTexture = textureLoader.load('/background.jpg');

  //init scene class
  const scene = new THREE.Scene()


  scene.background = bgTexture;


  //init webgl renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(1, 2, 24, 24);


  const material = new THREE.MeshStandardMaterial({
    map: gridTexture,
    displacementMap: heightTexture,
    displacementScale: 0.4,
    metalness: 1,
    metalnessMap: metalnessTexture,
    roughness: 0.5,
  });

  const plane = new THREE.Mesh(geometry, material);
  const plane2 = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI * 0.5;
  plane2.rotation.x = -Math.PI * 0.5;

  plane.position.y = 0.0;
  plane.position.z = 0.15;
  plane2.position.y = 0.0;
  plane2.position.z = -1.85;
  scene.add(plane);
  scene.add(plane2);



  const fog = new THREE.Fog("#000000", 1, 2.5);
  scene.fog = fog;

  // Lights
  const ambientLight = new THREE.AmbientLight("#ffffff", 10);
  scene.add(ambientLight);


  const spotlight = new THREE.SpotLight(
    "#d53c3d",
    50,
    25,
    Math.PI * 0.1,
    0.25
  );
  spotlight.position.set(0.5, 0.75, 2.1);
  spotlight.target.position.x = -0.25;
  spotlight.target.position.y = 0.25;
  spotlight.target.position.z = 0.25;
  scene.add(spotlight);
  scene.add(spotlight.target);

  const spotlight2 = new THREE.SpotLight(
    "#d53c3d",
    50,
    25,
    Math.PI * 0.1,
    0.25
  );
  spotlight2.position.set(-0.5, 0.75, 2.1);
  spotlight2.target.position.set(.25, .25, .25);
  scene.add(spotlight2);
  scene.add(spotlight2.target);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Base camera
  const camera = new THREE.PerspectiveCamera(
    60,
    sizes.width / sizes.height,
    0.01,
    20
  );

  //camera xyz pos
  camera.position.set(0, 0.06, 1.1);
  scene.add(camera);


  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const effectComposer = new EffectComposer(renderer);
  effectComposer.setSize(sizes.width, sizes.height);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);

  const rgbShiftPass = new ShaderPass(RGBShiftShader);
  rgbShiftPass.uniforms["amount"].value = 0.001;

  effectComposer.addPass(rgbShiftPass);
  const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
  effectComposer.addPass(gammaCorrectionPass);

  let bloomResolution = new THREE.Vector2(window.innerWidth, window.innerHeight)
  const bloomPass = new UnrealBloomPass(bloomResolution, 1, 1, 1);

  effectComposer.addPass(bloomPass);


  //init control module
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true;


  //event listener updates the canvas when the window is resized
  window.addEventListener('resize', onWindowResize, false)
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    effectComposer.setSize(sizes.width, sizes.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  }

  const clock = new THREE.Clock();
  //animation loop
  let animate = function (): void {
    requestAnimationFrame(animate)
    const elapsedTime = clock.getElapsedTime();

    // Update plane position
    let planeSpeed: number = 0.12;
    plane.position.z = (elapsedTime * planeSpeed) % 2;
    plane2.position.z = ((elapsedTime * planeSpeed) % 2) - 2;

    effectComposer.render();

    // controls.update()

    renderer.render(scene, camera)
  };

  function render(): void {
    renderer.render(scene, camera)
  }
  render()
  animate();
}

function Content() {
  return (
    <div className="info">
      <div className="container">
        <div className="row" style={{ display: "inline-block" }}>
          <div className="col">
            <div className="typewriter">
              <h1>Richard Breslin</h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center"  >
          <div className="col-md-auto">
            <a href="https://github.com/richardbreslin"><img src="/github.png" className="favi-link"></img></a>
            <a href="https://www.linkedin.com/in/r-breslin/"><img src="/linkedin.png" className="favi-link"></img></a>
            <a href="mailto: richardbreslin@wayne.edu"><img src="/email2.png" className="favi-link"></img></a>
            <a href="https://resume.r1ch.dev"><img src="/cv.png" className="favi-link"></img></a>
          </div>
        </div>
      </div>

    </div >
  );
}

type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};

export default class IndexPage extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0,
  };
  componentDidMount(): void {
    HomePage();
  }
  render() {
    return (
      <div>
        <Content></Content>
      </div>
    );
  }
}