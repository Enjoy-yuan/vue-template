<template>
  <div>
    <div id="three" style="font-size: 0;"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  data() {
    return {}
  },
  mounted() {
    let scene = new THREE.Scene()
    let texture = new THREE.TextureLoader().load(require('@img/logo.png') )
    let group=new THREE.Group()
    for (let i=0;i<400;i++){
let spriteMaterial = new THREE.SpriteMaterial({
    //   color: 0xff00ff,
    //   rotation: Math.PI/4,
      map: texture
    })
    let sprite = new THREE.Sprite(spriteMaterial)
    group.add(sprite)
    
    sprite.scale.set(0.8, 1)
    let k1=Math.random()-0.5
    let k2=Math.random()
    let k3=Math.random()-0.5
    sprite.position.set(40*k1,20*k2,20*k3)
    }
    scene.add(group)
    
    // 添加点光源，参数分别是颜色和强度
    let point = new THREE.PointLight(0xffffff)
    point.position.set(400, 200, 300)
    scene.add(point)
    // 添加环境光
    let ambient = new THREE.AmbientLight(0x444444)
    scene.add(ambient)
    let k = window.innerWidth / window.innerHeight
    let s = 20
    let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    camera.position.set(10, 10, 10)
    camera.lookAt(scene.position)

    let renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xb9d3ff, 1)
    let oThree = document.getElementById('three')
    oThree.appendChild(renderer.domElement)

    function render() {
        group.children.map(item=>{
            item.position.y-=0.1
            if(item.position.y<0){
                item.position.y=20
            }
        })
      requestAnimationFrame(render)
      renderer.render(scene, camera)
    }
    render()
  }
}
</script>

<style lang="scss" scoped></style>
