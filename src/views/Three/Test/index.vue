<template>
  <div>
    <div id="three" style="font-size: 0;">
      
    </div>
  </div>
</template>

<script>
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export default {
  data() {
    return {
      app: null
    }
  },
  mounted() {
    let gltfLoader = new GLTFLoader()
    console.log(333)
    gltfLoader.load('/Model/yeyazhijia.gltf', (res) => {
      console.log(222)
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped></style>
