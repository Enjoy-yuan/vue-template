<template>
  <div>
    <el-button @click="loadModel">加载网格模型</el-button>
    <el-button @click="showModel">显示网格模型</el-button>
    <el-button @click="hideModel">隐藏网格模型</el-button>
    <div style="margin-top: 20px;" id="three"></div>
  </div>
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
      mesh: null, // 网格模型
    }
  },
  mounted() {
    // console.log(this.aaa)
    // console.log(new FileReader().readAsArrayBuffer(this.aaa))
    this.init()
    // 获取模型
    const loader = new GLTFLoader()
    loader.load('/model/xiaoche.gltf', (res) => {
      this.scene.add(res.scene)
      this.render()
    })
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
      this.scene.add(new THREE.AxesHelper(100))
      // 增加一个参照系网格 后来可删除
      let grid = new THREE.GridHelper()
      grid.material.opacity = 0.2
      grid.material.transparent = true
      this.scene.add(grid)
      // 创建相机对象
      let width = window.innerWidth - 250
      let height = window.innerHeight - 200
      let k = width / height
      let s = 10 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      this.camera.position.set(200, 300, 200)
      this.camera.lookAt(this.scene.position)

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(width, height)
      this.renderer.setClearColor(0xb9d3ff, 1)
      let oThree = document.getElementById('three')
      oThree.appendChild(this.renderer.domElement)
      // 响应式重置大小
      window.onresize = () => {
        this.renderer.setSize(window.innerWidth - 250, window.innerHeight - 200)
        k = (window.innerWidth - 250) / (window.innerHeight - 200) //窗口宽高比
        this.camera.left = -s * k
        this.camera.right = s * k
        this.camera.top = s
        this.camera.bottom = -s
        this.camera.updateProjectionMatrix()
      }
      this.creatControl()
      // var listener = new THREE.AudioListener()
      // this.camera.add(listener)
      // // 创建一个非位置音频对象  用来控制播放
      // var audio = new THREE.Audio(listener)
      // // 创建一个音频加载器对象
      // var audioLoader = new THREE.AudioLoader()
      // // 加载音频文件，返回一个音频缓冲区对象作为回调函数参数
      // audioLoader.load('/music/1.ogg', function(AudioBuffer) {
      //   // 音频缓冲区对象关联到音频对象audio
      //   audio.setBuffer(AudioBuffer)
      //   audio.setLoop(true) //是否循环
      //   audio.setVolume(0.5) //音量
      //   // 播放缓冲区中的音频数据
      //   audio.play()
      // })
    },
    render() {
      this.renderer.render(this.scene, this.camera)
    },

    creatControl() {
      let controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.addEventListener('change', this.render)
    },
    loadModel() {
      // 添加网格球型模型
      let geometry = new THREE.SphereGeometry(30, 40, 40)
      let material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        wireframe: true,
        specular: 0x4488ee,
        shininess: 1
      })
      this.mesh = new THREE.Mesh(geometry, material)
      this.mesh.translateX(60)
      this.scene.add(this.mesh)
    },
    showModel() {
      this.mesh.material.visible = true
      this.render()
    },
    hideModel() {
      this.mesh.material.visible = false
      this.render()
    }
  }
}
</script>

<style lang="scss" scoped></style>
