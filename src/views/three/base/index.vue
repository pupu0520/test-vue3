<template>
  <div ref="threeBox" class="three-box">
  </div>
</template>

<script setup>
import * as THREE from 'three';
import {ref, onMounted} from 'vue';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene = null;
let camera = null;
let renderer = null;
const threeBox = ref(null);
let gui = null;
let cube = null;

onMounted(() => {
  baseInfo();
  gui = new GUI();
  setHelpLine();
  // setBox();
  // setBox1();
  // setLine();
  setSphere();

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
  cube = new THREE.Mesh( geometry, material ); 
  scene.add(cube);
}

function setBox1() {
  const geometry = new THREE.BufferGeometry();
  //类型化数组创建顶点数据
  const vertices = new Float32Array([
      0, 0, 0, //顶点1坐标
      50, 0, 0, //顶点2坐标
      0, 100, 0, //顶点3坐标
      0, 0, 10, //顶点4坐标
      0, 0, 100, //顶点5坐标
      50, 0, 10, //顶点6坐标
  ]);
  geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

  const material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 10.0 //点对象像素尺寸
  });
  const points = new THREE.Points(geometry, material); //点模型对象
  scene.add(points);
}

function setLine() {
  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });

  const points = [];
  points.push( new THREE.Vector3( - 10, 40, 0 ) );
  points.push( new THREE.Vector3( 0, 50, 0 ) );
  points.push( new THREE.Vector3( 10, 40, 0 ) );

  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  const line = new THREE.LineLoop( geometry, material );
  scene.add( line );
}

function setSphere() {
  const geometry = new THREE.SphereGeometry( 50, 32, 16 );
  const material = new THREE.MeshBasicMaterial({ // MeshBasicMaterial  基础材质不受光源影响
    color: 0xff0000, //设置材质颜色
    transparent: true,//开启透明
    // opacity: 0.4,//设置透明度
  });
  cube = new THREE.Mesh( geometry, material ); 
  scene.add(cube);
}

function setLightSource() {
  const pointLight = new THREE.AmbientLight(0xffffff, 1, 0, 0);
  pointLight.position.set(300,300,300);
  scene.add(pointLight);
}

function render() {
  renderer.render(scene, camera);
  // scene.rotateX(Math.PI / 1000); // 场景围绕着x轴旋转
  cube.rotateZ(Math.PI / 1000);
  requestAnimationFrame(render);
}




function control() {
  const controls = new OrbitControls(camera, renderer.domElement); // 必须跟requestAnimationFrame 一块使用

  // controls.addEventListener('change', function () {
  //   // 浏览器控制台查看相机位置变化
  //   console.log('camera.position',camera.position);
  //   render();
  // });

  
  gui.add(cube.position, 'x', 0, 180);
  gui.add(cube.position, 'y', 0, 180);
  gui.add(cube.position, 'z', 0, 180);
}

</script>
<style lang='scss' scoped>
.three-box {
  width: 500px;
  height: 500px;
}
</style>