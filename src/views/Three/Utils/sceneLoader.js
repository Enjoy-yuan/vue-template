import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 场景
export const scene = new THREE.Scene()

// 摄像机
export const camera = (() => {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(500, 500, 500)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  return camera
})()

// 渲染器
export const renderer = (() => {
  let renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  setTimeout(() => {
    document.getElementById('three').appendChild(renderer.domElement)
  })
  renderer.setClearColor('#b9d3ff')
  return renderer
})()

// 球体几何
export const addGeometry = (Scene = scene) => {
  let geometry = new THREE.SphereGeometry(100, 40, 40)
  let material = new THREE.MeshPhongMaterial({
    color: '#ffae23',
    specular: 0x4488ee,
    shininess: 12
  })
  let mesh = new THREE.Mesh(geometry, material)
  Scene.add(mesh)
}

// 辅助线
export const addHelper = (Scene = scene, Camera = camera) => {
  const axesHelper = new THREE.AxesHelper(1000)
  const cameraHelper = new THREE.CameraHelper(Camera)
  const gridHelper = new THREE.GridHelper(1000, 10)
  Scene.add(axesHelper)
  Scene.add(cameraHelper)
  Scene.add(gridHelper)
}

// 灯光

// 重置页面
export const addResize = (Camera = camera, Renderer = renderer) => {
  window.addEventListener('resize', () => {
    const { innerWidth, innerHeight } = window
    Renderer.setSize(innerWidth, innerHeight)
    Camera.aspect = innerWidth / innerHeight
    Camera.updateProjectionMatrix()
  })
}

// 控制器
export const addControls = (Camera = camera, Renderer = renderer) => {
  new OrbitControls(Camera, Renderer.domElement)
}
