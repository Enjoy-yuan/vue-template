import * as THREE from 'three'
import * as dat from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

window.datGUI = {
  rotationSpeedX: 0,
  rotationSpeedY: 0,
  rotationSpeedZ: 0,
  floorColor: '#77f28f',
  cameraX: 100,
  cameraY: 100,
  cameraZ: 100
}

export default class ThreeApp {
  constructor(params) {
    // 场景
    this.scene = new THREE.Scene()
    this.stats = new Stats()
    this.gltfLoader = new GLTFLoader()
    this.pointLight = new THREE.PointLight(0xffffff, 0.5)
    this.ambientLight = new THREE.AmbientLight(0x444444)
    this.directionalLight = new THREE.DirectionalLight(0xffffff)
    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff)

    // 地板
    // this.floor = (() => {
    //   let floorGeometry = new THREE.PlaneGeometry(80, 80)
    //   // console.log(window.datGUI.floorColor)
    //   let floorMaterial = new THREE.MeshPhongMaterial({
    //     color: window.datGUI.floorColor
    //   })
    //   let floor = new THREE.Mesh(floorGeometry, floorMaterial)
    //   floor.rotation.x = -0.5 * Math.PI
    //   floor.position.y = -2
    //   return floor
    // })()

    // // 摄像机
    // this.camera = (() => {
    //   const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    //   camera.position.set(window.datGUI.cameraX, window.datGUI.cameraY, window.datGUI.cameraZ)
    //   return camera
    // })()

    // // 渲染器
    // this.renderer = (() => {
    //   let renderer = new THREE.WebGLRenderer({ antialias: true })
    //   renderer.setSize(window.innerWidth, window.innerHeight)
    //   setTimeout(() => {
    //     document.getElementById('three').appendChild(renderer.domElement)
    //   })
    //   renderer.setClearColor('#b9d3ff')
    //   return renderer
    // })()

    // // 混合器
    // this.renderPass = new RenderPass(this.scene, this.camera)
    // this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
    // outlinePass.visibleEdgeColor.set('#ffffff')
    // this.composer = new EffectComposer(renderer)
    // composer.addPass(renderPass)
    // composer.addPass(outlinePass)
  }

//   // 球体几何
//   addGeometry = () => {
//     let geometry = new THREE.SphereGeometry(100, 40, 40)
//     let material = new THREE.MeshPhongMaterial({
//       color: '#ffae23',
//       specular: 0x4488ee,
//       shininess: 12
//     })
//     let mesh = new THREE.Mesh(geometry, material)
//     this.scene.add(mesh)
//   }

//   // 辅助线
//   addHelper = () => {
//     const axesHelper = new THREE.AxesHelper(1000)
//     const cameraHelper = new THREE.CameraHelper(camera)
//     const gridHelper = new THREE.GridHelper(1000, 10)
//     this.scene.add(axesHelper)
//     this.scene.add(cameraHelper)
//     this.scene.add(gridHelper)
//   }

//   // 点光源
//   addPointLight = () => {
//     pointLight.position.set(0, 10, 5)
//     this.scene.add(pointLight)
//   }
//   // 环境光
//   addAmbientLight = () => {
//     this.scene.add(ambientLight)
//   }

//   // 平行光
//   addDirectionalLight = () => {
//     directionalLight.position.set(-4, 8, 4)
//     this.scene.add(directionalLight)
//   }

//   // 半球光
//   addHemisphereLight = () => {
//     hemisphereLight.position.set(0, 8, 0)
//     this.scene.add(hemisphereLight)
//   }

//   // 重置页面
//   addResize = () => {
//     window.addEventListener('resize', () => {
//       const { innerWidth, innerHeight } = window
//       renderer.setSize(innerWidth, innerHeight)
//       camera.aspect = innerWidth / innerHeight
//       camera.updateProjectionMatrix()
//     })
//   }

//   // 控制器
//   addControls = () => {
//     new OrbitControls(camera, renderer.domElement)
//   }

//   // 重复渲染
//   loop = () => {
//     console.log('render')
//     renderer.render(this.scene, this.camera)
//     requestAnimationFrame(loop)
//   }

//   // 性能监控
//   addStats = () => {
//     stats.domElement.style.position = 'absolute'
//     stats.domElement.left = '0px'
//     stats.domElement.top = '0px'
//     document.body.appendChild(stats.domElement)
//   }

//   // 可视化
//   initGUI = () => {
//     let gui = new dat.GUI()
//     let f1 = gui.addFolder('旋转')
//     f1.add(window.datGUI, 'rotationSpeedX', 0, 5).name('绕X轴旋转')
//     f1.add(window.datGUI, 'rotationSpeedY', 0, 5).name('绕Y轴旋转')
//     f1.add(window.datGUI, 'rotationSpeedZ', 0, 5).name('绕Z轴旋转')
//     let f2 = gui.addFolder('颜色')
//     f2.addColor(window.datGUI, 'floorColor').name('地板颜色')
//     let f3 = gui.addFolder('摄像机')
//     let changeCameraX = f3.add(window.datGUI, 'cameraX', -1000, 1000).name('摄像机X坐标')
//     let changeCameraY = f3.add(window.datGUI, 'cameraY', -1000, 1000).name('摄像机Y坐标')
//     let changeCameraZ = f3.add(window.datGUI, 'cameraZ', -1000, 1000).name('摄像机Z坐标')
//     changeCameraX.onChange(() => {
//       camera.position.set(window.datGUI.cameraX, window.datGUI.cameraY, window.datGUI.cameraZ)
//       camera.lookAt(this.scene.position)
//     })
//     changeCameraY.onChange(() => {
//       camera.position.set(window.datGUI.cameraX, window.datGUI.cameraY, window.datGUI.cameraZ)
//       camera.lookAt(this.scene.position)
//     })
//     changeCameraZ.onChange(() => {
//       camera.position.set(window.datGUI.cameraX, window.datGUI.cameraY, window.datGUI.cameraZ)
//       camera.lookAt(this.scene.position)
//     })

    // f1.open()
    // f2.open()
    // f3.open()
//   }
}
