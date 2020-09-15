<template>
  <div>
    <div style="position: absolute;margin: 20px;">
      <p>提示：需注释main.js中的mockjs的引入</p> 
      <el-button style="margin-top: 10px;" @click="playMusic">播放音乐</el-button>
    </div>

    <div id="three"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default {
  data() {
    return {
      camera: null, // 相机
      scene: null, // 场景
      renderer: null, // 渲染器
      mesh: null, // 网格模型
      audio: null,
      analyser: null,
      floor: null,
      N: 64
    }
  },
  mounted() {
    var scene = new THREE.Scene()
    var group = new THREE.Group()
    for (let i = 0; i < this.N / 2; i++) {
      var box = new THREE.BoxGeometry(2, 10, 2)
      var material = new THREE.MeshBasicMaterial({
        color: 0xffff00
      })
      var mesh = new THREE.Mesh(box, material)
      mesh.position.set((i - this.N / 4) * 4, 0, 0)
      group.add(mesh)
    }
    // group.rotation.z = 0.1 * Math.PI
    scene.add(group)
    let floorGeometry = new THREE.PlaneGeometry(300, 300)
    let floorMaterial = new THREE.MeshPhongMaterial({
      color: 0x77f28f
    })
    this.floor = new THREE.Mesh(floorGeometry, floorMaterial)
    this.floor.rotation.x = -0.2 * Math.PI
    this.floor.position.y = -5
    scene.add(this.floor)

    // 添加辅助坐标系
    // scene.add(new THREE.AxesHelper(50))
    // // 增加一个参照系网格
    // let grid = new THREE.GridHelper()
    // grid.material.opacity = 0.2
    // grid.material.transparent = true
    // scene.add(grid)

    var point = new THREE.PointLight(0xffffff, 0.5)
    point.position.set(0, 120, -20)
    scene.add(point)

    var ambient = new THREE.AmbientLight(0x444444)
    scene.add(ambient)

    var width = window.innerWidth //窗口宽度
    var height = window.innerHeight //窗口高度
    // var k = width / height //窗口宽高比
    // var s = 200
    // this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
    // camera.position.set(0,0, 80)
    this.camera.position.set(0, 0, 240) //设置相机位置
    this.camera.lookAt(scene.position) //设置相机方向(指向的场景对象)

    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height) //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
    document.getElementById('three').appendChild(renderer.domElement) //body元素中插入canvas对象

    renderer.shadowMap.enabled = true
    // 光源开启阴影
    point.castShadow = true
    point.shadow.mapSize = new THREE.Vector2(1024, 1024)
    point.shadow.bias = -0.001
    // 地板接受阴影开启
    this.floor.receiveShadow = true
    // 模型Mesh开启阴影
    group.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })

    let that = this
    function render() {
      console.log('render')
      renderer.render(scene, that.camera)
      requestAnimationFrame(render)
      if (that.analyser) {
        var arr = that.analyser.getFrequencyData()
        group.children.map((item, index) => {
          item.position.y = (arr[index] / 100) * 10
          item.scale.y = arr[index] / 100
          // console.log(arr[index])
          // item.position.translateY= (1-item.scale.y)*20
          // item.material.color.r = arr[index] / 200
        })
      }
    }

    render()
    let controls = new OrbitControls(this.camera, renderer.domElement)
  },
  methods: {
    playMusic() {
      var listener = new THREE.AudioListener()
      this.camera.add(listener)
      var audio = new THREE.Audio(listener)
      var audioLoader = new THREE.AudioLoader()
      audioLoader.load('/music/1.mp3', (AudioBuffer) => {
        audio.setBuffer(AudioBuffer)
        audio.setLoop(true)
        audio.setVolume(0.5)
        this.analyser = new THREE.AudioAnalyser(audio, 2 * this.N)
        audio.play()
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
