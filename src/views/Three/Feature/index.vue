<template>
  <div>
    <div class="form" style="position: absolute;">
      <el-button @click="installModel">加载模型</el-button>
      <el-button @click="uninstallModel">卸载模型</el-button>
      <el-button @click="showModel">显示模型</el-button>
      <el-button @click="hideModel">隐藏模型</el-button>
    </div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import ThreeApp from '../Utils/sceneLoader'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
// import { scene, composer, outlinePass, camera, floor, pointLight,addDirectionalLight, addHemisphereLight, gltfLoader, initGUI, renderer, addControls, stats, addStats, addLight, loop, addHelper } from '../Utils/sceneLoader2'

export default {
  data() {
    return {
      gltf: null, // 加载的模型
      animationFrame: null,
      app: null
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    init() {
      this.app = new ThreeApp()
      this.app.addDirectionalLight()
      this.app.addHemisphereLight()
      this.app.addControls()
      this.loop()
    },
    installModel() {
      this.app.gltfLoader.load('/Model/yeyazhijia.gltf', (res) => {
        this.gltf = res.scene
        this.app.scene.add(res.scene)
        document.body.addEventListener('click', this.selectHandler, false)
      })
    },
    uninstallModel() {
      this.app.scene.remove(this.gltf)
    },
    showModel() {
      this.gltf.visible = true
    },
    hideModel() {
      this.gltf.visible = false
    },

    selectHandler(ev) {
      // 射线
      let mouse = new THREE.Vector2()
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1
      let raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, this.app.camera)
      // 捕获点击的部件
      let intersects = raycaster.intersectObjects(this.gltf.children, true)
      if (intersects.length > 0) {
        let selectedObjects = intersects[0].object
        // let newMaterial = selectedObjects.material.clone()
        // newMaterial.color = new THREE.Color('#D3C542')
        // selectedObjects.material = newMaterial
        let arr = []
        arr.push(selectedObjects)
        this.app.outlinePass.selectedObjects = arr
      }
    },
    loop() {
      console.log('render')
      requestAnimationFrame(this.loop)
      this.app.renderer.render(this.app.scene, this.app.camera)
      this.app.composer.render()
    }
  }
}
</script>

<style lang="scss" scoped></style>
