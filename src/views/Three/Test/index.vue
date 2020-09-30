<template>
  <div><div id="three" style="font-size: 0;"></div></div>
</template>

<script>
import ThreeApp from '../Utils/sceneLoader'
export default {
  data() {
    return {
      app: null
    }
  },
  mounted() {
    this.app = new ThreeApp()
    console.log(111)
    this.app.gltfLoader.load('/model/xiaoche.gltf', (res) => {
      console.log(222)
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped></style>
