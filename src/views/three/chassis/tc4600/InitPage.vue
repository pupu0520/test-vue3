<script setup>
import * as THREE from 'three';
import {onMounted, ref} from 'vue';
// import earthImg from '@/assets/image/three-js/earth/earth3.jpg';
// import moonImg from '@/assets/image/three-js/earth/moon.jpg';
// import {setBall} from './ball'
// import {starrySky} from './starry-sky'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


let threeBox = ref(null);
let scene = null;
let camera = null;
let renderer = null;


function setBase() {
  const width = threeBox.value.clientWidth;
  const height = threeBox.value.clientHeight;

  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 1000);
  camera.position.set(100, 100, 300);
  camera.lookAt(0,0,0);
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  threeBox.value.appendChild(renderer.domElement);

  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);

  threeBox.value.appendChild(renderer.domElement)
}


function addCube() {
  const geometry = new THREE.BoxGeometry( 100, 50, 50 ); 
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
  const cube = new THREE.Mesh( geometry, material ); 
  scene.add( cube );
}

function render() {
  renderer.render(scene, camera);
  renderer.setClearColor(0xFFFFFF, 1);
  requestAnimationFrame(render)
}


function control() {
  new OrbitControls(camera, renderer.domElement);
}

function init() {
  setBase()
  addCube()
  render()
  control()
}


onMounted(() => {
  init()
})

</script>
<template>
  <div ref="threeBox" class="three-box"></div>
</template>

<style lang='scss' scoped>
.three-box {
  width: 100%;
  height: 100%;
}
</style>