<template>
  <div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { scene, camera, renderer, addControls } from '../Utils/sceneLoader'
export default {
  data() {
    return {}
  },
  mounted() {
    addControls()
    /* 500000个点 */
    let particles = 20000
    /* 存放粒子数据的网格 */
    let geometry = new THREE.BufferGeometry()
    let positions = []
    let colors = []

    let color = new THREE.Color()

    /* 使粒子在立方体范围内扩散 */
    let n = 100,
      n2 = n / 2

    for (let i = 0; i < particles; i++) {
      // 点
      let x = Math.random() * n - n2
      let y = Math.random() * n - n2
      let z = Math.random() * n - n2

      positions.push(x, y, z)

      // 颜色
      let vx = x / n + 0.5
      let vy = y / n + 0.5
      let vz = z / n + 0.5

      color.setRGB(vx, vy, vz)

      colors.push(color.r, color.g, color.b)
    }
    // 添加点和颜色
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    let material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: THREE.VertexColors,
      transparent: true,
      opacity: 0.7
    })
    /* 批量管理点 */
    let points = new THREE.Points(geometry, material)
    scene.add(points)

    // 动态渲染
    const loop = () => {
      console.log('render')
      //   points.rotation.x += 0.02
      renderer.render(scene, camera)
      requestAnimationFrame(loop)
    }
    loop()
  }
}
</script>

<style lang="scss" scoped></style>
