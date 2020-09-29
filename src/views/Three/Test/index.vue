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
      this.app.addSphereGeometry()
      this.app.addBoxGeometry()
      this.app.addHemisphereLight()
      this.app.addControls()
      document.body.addEventListener('click', this.selectHandler, false)
      this.loop()
    },
    selectHandler(event) {
      console.log(666)
      this.app.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.app.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      this.app.raycaster.setFromCamera(this.app.mouse, this.app.camera)
      let intersects = this.app.raycaster.intersectObjects(this.app.scene.children)
      if (intersects[0]) {
        console.log(intersects)
        intersects[0].object.material.color.set('#ff0000')
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
