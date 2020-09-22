<template>
    <div>
        <div id="three" style="font-size: 0;"></div>
    </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import SceneLoader from '../Utils/sceneLoader'
import { test } from '../Utils/threeMixins'
export default {
    mixins: [test],
    data() {
        return {}
    },
    mounted() {
        // console.log(this.aaa)
        // var geometry = new THREE.SphereGeometry(100, 40, 40) //创建一个球体几何对象
        // var material = new THREE.MeshPhongMaterial({
        //     color: '#ffae23',
        //     specular: 0x4488ee,
        //     shininess: 12
        // })
        // var mesh = new THREE.Mesh(geometry, material)
        // loader.scene.add(mesh)

        // var starsGeometry = new THREE.Geometry()
        // for (var i = 0; i < 10000; i++) {
        //     var star = new THREE.Vector3()
        //     star.x = THREE.Math.randFloatSpread(200)
        //     star.y = THREE.Math.randFloatSpread(200)
        //     star.z = THREE.Math.randFloatSpread(200)
        //     starsGeometry.vertices.push(star)
        // }
        // var starsMaterial = new THREE.PointsMaterial({ color: 0x67C23A })
        // var starField = new THREE.Points(starsGeometry, starsMaterial)


         
               

                // scene.add(points)
            

         
        const loader = SceneLoader()
        loader.scene.background = new THREE.Color(0xb9d3ff)
        
    }
}
</script>

<style lang="scss" scoped></style>
