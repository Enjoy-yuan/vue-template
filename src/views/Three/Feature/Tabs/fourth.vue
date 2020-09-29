<template>
  <div>
    <div id="three"></div>
    <div class="form"></div>
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
    this.installModel()
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
      this.app.gltfLoader.load('/Model/yeyazhijia.gltf', (res) => {
        this.gltf = res.scene
        this.app.scene.add(res.scene)
      })
    },
    loop() {
      console.log('render')
      this.animationFrame = requestAnimationFrame(this.loop)
      this.app.renderer.render(this.app.scene, this.app.camera)
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
