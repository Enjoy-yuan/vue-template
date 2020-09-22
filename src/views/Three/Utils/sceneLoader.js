import * as THREE from 'three'

window.obj = {
    camerax: 1000,
    cameray: 1000,
    cameraz: 50
}
// 视野值
const FOV = 70

const setupScene = () => {
    return new THREE.Scene()
}

// 初始化摄像机
const setupCamera = () => {
    // const aspectRatio = window.innerWidth / window.innerHeight
    // const camera = new THREE.PerspectiveCamera(FOV, aspectRatio, 0.0001, 10000)
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000)

    // camera.position.set(window.obj.camerax, window.obj.cameray, window.obj.cameraz)
    camera.position.set(0, 1000, 2500)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    return camera
}

// 初始化渲染器
const setupRenderer = () => {
    // const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    // renderer.setSize(window.innerWidth, window.innerHeight)
    // document.getElementById('three').appendChild(renderer.domElement)
    let renderer = new THREE.WebGLRenderer({ antialias: true })
                /* 渲染范围 */
                renderer.setSize(window.innerWidth, window.innerHeight)

                document.getElementById('three').appendChild(renderer.domElement)
    return renderer
}

export default function SceneLoader() {
    const scene = setupScene()
    const camera = setupCamera()
    const renderer = setupRenderer()



     /* 500000个点 */
     let particles = 500000
     /* 存放粒子数据的网格 */
     let geometry = new THREE.BufferGeometry()
     let positions = []
     let colors = []
    
     let color = new THREE.Color()

     /* 使粒子在立方体范围内扩散 */
     let n = 1000,
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
         size: 6,
         vertexColors: THREE.VertexColors,
         transparent: true,
         opacity: 0.7
     })
     /* 批量管理点 */
     let points = new THREE.Points(geometry, material)
     scene.add(points)
    const handleResize = () => {
        const { innerWidth, innerHeight } = window
        // 更新渲染器尺寸
        renderer.setSize(innerWidth, innerHeight)
        camera.aspect = innerWidth / innerHeight
        // 更新摄像头参数
        camera.updateProjectionMatrix()
    }
    // 动态渲染
    const loop = () => {
        // camera.position.set(window.obj.camerax, window.obj.cameray, window.obj.cameraz)
        // camera.lookAt(scene.position)
        points.rotation.x += 0.02
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
    }

    // 辅助线
    const axesHelper = new THREE.AxesHelper(1000)
    // const cameraHelper = new THREE.CameraHelper(camera)
    const gridHelper = new THREE.GridHelper(1000, 10)

    // 布置场景
    // scene.add(axesHelper)
    // scene.add(cameraHelper)
    // scene.add(gridHelper)

    loop()

    window.addEventListener('resize', handleResize)

    return {
        scene,
        camera,
        renderer
    }
}
