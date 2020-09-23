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
  },
  methods: {
    init() {
      this.app = new ThreeApp()
      this.app.addPointLight()
      this.app.addAmbientLight()
      this.app.scene.add(this.app.floor)
      this.app.addStats()
      this.app.initGUI()
      this.app.addResize()
      this.app.addControls()
      this.loop()
    },
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
