export default {
    data() {
        return {
            scene: null, // 场景
            camera: null, // 相机
            renderer: null, //渲染器
            geometry: null, // 默认几何体
            material: null, // 默认基础网格材质颜色

        }
    },
    created() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.Camera()
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.getElementById('three').appendChild(this.renderer.domElement)
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshBasicMaterial({
            color: '#ff0000'
        })
        
    }
}
