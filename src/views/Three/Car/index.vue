<template>
  <div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import ThreeApp from '../Utils/sceneLoader'

export default {
  data() {
    return {
      model: null, // 模型
      animationFrame: null,
      app: null
    }
  },

  mounted() {
    this.init()
    this.app.gltfLoader.load('/model/xiaoche.gltf', (res) => {
      this.model = res.scene
      this.app.scene.add(this.model)
      this.addShadow()
    })
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
    this.app.removeStats()
    this.app.removeGUI()
    // console.log(this.app.stats)
  },
  methods: {
    init() {
      this.app = new ThreeApp()
      this.app.addPointLight()
      this.app.addAmbientLight()
      this.app.scene.add(this.app.floor)
      this.app.addStats()
      this.app.addGUI()
      this.app.addResize()
      this.app.addControls()
      this.loop()
    },
    // initControls() {

    //     /* 飞行控件 */
    //     controls = new THREE.FlyControls(camera, renderer.domElement);

    //     /* 属性参数默认 */
    //     controls.rollSpeed = Math.PI / 24; // 翻滚速度
    //     controls.autoForward = true; //自动向前移动
    //     controls.dragToLook = false;
    //     controls.movementSpeed = 25; //移动速度
    // },
    // 显示阴影
    addShadow() {
      // 渲染器开启阴影
      this.app.renderer.shadowMap.enabled = true
      // 光源开启阴影
      this.app.pointLight.castShadow = true
      // 地板接受阴影开启
      this.app.floor.receiveShadow = true
      // 模型Mesh开启阴影
      this.model.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true
        }
      })
    },
    // 渲染场景
    loop() {
      console.log('render')
      this.app.stats.update()
      if (this.model) {
        this.model.rotation.x += window.datGUI.rotationSpeedX
        this.model.rotation.y += window.datGUI.rotationSpeedY
        this.model.rotation.z += window.datGUI.rotationSpeedZ
      }
      this.app.floor.material.color.set(window.datGUI.floorColor)
      this.app.renderer.render(this.app.scene, this.app.camera)
      this.animationFrame = requestAnimationFrame(this.loop)
      var T = this.app.clock.getDelta() //返回时间单位：秒
      // 可以在控制打印查看你的渲染时间间隔
      console.log('两帧渲染时间间隔', T * 1000 + '毫秒')
      console.log('查看每秒渲染频率', 1 / T)
    }
  }
}
</script>

<style lang="scss" scoped></style>
