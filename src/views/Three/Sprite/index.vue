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
      app: null,
      animationFrame: null
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame)
  },
  mounted() {
    this.app = new ThreeApp()
    const particles = 2000
    const geometry = new THREE.BufferGeometry()
    const positions = []
    const colors = []
    const color = new THREE.Color()
    const n = 10
    for (let i = 0; i < particles; i++) {
      const x = Math.random() * n - n / 2
      const y = Math.random() * n - n / 2
      const z = Math.random() * n - n / 2
      positions.push(x, y, z)

      // 颜色
      const vx = x / n + 0.5
      const vy = y / n + 0.5
      const vz = z / n + 0.5
      color.setRGB(vx, vy, vz)
      colors.push(color.r, color.g, color.b)
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
      size: 1,
      vertexColors: THREE.VertexColors,
      transparent: true,
      opacity: 0.7
    })
    const points = new THREE.Points(geometry, material)
    this.app.scene.add(points)

    const loop = () => {
      console.log('render')
      points.rotation.x += 0.02
      this.app.renderer.render(this.app.scene, this.app.camera)
      this.animationFrame = requestAnimationFrame(loop)
    }
    loop()
    this.app.addControls()
  }
}
</script>

<style lang="scss" scoped></style>
