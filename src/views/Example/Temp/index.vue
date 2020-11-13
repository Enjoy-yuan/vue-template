<template>
  <div>
    <div id="three"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default {
  data() {
    return {}
  },
  mounted() {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene()
    /**
     * 创建网格模型
     */
    const loader = new GLTFLoader()
    loader.load('/model/xiaoche.gltf', function(res) {
      // var geometry2 = new THREE.SphereGeometry(20, 20, 20);
      // var material2 = new THREE.MeshLambertMaterial({
      //   color: 0xff00ff
      // });
      const geometry = new THREE.BoxGeometry(20, 20, 20)
      const material = new THREE.MeshNormalMaterial()
      var mesh2 = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
      // mesh2.translateX(120); //球体网格模型沿Y轴正方向平移120
      scene.add(mesh2)
      // scene.add(res.scene) // 将模型添加到场景中
      /**
       * 光源设置
       */
      // 点光源
      var point = new THREE.PointLight(0xffffff)
      point.position.set(400, 200, 300) // 点光源位置
      scene.add(point) // 点光源添加到场景中
      // 环境光
      var ambient = new THREE.AmbientLight(0x444444)
      scene.add(ambient)
      console.log(THREE.Axishelper(250))

      // var axishelper = new THREE.Axishelper(250)
      // scene.add(axishelper)
      // console.log(scene)
      // console.log(scene.children)
      /**
       * 相机设置
       */
      // var width = window.innerWidth //窗口宽度
      // var height = window.innerHeight //窗口高度
      var width = 800
      var height = 600
      var k = width / height // 窗口宽高比
      var s = 10 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机对象
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      camera.position.set(200, 300, 200) // 设置相机位置
      camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height) // 设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色
      var oThree = document.getElementById('three')
      console.log(oThree.offsetHeight)
      console.log(oThree.offsetWidth)
      oThree.appendChild(renderer.domElement) // body元素中插入canvas对象

      // 执行渲染操作   指定场景、相机作为参数
      // function render() {
      //   renderer.render(scene, camera) //执行渲染操作
      //   // res.scene.rotateY(0.08) //每次绕y轴旋转0.01弧度
      //   // requestAnimationFrame(render)
      // }

      // let T0 = new Date() //上次时间
      function render() {
        // let T1 = new Date() //本次时间
        // let t = T1 - T0 //时间差
        // T0 = T1 //把本次时间赋值给上次时间
        // requestAnimationFrame(render)
        renderer.render(scene, camera) // 执行渲染操作
        // res.scene.rotateY(0.001 * t) //旋转角速度0.001弧度每毫秒
      }

      render()
      window.onresize = function() {
        // 重置渲染器输出画布canvas尺寸
        renderer.setSize(window.innerWidth, window.innerHeight)
        // 重置相机投影的相关参数
        k = window.innerWidth / window.innerHeight // 窗口宽高比
        camera.left = -s * k
        camera.right = s * k
        camera.top = s
        camera.bottom = -s
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix()
      }

      var controls = new OrbitControls(camera, renderer.domElement) // 创建控件对象
      controls.addEventListener('change', render) // 监听鼠标、键盘事件
      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    })
  }
}
</script>

<style lang="scss" scoped></style>
