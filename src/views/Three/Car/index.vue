<template>
  <div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  data() {
    return {
      model: null, // 模型
      camera: null, // 相机
      scene: null, // 场景
      renderer: null, // 渲染器
      mesh: null, // 网格模型
      floor: null, // 地板
      point: null // 光源
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
      this.addLight()
      this.addFloor()
      this.addHelper()
      this.createCamera()
      this.createRender()
      this.addShadow()
      this.windowResize()
      this.creatControl()
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
      let floorMaterial = new THREE.MeshPhongMaterial({
        color: 0x77f28f
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
    },
    // 创建相机对象
    createCamera() {
      let k = window.innerWidth / window.innerHeight
      let s = 20
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      this.camera.position.set(200, 300, 200)
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
        k = window.innerWidth / window.innerHeight //窗口宽高比
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
      requestAnimationFrame(this.render)
      this.model.rotation.x += 0.02
      this.model.rotation.y += 0.02
      this.model.rotation.z += 0.02
      this.renderer.render(this.scene, this.camera)
    },
    // 鼠标控制
    creatControl() {
      let controls = new OrbitControls(this.camera, this.renderer.domElement)
      // 存在requestAnimationFrame时不需要
      // controls.addEventListener('change', this.render)
    }
  }
}
</script>

<style lang="scss" scoped></style>
