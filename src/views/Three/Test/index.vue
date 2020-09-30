<template>
  <div></div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export default {
  data() {
    return {}
  },
  mounted() {
    let gltfLoader = new GLTFLoader()
    console.log(111)
    gltfLoader.load('/model/xiaoche.gltf', (res) => {
      console.log(999)
      console.log(res)
    })
  },

  methods: {}
}
</script>

<style lang="scss" scoped></style>
