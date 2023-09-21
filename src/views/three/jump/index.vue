<template>
  <div class="three-box" ref="threeBox">
  </div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted, ref } from 'vue';


const threeBox = ref(null);
let width = 0;
let height = 0;
let camera = null;
let scene = null;
let renderer = null;
let directionalLight = null; // 平行光
let player = null;


onMounted(() => {
  init();
})

function init() {
  setThreeSize() // 设置容器大小
  setBase();
  setLightSource()
  setHelperLine()

  
  createCube(0, 0);
  createCube(0, -100);
  createPlayer()

  render()

  new OrbitControls(camera, renderer.domElement);
}

function setThreeSize() {
  width = threeBox.value.clientWidth;
  height = threeBox.value.clientHeight;
}

function setBase() {
  // 透视相机
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000); // 透视相机，
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true }); // { antialias: true } 去除锯齿

  renderer.setSize(width, height);
  renderer.setClearColor(0x333333); // 整体背景颜色

  camera.position.set(100, 100, 100);
  camera.lookAt(scene.position);

  threeBox.value.appendChild(renderer.domElement);
}

function setLightSource() {
  // 光源
  directionalLight  = new THREE.DirectionalLight( 0xffffff );  // PointLight  点光源  // DirectionalLight 平行光
  directionalLight.position.set(40, 100, 60); // 设置光源位置
  scene.add(directionalLight);
}

function setHelperLine() {
  const axesHelper = new THREE.AxesHelper( 1000 );
  axesHelper.position.set(0,0,0);
  scene.add( axesHelper );
}

function createCube(x, z) {
  const geometry = new THREE.BoxGeometry( 30, 20, 30 ); // BoxGeometry 创建方块
  const material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
  const cube = new THREE.Mesh( geometry, material ); 
  cube.position.x = x;
  cube.position.z = z;
  scene.add( cube );
}


function createPlayer() {
  const geometry = new THREE.BoxGeometry( 5, 20, 5 );
  const material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    shininess: 20, //高光部分的亮度，默认30
    specular: 0x444444, //高光部分的颜色
  });
  player = new THREE.Mesh( geometry, material ); 
  player.position.x = 0;
  player.position.y = 17.5; // 因为添加的元素都是在正中心
  player.position.z = 0;
  scene.add( player )
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
</script>
<style lang='scss' scoped>
.three-box {
  width: 100%;
  height: 100%;
}
</style>