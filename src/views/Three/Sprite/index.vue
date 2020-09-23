<template>
  <div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import ThreeApp from '../Utils/sceneLoader'

export default {
  data() {
    return {
      animationFrame: null
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
  },
  mounted() {
    let app = new ThreeApp()
    let particles = 2000
    let geometry = new THREE.BufferGeometry()
    let positions = []
    let colors = []
    let color = new THREE.Color()
    let n = 10
    for (let i = 0; i < particles; i++) {
      let x = Math.random() * n - n / 2
      let y = Math.random() * n - n / 2
      let z = Math.random() * n - n / 2
      positions.push(x, y, z)

      // 颜色
      let vx = x / n + 0.5
      let vy = y / n + 0.5
      let vz = z / n + 0.5
      color.setRGB(vx, vy, vz)
      colors.push(color.r, color.g, color.b)
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    let material = new THREE.PointsMaterial({
      size: 1,
      vertexColors: THREE.VertexColors,
      transparent: true,
      opacity: 0.7
    })
    let points = new THREE.Points(geometry, material)
    app.scene.add(points)

    const loop = () => {
      console.log('render')
      points.rotation.x += 0.02
      app.renderer.render(app.scene, app.camera)
      this.animationFrame = requestAnimationFrame(loop)
    }
    loop()
    app.addControls()
  }
}
</script>

<style lang="scss" scoped></style>
