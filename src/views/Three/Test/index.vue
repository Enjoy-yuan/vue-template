<template>
  <div>
    <div id="three" style="font-size: 0;">
      
    </div>
  </div>
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
    let app = new ThreeApp()
    console.log(2323)
    app.gltfLoader.load('/model/xiaoche.gltf', (res) => {
      console.log(111)
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped></style>
