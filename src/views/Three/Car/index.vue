<template>
  <div></div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  data() {
    return {
      camera: null, // 相机
      scene: null, // 场景
      renderer: null, // 渲染器
      mesh: null // 网格模型
    }
  },
  created() {
    this.init()
    // 获取模型
    const loader = new GLTFLoader()
    loader.load('/model/xiaoche.gltf', (res) => {
      this.scene.add(res.scene)
      this.render()
    })
  },
  mounted() {
    // 去掉app，回到页面顶部
    document.getElementById('app').style.display = 'none'
  },
  methods: {
    // 初始化
    init() {
      // 场景
      this.scene = new THREE.Scene()
      // 添加点光源
      let point = new THREE.PointLight(0xffffff)
      point.position.set(400, 200, 300)
      this.scene.add(point)
      // 添加环境光
      let ambient = new THREE.AmbientLight(0x444444)
      this.scene.add(ambient)
      // 添加辅助坐标系
      // this.scene.add(new THREE.AxesHelper(100))
      // // 增加一个参照系网格
      // let grid = new THREE.GridHelper()
      // grid.material.opacity = 0.2
      // grid.material.transparent = true
      // this.scene.add(grid)
      // 创建相机对象
      let width = window.innerWidth
      let height = window.innerHeight
      let k = width / height
      let s = 10
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      this.camera.position.set(200, 300, 200)
      this.camera.lookAt(this.scene.position)
      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(width, height)
      this.renderer.setClearColor(0xb9d3ff, 1)
      let oThree = document.getElementById('three')
      document.body.appendChild(this.renderer.domElement)
      // 响应式重置大小
      window.onresize = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        k = window.innerWidth / window.innerHeight //窗口宽高比
        this.camera.left = -s * k
        this.camera.right = s * k
        this.camera.top = s
        this.camera.bottom = -s
        this.camera.updateProjectionMatrix()
      }
      this.creatControl()
    },
    // 渲染场景
    render() {
      this.renderer.render(this.scene, this.camera)
    },
    creatControl() {
      let controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.addEventListener('change', this.render)
    }
  }
}
</script>

<style lang="scss" scoped></style>
