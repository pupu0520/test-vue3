import * as THREE from 'three';

function generateSprite() {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  
  const context = canvas.getContext('2d')
  // 创建颜色渐变
  const gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  )
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.2, 'rgba(0,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(0,0,64,1)')
  gradient.addColorStop(1, 'rgba(0,0,0,1)')
  
  // 绘制方形
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)
  // 转为纹理
  const texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  return texture
}

export const starrySky = () => {
  const positions = []
  const colors = []
  // 创建 几何体
  const geometry = new THREE.BufferGeometry()
  for (let i = 0; i < 10000; i++) {
    let vertex = new THREE.Vector3()
    vertex.x = Math.random() * 2 - 1
    vertex.y = Math.random() * 2 - 1
    vertex.z = Math.random() * 2 - 1
    positions.push(vertex.x, vertex.y, vertex.z)
  }
  // 对几何体 设置 坐标 和 颜色
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  // 默认球体
  geometry.computeBoundingSphere()

  // ------------- 1 ----------
  // 星星资源图片
  // ParticleBasicMaterial 点基础材质
  var starsMaterial = new THREE.MeshBasicMaterial({
    map: generateSprite(),
    size: 2,
    transparent: true,
    opacity: 1,
    //true：且该几何体的colors属性有值，则该粒子会舍弃第一个属性--color，而应用该几何体的colors属性的颜色
    // vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })
  // 粒子系统 网格
  let stars = new THREE.Points(geometry, starsMaterial)
  return stars;
}