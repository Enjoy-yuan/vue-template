<template>
  <div>
    <div id="three"></div>
    <div class="form">
      <el-button @click="installModel">加载模型</el-button>
      <el-button @click="uninstallModel">卸载模型</el-button>
      <el-button @click="showModel">显示模型</el-button>
      <el-button @click="hideModel">隐藏模型</el-button>
    </div>
  </div>
</template>

<script>
import ThreeApp from '@three/Utils/sceneLoader'

export default {
  data() {
    return {
      gltf: null,
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
      this.app = new ThreeApp({ width: 1000, height: 500 })
      this.app.addDirectionalLight()
      this.app.addHemisphereLight()
      this.app.addControls()
      this.loop()
    },
    installModel() {
      this.app.gltfLoader.load('/model/yeyazhijia.gltf', (res) => {
        this.gltf = res.scene
        this.app.scene.add(res.scene)
        this.app.renderer.domElement.addEventListener('click', this.selectHandler, false)
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
    // 点击部件高亮
    selectHandler(ev) {
      this.app.mouse.x = (event.layerX / this.app.renderer.domElement.offsetWidth) * 2 - 1
      this.app.mouse.y = -(event.layerY / this.app.renderer.domElement.offsetHeight) * 2 + 1
      this.app.raycaster.setFromCamera(this.app.mouse, this.app.camera)
      // 捕获点击的部件
      let intersects = this.app.raycaster.intersectObjects(this.gltf.children, true)
      if (intersects.length > 0) {
        let selectedObjects = intersects[0].object
        // 修改材质颜色
        let newMaterial = selectedObjects.material.clone()
        newMaterial.color = this.app.setColor('#D3C542')
        selectedObjects.material = newMaterial
        // 高亮
        let arr = []
        arr.push(selectedObjects)
        this.app.outlinePass.selectedObjects = arr
      }
    },
    loop() {
      console.log('render')
      this.animationFrame = requestAnimationFrame(this.loop)
      this.app.renderer.render(this.app.scene, this.app.camera)
      this.app.composer.render()
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
