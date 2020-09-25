import * as THREE from 'three'
import * as dat from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

import './object3DExtention'

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
    this.gui = null
    this.clock = new THREE.Clock()
    this.width = window.innerWidth
    this.height = window.innerHeight
    if (params) {
      this.width = params.width
      this.height = params.height
    }
    // 地板
    this.floor = (() => {
      let floorGeometry = new THREE.PlaneGeometry(80, 80)
      // console.log(window.datGUI.floorColor)
      let floorMaterial = new THREE.MeshPhongMaterial({
        color: window.datGUI.floorColor
      })
      let floor = new THREE.Mesh(floorGeometry, floorMaterial)
      floor.rotation.x = -0.5 * Math.PI
      floor.position.y = -2
      return floor
    })()

    // 摄像机
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000)
    this.camera.position.set(window.datGUI.cameraX, window.datGUI.cameraY, window.datGUI.cameraZ)

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.width, this.height)
    document.getElementById('three').appendChild(this.renderer.domElement)
    this.renderer.setClearColor('#b9d3ff')

    // 混合器
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.outlinePass = new OutlinePass(new THREE.Vector2(this.width, this.height), this.scene, this.camera)
    this.outlinePass.visibleEdgeColor.set('#ffffff')
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.outlinePass)
  }

  // 球体几何
  addGeometry() {
    // let geometry = new THREE.SphereGeometry(10, 40, 40)
    // let material = new THREE.MeshPhongMaterial({
    //   color: '#ffae23',
    //   specular: 0x4488ee,
    //   shininess: 12
    // })
    let geometry = new THREE.BoxGeometry(10, 10, 10)
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    let mesh = new THREE.Mesh(geometry, material)
    this.scene.add(mesh)
  }

  // 辅助线
  addHelper() {
    const axesHelper = new THREE.AxesHelper(100)
    const cameraHelper = new THREE.CameraHelper(this.camera)
    const gridHelper = new THREE.GridHelper(100, 10)
    this.scene.add(axesHelper)
    //   this.scene.add(cameraHelper)
    //   this.scene.add(gridHelper)
  }

  // 点光源
  addPointLight() {
    this.pointLight.position.set(0, 10, 5)
    this.scene.add(this.pointLight)
  }
  // 环境光
  addAmbientLight() {
    this.scene.add(this.ambientLight)
  }

  // 平行光
  addDirectionalLight() {
    this.directionalLight.position.set(-4, 8, 4)
    this.scene.add(this.directionalLight)
  }

  // 半球光
  addHemisphereLight() {
    this.hemisphereLight.position.set(0, 8, 0)
    this.scene.add(this.hemisphereLight)
  }

  // 重置页面
  addResize() {
    window.addEventListener('resize', () => {
      const { innerWidth, innerHeight } = window
      this.renderer.setSize(innerWidth, innerHeight)
      this.camera.aspect = innerWidth / innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  // 控制器
  addControls() {
    new OrbitControls(this.camera, this.renderer.domElement)
  }

  // 重复渲染
  loop() {
    console.log('render')
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.loop)
  }

  // 性能监控
  addStats() {
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.left = '0px'
    this.stats.domElement.top = '0px'
    document.body.appendChild(this.stats.domElement)
  }
  // 移除性能监控
  removeStats() {
    document.body.removeChild(this.stats.dom)
  }

  // 可视化
  addGUI() {
    this.gui = new dat.GUI()
    let f1 = this.gui.addFolder('旋转')
    f1.add(window.datGUI, 'rotationSpeedX', 0, 5).name('绕X轴旋转')
    f1.add(window.datGUI, 'rotationSpeedY', 0, 5).name('绕Y轴旋转')
    f1.add(window.datGUI, 'rotationSpeedZ', 0, 5).name('绕Z轴旋转')
    let f2 = this.gui.addFolder('颜色')
    f2.addColor(window.datGUI, 'floorColor').name('地板颜色')
    let f3 = this.gui.addFolder('摄像机')
    let changeCameraX = f3.add(window.datGUI, 'cameraX', -1000, 1000).name('摄像机X坐标')
    let changeCameraY = f3.add(window.datGUI, 'cameraY', -1000, 1000).name('摄像机Y坐标')
    let changeCameraZ = f3.add(window.datGUI, 'cameraZ', -1000, 1000).name('摄像机Z坐标')
    changeCameraX.onChange(() => {
      this.camera.position.set(window.datGUI.cameraX, window.datGUI.cameraY, window.datGUI.cameraZ)
      this.camera.lookAt(this.scene.position)
    })
    changeCameraY.onChange(() => {
      this.camera.position.set(window.datGUI.cameraX, window.datGUI.cameraY, window.datGUI.cameraZ)
      this.camera.lookAt(this.scene.position)
    })
    changeCameraZ.onChange(() => {
      this.camera.position.set(window.datGUI.cameraX, window.datGUI.cameraY, window.datGUI.cameraZ)
      this.camera.lookAt(this.scene.position)
    })
    f1.open()
    f2.open()
    f3.open()
  }

  // 移除可视化
  removeGUI() {
    this.gui.destroy()
  }
}
