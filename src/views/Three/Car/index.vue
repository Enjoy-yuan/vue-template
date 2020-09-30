<template>
  <div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
export default {
  data() {
    return {
      model: null, // 模型
      camera: null, // 相机
      scene: null, // 场景
      renderer: null, // 渲染器
      mesh: null, // 网格模型
      floor: null, // 地板
      point: null, // 光源
      controlsGUI: {}, // 可视化调节属性
      stats: null // 性能监控
    }
  },
  mounted() {
    // 获取模型
    const loader = new GLTFLoader()
    loader.load('/model/xiaoche.gltf', (res) => {
      this.model = res.scene
      this.init()
      this.scene.add(this.model)
      this.render()
    })
  },
  methods: {
    // 初始化
    init() {
      // 创建场景
      this.scene = new THREE.Scene()
      this.scene.fog = new THREE.Fog(0x409eff, 300, 1000)
      this.initGUI()
      this.addStats()
      this.addLight()
      this.addFloor()
      this.createCamera()
      this.createRender()
      this.addShadow()
      this.windowResize()
      this.creatControl()
      this.addHelper()
    },
    // 可视化配置属性参数
    initGUI() {
      this.controlsGUI = {
        rotationSpeedX: 0,
        rotationSpeedY: 0,
        rotationSpeedZ: 0,
        floorColor: '#77f28f',
        cameraX: 300,
        cameraY: 300,
        cameraZ: 300
      }
      let gui = new dat.GUI()
      let f1 = gui.addFolder('旋转')
      f1.add(this.controlsGUI, 'rotationSpeedX', 0, 5).name('绕X轴旋转')
      f1.add(this.controlsGUI, 'rotationSpeedY', 0, 5).name('绕Y轴旋转')
      f1.add(this.controlsGUI, 'rotationSpeedZ', 0, 5).name('绕Z轴旋转')
      let f2 = gui.addFolder('颜色')
      f2.addColor(this.controlsGUI, 'floorColor').name('地板颜色')
      let f3 = gui.addFolder('摄像机')
      let changeCameraX = f3.add(this.controlsGUI, 'cameraX', -1000, 1000).name('摄像机X坐标')
      let changeCameraY = f3.add(this.controlsGUI, 'cameraY', -1000, 1000).name('摄像机Y坐标')
      let changeCameraZ = f3.add(this.controlsGUI, 'cameraZ', -1000, 1000).name('摄像机Z坐标')
      changeCameraX.onChange(() => {
        this.camera.position.set(this.controlsGUI.cameraX, this.controlsGUI.cameraY, this.controlsGUI.cameraZ)
        this.camera.lookAt(this.scene.position)
      })
      changeCameraY.onChange(() => {
        this.camera.position.set(this.controlsGUI.cameraX, this.controlsGUI.cameraY, this.controlsGUI.cameraZ)
        this.camera.lookAt(this.scene.position)
      })
      changeCameraZ.onChange(() => {
        this.camera.position.set(this.controlsGUI.cameraX, this.controlsGUI.cameraY, this.controlsGUI.cameraZ)
        this.camera.lookAt(this.scene.position)
      })
      // f1.open()
      // f2.open()
      // f3.open()
    },
    // 添加光源
    addLight() {
      // 添加点光源，参数分别是颜色和强度
      this.point = new THREE.PointLight(0xffffff, 0.5)
      this.point.position.set(0, 10, 5)
      this.scene.add(this.point)
      // 添加环境光
      let ambient = new THREE.AmbientLight(0x444444)
      this.scene.add(ambient)
    },
    // 添加一个地板的网格模型，参数分别是沿X轴和Y轴的宽度
    addFloor() {
      let floorGeometry = new THREE.PlaneGeometry(80, 80)
      let that = this
      // console.log(this.controlsGUI.floorColor)
      let floorMaterial = new THREE.MeshPhongMaterial({
        color: that.controlsGUI.floorColor
      })
      this.floor = new THREE.Mesh(floorGeometry, floorMaterial)
      this.floor.rotation.x = -0.5 * Math.PI
      this.floor.position.y = -2
      this.scene.add(this.floor)
    },
    // 添加参考坐标系
    addHelper() {
      // 添加辅助坐标系
      this.scene.add(new THREE.AxesHelper(50))
      // 增加一个参照系网格
      let grid = new THREE.GridHelper()
      grid.material.opacity = 0.2
      grid.material.transparent = true
      this.scene.add(grid)
      // 添加相机参考线
      let cameraHelper = new THREE.CameraHelper(this.camera)
      this.scene.add(cameraHelper)
    },
    // 创建相机对象
    createCamera() {
      let k = window.innerWidth / window.innerHeight
      let s = 20
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      this.camera.position.set(this.controlsGUI.cameraX, this.controlsGUI.cameraY, this.controlsGUI.cameraZ)
      this.camera.lookAt(this.scene.position)
    },
    // 创建渲染器
    createRender() {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0xb9d3ff, 1)
      let oThree = document.getElementById('three')
      oThree.appendChild(this.renderer.domElement)
    },
    // 显示阴影
    addShadow() {
      // 渲染器开启阴影
      this.renderer.shadowMap.enabled = true
      // 光源开启阴影
      this.point.castShadow = true
      this.point.shadow.mapSize = new THREE.Vector2(1024, 1024)
      this.point.shadow.bias = -0.001
      // 地板接受阴影开启
      this.floor.receiveShadow = true
      // 模型Mesh开启阴影
      this.model.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true
          obj.receiveShadow = true
        }
      })
    },
    // 响应式重置大小
    windowResize() {
      window.onresize = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        let k = window.innerWidth / window.innerHeight //窗口宽高比
        this.camera.left = -s * k
        this.camera.right = s * k
        this.camera.top = s
        this.camera.bottom = -s
        this.camera.updateProjectionMatrix()
      }
    },
    // 渲染场景
    render() {
      console.log('render')
      this.stats.update()
      this.floor.material.color.set(this.controlsGUI.floorColor)
      // this.camera.position.set(this.controlsGUI.cameraX, this.controlsGUI.cameraY, this.controlsGUI.cameraZ)
      // this.camera.lookAt(this.scene.position)
      requestAnimationFrame(this.render)
      this.model.rotation.x += this.controlsGUI.rotationSpeedX
      this.model.rotation.y += this.controlsGUI.rotationSpeedY
      this.model.rotation.z += this.controlsGUI.rotationSpeedZ
      this.renderer.render(this.scene, this.camera)
    },
    // 鼠标控制
    creatControl() {
      let controls = new OrbitControls(this.camera, this.renderer.domElement)
      // 存在requestAnimationFrame时不需要
      // controls.addEventListener('change', this.render)
    },
    addStats() {
      this.stats = new Stats()
      this.stats.domElement.style.position = 'absolute'
      this.stats.domElement.left = '0px'
      this.stats.domElement.top = '0px'
      document.body.appendChild(this.stats.domElement)
    }
  }
}
</script>
<style lang="scss" scoped></style>