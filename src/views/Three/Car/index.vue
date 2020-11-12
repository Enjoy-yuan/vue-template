<template>
  <div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
// import * as THREE from 'three'
import ThreeApp from '../Utils/sceneLoader'
let model = null
let animationFrame = null
let app = null

export default {
  data() {
    return {
      // model: null, // 模型
      // animationFrame: null,
      // app: null
    }
  },

  mounted() {
    this.init()
    app.gltfLoader.load('/model/xiaoche.gltf', (res) => {
      model = res.scene
      app.scene.add(model)
      this.addShadow()
    })
  },
  beforeDestroy() {
    cancelAnimationFrame(animationFrame)
    app.removeStats()
    app.removeGUI()
    // console.log(this.app.stats)
  },
  methods: {
    init() {
      app = new ThreeApp()
      app.addPointLight()
      app.addAmbientLight()
      app.scene.add(app.floor)
      app.addStats()
      app.addGUI()
      app.addResize()
      app.addControls()
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
      app.renderer.shadowMap.enabled = true
      // 光源开启阴影
      app.pointLight.castShadow = true
      // 地板接受阴影开启
      app.floor.receiveShadow = true
      // 模型Mesh开启阴影
      model.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true
        }
      })
    },
    // 渲染场景
    loop() {
      console.log('render')
      app.stats.update()
      if (model) {
        model.rotation.x += window.datGUI.rotationSpeedX
        model.rotation.y += window.datGUI.rotationSpeedY
        model.rotation.z += window.datGUI.rotationSpeedZ
      }
      app.floor.material.color.set(window.datGUI.floorColor)
      app.renderer.render(app.scene, app.camera)
      animationFrame = requestAnimationFrame(this.loop)
      // var T = app.clock.getDelta() // 返回时间单位：秒
      // 可以在控制打印查看你的渲染时间间隔
      // console.log('两帧渲染时间间隔', T * 1000 + '毫秒')
      // console.log('查看每秒渲染频率', 1 / T)
    }
  }
}
</script>

<style lang="scss" scoped></style>
