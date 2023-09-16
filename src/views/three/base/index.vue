<template>
  <div ref="threeBox" class="three-box">
  </div>
</template>

<script setup>
import * as THREE from 'three';
import {ref, onMounted} from 'vue';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene = null;
let camera = null;
let renderer = null;
const threeBox = ref(null);

onMounted(() => {
  baseInfo();
  setHelpLine();
  setBox();
  setLightSource();
  render();
  control();
})

function baseInfo(){
  const width = threeBox.value.clientWidth;
  const height = threeBox.value.clientHeight;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 1000);
  camera.position.set(200, 200, 200);

  camera.lookAt(0, 0, 0);

  // camera.position.set(-1000, 0, 0); // 设置相机位置
  // camera.lookAt(-2000, 0, 0); // 设置相机聚焦位置
  // 相机方向和物体位置相反物体显示不出来，如果使用OrbitControls会正常显示

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  threeBox.value.appendChild(renderer.domElement)
}

function setHelpLine() {
  const axesHelper = new THREE.AxesHelper(1050);
  scene.add(axesHelper);
}

function setBox() {
  const geometry = new THREE.BoxGeometry( 30, 20, 30 ); // BoxGeometry 创建方块
  const material = new THREE.MeshLambertMaterial({ // MeshBasicMaterial  基础材质不受光源影响
    color: 0xff0000, //设置材质颜色
    transparent: false,//开启透明
    opacity: 1,//设置透明度
  });
  const cube = new THREE.Mesh( geometry, material ); 
  scene.add(cube);
}
document.getElementById

function setLightSource() {
  const pointLight = new THREE.AmbientLight(0xffffff, 1, 0, 0);
  pointLight.position.set(300,300,300);
  scene.add(pointLight);
}

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render);
}

function control() {
  new OrbitControls(camera, renderer.domElement); // 必须跟requestAnimationFrame 一块使用
}

</script>
<style lang='scss' scoped>
.three-box {
  width: 500px;
  height: 500px;
}
</style>