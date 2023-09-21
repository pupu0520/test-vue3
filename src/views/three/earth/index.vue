<template>
  <div ref="threeBox" class="three-box"></div>
</template>

<script setup>
import * as THREE from 'three';
import {onMounted, ref} from 'vue';
import earthImg from '@/assets/image/three-js/earth/earth3.jpg';
import moonImg from '@/assets/image/three-js/earth/moon.jpg';
import {setBall} from './ball'
import {starrySky} from './starry-sky'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
let threeBox = ref(null);
let scene = null;
let camera = null;
let renderer = null;
let earth = null;
let moon = null;
let cake = null;

onMounted(() => {
  init();
})

function init() {
  setBase();
  setEarth();
  setMoon();
  setStarrySky();
  render();
  control();
}

function setBase() {
  const width = threeBox.value.clientWidth;
  const height = threeBox.value.clientHeight;

  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 1000);
  camera.position.set(300, 300, 300);
  camera.lookAt(0,0,0);
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  threeBox.value.appendChild(renderer.domElement);

  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);

  threeBox.value.appendChild(renderer.domElement)
}

function setEarth() {
  earth = setBall(earthImg, [50, 32, 16]);
  earth.position.set(0,0,0)
  // scene.add(earth);
}

function setMoon() {
  moon = setBall(moonImg, [20, 32, 16]);
  moon.position.set(100, 0, 0);
  // scene.add(moon);

  cake = new THREE.Group();
  cake.add(earth);
  cake.add(moon);
  scene.add(cake)
}

function setStarrySky() {
  const stars = starrySky();
  stars.scale.set(300, 300, 300)
  scene.add(stars)
}

function render() {
  renderer.render(scene, camera);
  earth.rotateY(Math.PI / 720);
  moon.rotateY(Math.PI / 720);
  cake.rotateY(Math.PI / 720);
  requestAnimationFrame(render)
}

function control() {
  new OrbitControls(camera, renderer.domElement);
}
</script>
<style lang='scss' scoped>
.three-box {
  width: 100%;
  height: 100%;
}
</style>