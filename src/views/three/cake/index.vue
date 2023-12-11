<template>
  <div class="cake-box">
    <div id="cake-three-box" ref="cakeThreeBox"></div>
  </div>
</template>

<script setup>

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ref, onMounted, nextTick } from 'vue';
import cakeImg1 from '@/assets/image/three-js/cake/cake1.png';
import cakeImg2 from '@/assets/image/three-js/cake/cake2.png';
import cakeImg3 from '@/assets/image/three-js/cake/cake3.png';
import cakeImg4 from '@/assets/image/three-js/cake/cake4.png';
import fontText from '@/assets/fonts/font-text.json';

const cakeThreeBox = ref(null);
let scene = null;
let camera = null;
let renderer = null;
let cake = null;

onMounted(() => {
  init();
})

async function init(){
  setBase();

  setLightSource();
  setHelperLine();

  // setCylinder();
  // setCakeGroup();
  setDuck()
  await nextTick()
  render();
  controls();
}

// 初始化场景
function setBase() {
  const width = cakeThreeBox.value.clientWidth;
  const height = cakeThreeBox.value.clientHeight;
  renderer = new THREE.WebGLRenderer(); // 初始化渲染器
  renderer.setSize(width, height);
  renderer.setClearColor(0xFFFFFF, 1);
  cakeThreeBox.value.appendChild(renderer.domElement);

  scene = new THREE.Scene(); // 初始化场景

  //窗口宽高比
  const k = width / height;
  //三维场景显示范围的高度
  const s = 200;
  camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000); // 初始化相机
  camera.position.set(100, 100, 100); // 相机位置
  camera.lookAt(scene.position); // 相机镜头对应位置
}

function setLightSource() {
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
}

function setHelperLine() {
  const axesHelper = new THREE.AxesHelper(1000);
  axesHelper.position.set(0,0,0);
  scene.add(axesHelper);
}

// 添加圆柱体
function setCylinder() {
  const geometry = new THREE.CylinderGeometry(100, 100, 100); 
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,//0xff0000设置材质颜色为红色
  }); 
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.position.set(0,0,0);

  scene.add(mesh);
}

// 设置cake组，之后统一挂载到scene上
function setCakeGroup() {
  cake = new THREE.Group();

  const cakeTexture1 = new THREE.TextureLoader().load(cakeImg1); // TextureLoader 纹理加载器
  const cakeTexture2 = new THREE.TextureLoader().load(cakeImg2);
  const cakeTexture3 = new THREE.TextureLoader().load(cakeImg3);
  const cakeTexture4 = new THREE.TextureLoader().load(cakeImg4);
  

  const cakeMaterail1 = new THREE.MeshBasicMaterial({map: cakeTexture1}); // MeshBasicMaterial 基础材质
  const cakeMaterail2 = new THREE.MeshBasicMaterial({map: cakeTexture2});
  const cakeMaterail3 = new THREE.MeshBasicMaterial({map: cakeTexture3});
  const cakeMaterail4 = new THREE.MeshBasicMaterial({map: cakeTexture4}); 
  // 把图片处理成特殊材质

  const pinkMaterial = new THREE.MeshBasicMaterial({color: 'pink'}); // 侧面材质

  const cakeGeometry1 = new THREE.CylinderGeometry(100, 100, 70, 40); // 上部半径 下部半径 高度 侧面分割次数
  const cakePart1 = new THREE.Mesh(cakeGeometry1, [cakeMaterail1, pinkMaterial, pinkMaterial]);
  // const 圆柱 = new THREE.Mesh(圆柱几何体, [侧面材质, 上面材质, 下面材质]);
  cakePart1.translateY(45)

  const cakeGeometry2 = new THREE.CylinderGeometry(120, 120, 70, 40);
  const cakePart2 = new THREE.Mesh(cakeGeometry2,[cakeMaterail3, pinkMaterial, pinkMaterial]);
  cakePart2.translateY(-25)

  const cakeGeometry3 = new THREE.CylinderGeometry(140, 140, 60, 40);
  const cakePart3 = new THREE.Mesh(cakeGeometry3, [cakeMaterail2, pinkMaterial, pinkMaterial]);
  cakePart3.translateY(-90)

  const cakeGeometry4 = new THREE.CylinderGeometry(160, 160, 10, 40);
  const cakePart4 = new THREE.Mesh(cakeGeometry4, [cakeMaterail4, cakeMaterail4, cakeMaterail4]);
  cakePart4.translateY(-120)

  cake.add(cakePart1)
  cake.add(cakePart2)
  cake.add(cakePart3)
  cake.add(cakePart4)


  // setText()
  scene.add(cake);
}

function setText() {
  const fontLoader = new FontLoader();
  fontLoader.load(fontText, function(font){
    console.log(font, '123')
    let textGeometry = new THREE.TextGeometry('普噗', {
      font: font,
      size: 30,
      height: 5,
      bevelEnabled: true,
      bevelSize: 10,
    })
    const textMaterial = ['white', 'red'].map(color => new THREE.MeshBasicMaterial({color}));

    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.translateY(90)
    text.translateX(-45)

    cake.add(text); 
  })
}

function setDuck() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('/module/Duck/glTF/Duck.gltf', function (gltf) {
    console.log('控制台查看加载gltf文件返回的对象结构', gltf);
    console.log('gltf对象场景属性', gltf.scene);
    // 返回的场景对象gltf.scene插入到threejs场景中
    scene.add(gltf.scene.children[0].children[0]);
  });
}

function render () {
  renderer.render(scene, camera);
  scene.rotation.y += 0.005;
  requestAnimationFrame(render);
}

function controls() {
  new OrbitControls(camera, renderer.domElement);
}

// 1. 创建容器 设置底色  插入到dom中
// 2. 初始化场景 scene
// 3. 设置相机，并固定到场景中
// 4. three 添加元素
// 5. renderer 渲染


</script>
<style lang='scss' scoped>
#cake-three-box{
  width: 100%;
  height: 500px;
}
</style>