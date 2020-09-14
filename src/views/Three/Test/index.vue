<template>
  <div>
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
    return {}
  },
  mounted() {
    var scene = new THREE.Scene()
    scene.background = new Color(0xb3cefb)
    // var camera = new THREE.OrthographicCamera( window.innerWidth / - 15, window.innerHeight / 15, window.innerWidth / 15, window.innerHeight / - 15, 1, 1000 );
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 80)
    // camera.position.z = 80;
    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('three').appendChild(renderer.domElement)
    // var geometry = new THREE.SphereGeometry(5, 50, 50)
    // var material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    // var sphere = new THREE.Mesh(geometry, material)
    // sphere.position.set(0, 0, 30)
    // scene.add(sphere)

    let gltfLoader = new GLTFLoader()
    let composer = new EffectComposer(renderer)
    gltfLoader.load(
      '/Model/yeyazhijia.gltf', // your .glb & .gltf
      (gltf) => {
        scene.add(gltf.scene)
        let raycaster = new Raycaster()
        let mouse = new Vector2()
        document.body.addEventListener('click', selectHandler, false)
        function selectHandler(ev) {
          mouse.x = (ev.clientX / window.innerWidth) * 2 - 1
          mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1
          raycaster.setFromCamera(mouse, camera)
          // 这里我们只检测模型的选中情况
          let intersects = raycaster.intersectObjects(gltf.scene.children, true)
          if (intersects.length > 0) {
            let selectedObjects = intersects[0].object
            let newMaterial = selectedObjects.material.clone()
            newMaterial.color = new Color('#D3C542') //重新修改颜色
            selectedObjects.material = newMaterial

            let renderPass = new RenderPass(scene, camera)
            composer.addPass(renderPass)

            let outlinePass = new OutlinePass(new Vector2(window.innerWidth, window.innerHeight), scene, camera)
            composer.addPass(outlinePass)

            outlinePass.visibleEdgeColor.set('#ffffff') // 选中颜色
            outlinePass.edgeStrength = 5
            outlinePass.edgeGlow = 1.5
            let arr = []
            arr.push(selectedObjects)
            outlinePass.selectedObjects = arr
            
          }
        }
      }
    )
    // composer.render();
    let directionalLight = new DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(-4, 8, 4)
    let dhelper = new DirectionalLightHelper(directionalLight, 5, 0xff0000)

    let hemisphereLight = new HemisphereLight(0xffffff, 0xffffff, 0.4)
    hemisphereLight.position.set(0, 8, 0)
    let hHelper = new HemisphereLightHelper(hemisphereLight, 5)

    scene.add(directionalLight)
    scene.add(hemisphereLight)

    // 添加辅助坐标系
    scene.add(new THREE.AxesHelper(30))
    var gridHelper = new THREE.GridHelper(50, 60)
    gridHelper.rotation.y = -Math.PI / 2
    scene.add(gridHelper)

    function render() {
      renderer.render(scene, camera)
      requestAnimationFrame(render)
      composer.render()
    }
    let controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', render)
    render()
  }
}
</script>

<style lang="scss" scoped></style>
