import * as THREE from 'three';
import earthImg from '@/assets/image/three-js/earth/earth3.jpg';


export const setBall = (
  img = earthImg,
  sphere = [100, 32, 16]
) => {
  const geometry = new THREE.SphereGeometry(...sphere);
  const texture = new THREE.TextureLoader().load(img);
  const material = new THREE.MeshBasicMaterial({
    map: texture
  }); 
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}