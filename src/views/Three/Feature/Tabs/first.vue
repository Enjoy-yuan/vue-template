<template>
  <div>
    <div id="three"></div>
    <div class="form">
      <el-button @click="installModel">加载模型</el-button>
      <el-button @click="uninstallModel">卸载模型</el-button>
      <el-button @click="showModel">显示模型</el-button>
      <el-button @click="hideModel">隐藏模型</el-button>
      <el-button @click="explosionLiner">线性爆炸</el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import ThreeApp from '@three/Utils/sceneLoader'

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
    // 点击部件高亮
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
    explosionLiner() {
      // const params = {
      //   intensity: 2,
      //   duration: 1500,
      //   animateType: 'liner',
      //   step: 10
      // }
      // // 动画名称需要与Animate的成员名完全一致
      // this.gltf.getCenter(params)
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
