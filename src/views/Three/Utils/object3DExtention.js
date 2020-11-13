import { Object3D } from 'three'

function getCenter() {
  const centerPosition = [0, 0, 0]
  console.log(this)
  this.children.map(item => {
    centerPosition[0] += item.position.x
    centerPosition[1] += item.position.y
    centerPosition[2] += item.position.z
  })
  centerPosition.map((item, index) => {
    centerPosition[index] = item / this.children.length
  })
  return centerPosition
}

// 物体爆炸
function explode(params) {
  return new Promise((resolve, reject) => {
    if (!params.intensity) {
      params.intensity = 1
    }
    if (!params.center) {
      params.center = GetCenter(params.o)
    }
    if (!params.step) {
      params.step = 20
    }
    const animate =
      new Animate(params.duration)[params.animateType] ??
      new Animate(params.duration).liner
    params.o.children.map(child => {
      const delta = [
        (child.position.x - params.center[0]) * params.intensity,
        (child.position.y - params.center[1]) * params.intensity,
        (child.position.z - params.center[2]) * params.intensity
      ]
      let time = 0

      const interval = setInterval(() => {
        if (time >= params.duration) {
          window.clearInterval(interval)
          resolve()
        }
        const pTime = time
        time += params.step
        const p = animate(pTime / params.duration)
        const n = animate(time / params.duration)
        const intervalDelta = [
          delta[0] * (n - p),
          delta[1] * (n - p),
          delta[2] * (n - p)
        ]
        child.position.add(new Vector3(...intervalDelta))
      }, params.step)
    })
  })
}

// 新增Object3D子物体爆炸原型链
Object3D.prototype.explode = function(params) {
  return new Promise((resolve, reject) => {
    if (params.center) {
      this.explodeCenter = params.center
    } else {
      this.explodeCenter = getCenter()
      params.center = this.explodeCenter
    }
    const add = { o: this }
    const merge = Object.assign(params, add)
    explode(merge).then(() => {
      resolve()
    })
  })
}
