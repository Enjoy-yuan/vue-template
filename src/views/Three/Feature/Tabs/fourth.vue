<template>
  <div>
    <div id="three"></div>
    <div class="form"></div>
  </div>
</template>

<script>
import ThreeApp from '@three/Utils/sceneLoader'

let gltf = null
let animationFrame = null
let app = null
export default {
  data() {
    return {
      // gltf: null,
      // animationFrame: null,
      // app: null
    }
  },
  mounted() {
    this.init()
    this.installModel()
  },
  beforeDestroy() {
    cancelAnimationFrame(animationFrame)
  },
  methods: {
    init() {
      app = new ThreeApp({ width: 1000, height: 500 })
      app.addDirectionalLight()
      app.addHemisphereLight()
      app.addControls()
      this.loop()
    },
    installModel() {
      console.log(process.env.BASE_URL)
      app.gltfLoader.load(`${process.env.BASE_URL}model/yeyazhijia.gltf`, (res) => {
        console.log('res')
        console.log(res)
        gltf = res.scene
        app.scene.add(res.scene)
      })
    },
    loop() {
      console.log('render')
      animationFrame = requestAnimationFrame(this.loop)
      app.renderer.render(app.scene, app.camera)
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
