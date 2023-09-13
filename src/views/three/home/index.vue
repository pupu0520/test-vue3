<template>
  <div class="three-box" ref="threeBox"></div>
</template>

<script setup>
import * as THREE from 'three';
import { ref, onMounted } from 'vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import top from '@/assets/image/three-js/home/top.jpg';
import bottom from '@/assets/image/three-js/home/bottom.jpg';
import front from '@/assets/image/three-js/home/front.jpg';
import back from '@/assets/image/three-js/home/back.jpg';
import left from '@/assets/image/three-js/home/left.jpg';
import right from '@/assets/image/three-js/home/right.jpg';


const threeBox = ref(null);
let scene = null;
let camera = null;
let renderer = null;

onMounted(() => {
  init()
})
function init() {
  setBase();
  setImg();

  render();
  control();
}

function setBase() {
  console.log(threeBox)
  const width = threeBox.value.clientWidth;
  const height = threeBox.value.clientHeight;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  threeBox.value.appendChild(renderer.domElement)

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(scene.position);
}

function setImg() {
  let urls = [
    left,
    right,
    top,
    bottom,
    front,
    back
  ];
  let cubeTexture = new THREE.CubeTextureLoader().load(urls);
  scene.background = cubeTexture;
}

function render() {
  renderer.render(scene, camera);
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