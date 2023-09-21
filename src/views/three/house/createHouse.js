import * as THREE from 'three';
import floorImg from '@/assets/image/three-js/house/wood.jpg';
import wallImg from '@/assets/image/three-js/house/wall.jpg';
import tileImg from '@/assets/image/three-js/house/tile.jpg';

const house = new THREE.Group();

function setFloor() {
  const geometry = new THREE.PlaneGeometry( 200, 300);

  const texture = new THREE.TextureLoader().load(floorImg);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 2, 2 );

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  
  const floor = new THREE.Mesh( geometry, material );

  floor.rotation.x = -0.5 * Math.PI; 
  floor.position.y = 1;
  floor.position.z = 150;

  house.add(floor);
}

function createSideWall() {
  const shape = new THREE.Shape();
  shape.moveTo(-100, 0);
  shape.lineTo(100, 0);
  shape.lineTo(100,100);
  shape.lineTo(0,150);
  shape.lineTo(-100,100);
  shape.lineTo(-100,0);

  const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

  const texture = new THREE.TextureLoader().load(wallImg);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 0.01, 0.005 );

  var material = new THREE.MeshBasicMaterial( {map: texture} );

  const sideWall = new THREE.Mesh( extrudeGeometry, material ) ;

  house.add(sideWall);

  return sideWall;
}


function createBackWall() {
  const shape = new THREE.Shape();
  shape.moveTo(-150, 0)
  shape.lineTo(150, 0)
  shape.lineTo(150,100)
  shape.lineTo(-150,100);

  const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

  const texture = new THREE.TextureLoader().load(wallImg);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 0.01, 0.005 );

  const material = new THREE.MeshBasicMaterial({map: texture});

  const backWall = new THREE.Mesh( extrudeGeometry, material) ;

  backWall.position.z = 150;
  backWall.position.x = -100;
  backWall.rotation.y = Math.PI * 0.5;

  house.add(backWall);
}

function createFrontWall() {
  const shape = new THREE.Shape();
  shape.moveTo(-150, 0);
  shape.lineTo(150, 0);
  shape.lineTo(150,100);
  shape.lineTo(-150,100);
  shape.lineTo(-150,0);

  const window = new THREE.Path();
  window.moveTo(30,30)
  window.lineTo(80, 30)
  window.lineTo(80, 80)
  window.lineTo(30, 80);
  window.lineTo(30, 30);
  shape.holes.push(window);

  const door = new THREE.Path();
  door.moveTo(-30, 0)
  door.lineTo(-30, 80)
  door.lineTo(-80, 80)
  door.lineTo(-80, 0);
  door.lineTo(-30, 0);
  shape.holes.push(door);

  const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

  const texture = new THREE.TextureLoader().load(wallImg);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 0.01, 0.005 );

  const material = new THREE.MeshBasicMaterial({map: texture} );

  const frontWall = new THREE.Mesh( extrudeGeometry, material ) ;

  frontWall.position.z = 150;
  frontWall.position.x = 100;
  frontWall.rotation.y = Math.PI * 0.5;

  house.add(frontWall);
}


function createRoof() {
  const geometry = new THREE.BoxGeometry( 120, 320, 10 );

  const texture = new THREE.TextureLoader().load(tileImg);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 5, 1);
  texture.rotation = Math.PI / 2;
  const textureMaterial = new THREE.MeshBasicMaterial({ map: texture});

  const colorMaterial = new THREE.MeshBasicMaterial({ color: 'grey' });

  const materials = [
      colorMaterial,
      colorMaterial,
      colorMaterial,
      colorMaterial,
      colorMaterial,
      textureMaterial
  ];

  const roof = new THREE.Mesh( geometry, materials );

  house.add(roof);

  roof.rotation.x = Math.PI / 2;
  roof.rotation.y = - Math.PI / 4 * 0.6;
  roof.position.y = 130;
  roof.position.x = 50;
  roof.position.z = 155;

  return roof;
}

// 创建房子
export const createHouse = (scene) => {
  setFloor();
  createSideWall();
  const sideWall2 = createSideWall();
  sideWall2.position.z = 300;

  createBackWall();
  createFrontWall();

  // 房顶
  const roof = createRoof();
  const roof2 = createRoof();
  roof2.rotation.x = Math.PI / 2;
  roof2.rotation.y = Math.PI / 4 * 0.6;
  roof2.position.y = 130;
  roof2.position.x = -50;
  roof2.position.z = 155;

  scene.add(house); 
}
