<template>
  <div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { scene, camera, floor, pointLight, gltfLoader,aaa, initGUI, renderer, addControls, stats, addStats, loop, addAmbientLight, addPointLight } from '../Utils/sceneLoader'

export default {
  data() {
    return {
      model: null, // 模型
      animationFrame: null
    }
  },

  mounted() {
    this.init()
    gltfLoader.load('/model/xiaoche.gltf', (res) => {
      this.model = res.scene
      scene.add(this.model)
      this.addShadow()
    })
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    init() {
      addControls()
      addStats()
      initGUI()
      addPointLight()
      addAmbientLight()
      scene.add(floor)
      this.loop()
    },
    // 显示阴影
    addShadow() {
      // 渲染器开启阴影
      renderer.shadowMap.enabled = true
      // 光源开启阴影
      pointLight.castShadow = true
      // 地板接受阴影开启
      floor.receiveShadow = true
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
      stats.update()
      if (this.model) {
        this.model.rotation.x += window.datGUI.rotationSpeedX
        this.model.rotation.y += window.datGUI.rotationSpeedY
        this.model.rotation.z += window.datGUI.rotationSpeedZ
      }
      floor.material.color.set(window.datGUI.floorColor)
      this.animationFrame = requestAnimationFrame(this.loop)
      renderer.render(scene, camera)
    }
  }
}
</script>

<style lang="scss" scoped></style>
