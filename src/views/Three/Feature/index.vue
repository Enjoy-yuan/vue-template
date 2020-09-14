<template>
  <div>
    <div class="form" style="position: absolute;">
      <el-button @click="installModel">加载模型</el-button>
      <el-button @click="uninstallModel">卸载模型</el-button>
      <el-button @click="showModel">显示模型</el-button>
      <el-button @click="hideModel">隐藏模型</el-button>
    </div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { Scene, WebGLRenderer, Vector2, Vector3, Raycaster, PerspectiveCamera, Color, Fog, DirectionalLight, DirectionalLightHelper, HemisphereLight, HemisphereLightHelper } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
export default {
  data() {
    return {
      scene: null, // 场景
      camera: null, // 相机
      gltf: null, // 加载的模型
      composer: null, // 混合器
      renderer: null, // 渲染器
      outlinePass: null // 高亮边缘颜色
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    installModel() {
      let gltfLoader = new GLTFLoader()
      gltfLoader.load('/Model/yeyazhijia.gltf', (res) => {
        this.gltf = res.scene
        this.scene.add(this.gltf)
        document.body.addEventListener('click', this.selectHandler, false)
        this.render()
      })
    },
    uninstallModel() {
      console.log(111)
      this.scene.remove(this.gltf)
      this.render()
    },
    showModel() {
      this.gltf.visible = true
      this.render()
    },
    hideModel() {
      this.gltf.visible = false
      this.render()
    },
    init() {
      // 创建场景，相机
      this.scene = new THREE.Scene()
      this.scene.background = new Color(0xb3cefb)
    //   this.scene.background = new Color()
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
      this.camera.position.set(-70, 30, 0)
      // 添加光源
      let directionalLight = new DirectionalLight(0xffffff)
      directionalLight.position.set(-4, 8, 4)
      let hemisphereLight = new HemisphereLight(0xffffff, 0xffffff)
      hemisphereLight.position.set(0, 8, 0)
      this.scene.add(directionalLight)
      this.scene.add(hemisphereLight)
      // 渲染
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      document.getElementById('three').appendChild(this.renderer.domElement)
      // 混合器
      this.composer = new EffectComposer(this.renderer)
      let renderPass = new RenderPass(this.scene, this.camera)
      this.composer.addPass(renderPass)
      this.outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera)
      this.composer.addPass(this.outlinePass)
      this.outlinePass.visibleEdgeColor.set('#ffffff')
      // 鼠标控制器
      let controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.addEventListener('change', this.render)
      this.render()
    },
    render() {
      console.log('render')
      this.renderer.render(this.scene, this.camera)
      //   requestAnimationFrame(this.render)
      this.composer.render()
    },
    selectHandler(ev) {
      // 射线
      let mouse = new Vector2()
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1
      let raycaster = new Raycaster()
      raycaster.setFromCamera(mouse, this.camera)
      // 捕获点击的部件
      let intersects = raycaster.intersectObjects(this.gltf.children, true)
      if (intersects.length > 0) {
        let selectedObjects = intersects[0].object
        let newMaterial = selectedObjects.material.clone()
        newMaterial.color = new Color('#D3C542')
        selectedObjects.material = newMaterial
        let arr = []
        arr.push(selectedObjects)
        this.outlinePass.selectedObjects = arr
        this.render()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
