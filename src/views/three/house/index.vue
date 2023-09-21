<template>
  <div class="full-all" @click="changeSize">全屏</div>
  <div ref="threeBox" class="three-box" :class="fullAll ? '' : 'half-box'"></div>
</template>

<script setup>
import * as THREE from 'three';
import {ref, onMounted, nextTick} from 'vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createHouse } from './createHouse.js';
import grass from '@/assets/image/three-js/house/grass.jpg';


let fullAll = ref(true);
let scene = null;
let camera = null;
let renderer = null;
let threeBox = ref(null);

onMounted(() => {
  init();
})


function init() {
  setBase();
  setHelperLine();
  // setBox();
  setGrass(); // 设置草坪
  // setFog(); // 设置雾气 
  createHouse(scene);
  render();
  setControl();
}


function setBase() {
  const width = threeBox.value.clientWidth;
  const height = threeBox.value.clientHeight;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 1000);
  camera.position.set(50, 300, 500);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(0xFFFFFF, 1); // 设置背景色

  threeBox.value.appendChild(renderer.domElement);
}

function setHelperLine() {
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);
}

function setBox() {
  const geometry = new THREE.BoxGeometry(20, 20, 20);
  const material =  new THREE.MeshBasicMaterial({
    color: 0xff0000
  });

  const box = new THREE.Mesh(geometry, material);

  scene.add(box);
}

function setGrass() {
  const plane = new THREE.PlaneGeometry(10000, 10000);
  const texture = new THREE.TextureLoader().load(grass);   
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 100, 100 );
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide, // 平面几何体 默认单面可见
  });
  const grassBox = new THREE.Mesh(plane, material);

  grassBox.rotation.x = -0.5 * Math.PI;
  scene.add(grassBox);
}

// 设置雾气
function setFog() {
  scene.fog = new THREE.Fog(0xffffff, 10, 1500);
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function setControl() {
  new OrbitControls(camera, renderer.domElement);
}

async function changeSize() {
  fullAll.value = !fullAll.value;
  nextTick();
  const width = threeBox.value.clientWidth;
  const height = threeBox.value.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
</script>
<style lang='scss' scoped>

.three-box {
  width: 100%;
  height: 100%;
}

.half-box {
  width: 50%;
  height: 50%;
}
</style>