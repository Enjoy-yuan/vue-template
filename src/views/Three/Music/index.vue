<template>
  <div>
    <el-button style="position: absolute;" @click="playMusic">播放音乐</el-button>
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
      N: 128
    }
  },
  mounted() {
    var scene = new THREE.Scene()
    var group = new THREE.Group()
    for (let i = 0; i < this.N / 2; i++) {
      var box = new THREE.BoxGeometry(2, 10, 2)
      var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      })
      var mesh = new THREE.Mesh(box, material)
      mesh.position.set(10 * i - (this.N / 2) * 10, 0, 0)
      group.add(mesh)
    }

    scene.add(group)

    var point = new THREE.PointLight(0xffffff)
    point.position.set(400, 200, 300)
    scene.add(point)

    var ambient = new THREE.AmbientLight(0x444444)
    scene.add(ambient)

    var width = window.innerWidth //窗口宽度
    var height = window.innerHeight //窗口高度
    var k = width / height //窗口宽高比
    var s = 500
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    this.camera.position.set(0, 0, 200) //设置相机位置
    this.camera.lookAt(scene.position) //设置相机方向(指向的场景对象)

    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height) //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
    document.getElementById('three').appendChild(renderer.domElement) //body元素中插入canvas对象
    let that = this
    function render() {
      renderer.render(scene, that.camera)
      requestAnimationFrame(render)
      if (that.analyser) {
        var arr = that.analyser.getFrequencyData()
        group.children.map((item, index) => {
          item.scale.y = arr[index] / 80
          item.material.color.r = arr[index] / 200
        })
      }
    }

    render()
    let controls = new OrbitControls(this.camera, renderer.domElement)
    // controls.addEventListener('change', render)
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
