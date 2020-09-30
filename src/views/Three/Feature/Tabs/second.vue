<template>
  <div>
    <div id="three"></div>
    <div class="form"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import ThreeApp from '@three/Utils/sceneLoader'

export default {
  data() {
    return {
      animationFrame: null,
      app: null,
      mixer: null
    }
  },
  mounted() {
    this.init()
    this.app.gltfLoader.load('/model/kuangshan.gltf', (res) => {
      console.log(res)
    })
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    init() {
      this.app = new ThreeApp({ width: 1000, height: 500 })

      var box = new THREE.BoxGeometry(5, 5, 5)
      var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      }) //材质对象
      var mesh = new THREE.Mesh(box, material)
      mesh.position.set(0, 0, 0)
      mesh.scale.set(0.5,0.5,0.5)
      this.app.scene.add(mesh)
      var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 50),
        // new THREE.Vector3(-50, 0, 50),
        // new THREE.Vector3(-50, 0, 100),
        // new THREE.Vector3(-100, 0, 100),
        // new THREE.Vector3(-100, 0, 0),
        // new THREE.Vector3(-1, 0, 0)

      ])
      // 样条曲线均匀分割100分，返回51个顶点坐标
      var points = curve.getPoints(100)
      console.log('points', points) //控制台查看返回的顶点坐标
      var geometry = new THREE.Geometry()
      // 把从曲线轨迹上获得的顶点坐标赋值给几何体
      geometry.vertices = points
      var material = new THREE.LineBasicMaterial({
        color: 0x4488ff
      })
      var line = new THREE.Line(geometry, material)
      this.app.scene.add(line)

      // 声明一个数组用于存储时间序列
      let arr = []
      for (let i = 0; i < 101; i++) {
        arr.push(i)
      }
      // 生成一个时间序列
      var times = new Float32Array(arr)

      var posArr = []
      points.forEach((elem) => {
        posArr.push(elem.x, elem.y, elem.z)
      })
      // 创建一个和时间序列相对应的位置坐标系列
      var values = new Float32Array(posArr)
      // 创建一个帧动画的关键帧数据，曲线上的位置序列对应一个时间序列
      var posTrack = new THREE.KeyframeTrack('.position', times, values)
      let duration = 101
      let clip = new THREE.AnimationClip('default', duration, [posTrack])
      this.mixer = new THREE.AnimationMixer(mesh)
      let AnimationAction = this.mixer.clipAction(clip)
      AnimationAction.timeScale = 20
      AnimationAction.play()
      // this.app.addGeometry()
      this.app.addControls()
      this.loop()
    },
    loop() {
      console.log('render')
      this.animationFrame = requestAnimationFrame(this.loop)
      this.app.renderer.render(this.app.scene, this.app.camera)
      this.mixer.update(this.app.clock.getDelta())
    }
  }
}
</script>

<style lang="scss" scoped>
#three {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
}
.form {
  text-align: center;
  margin-top: 20px;
}
</style>
