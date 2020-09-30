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
    this.loadModel()
    let gltfLoader = new GLTFLoader()
    gltfLoader.load('/Model/xiaoche.gltf', (res) => {
      console.log(999)
      console.log(res)
    })
  },

  methods: {
    loadModel() {
      let loader = new GLTFLoader()
      // return new Promise(function(resolve, reject) {
      loader.load(
        'Model/xiaoche.gltf',
        (gltf) => {
          console.log(111)
          console.log(gltf)
        },
        (xhr) => {
          console.log(222)
        },
        (error) => {
          console.log(333)
        }
      )
      // })
    }
  }
}
</script>

<style lang="scss" scoped></style>
