<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as Three from 'three'
  import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

  export default {
    name: 'ThreeTest',
    data() {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null,
        controls:null

      }
    },
    methods: {
      init() {
        //创建场景对象Scene
        this.scene = new Three.Scene();

        let container = document.getElementById('container');
        //相机
        this.camera = new Three.PerspectiveCamera(60, container.clientWidth/container.clientHeight, 1, 1000);
        this.camera.position.set(292, 109, 268);//设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

        //正方形
        let geometry = new Three.BoxGeometry(20, 20, 20);
        let material = new Three.MeshNormalMaterial();

        this.mesh = new Three.Mesh(geometry, material);
        this.scene.add(this.mesh);

        //创建渲染器对象
        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);//设置渲染区域尺寸
        this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        container.appendChild(this.renderer.domElement);//body元素中插入canvas对象

        //辅助三维坐标系AxisHelper
        this.axisHelper = new Three.AxisHelper(250);
        this.scene.add(this.axisHelper);

      },
      render(){
        //this.mesh.rotation.x+=0.01

        requestAnimationFrame(this.render); //请求再次执行渲染函数render
        this.renderer.render(this.scene,this.camera);//执行渲染操作
      },
      // 创建控件对象
      createControls () {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      }

    },
    mounted() {
      this.init();
      this.render();
      this.createControls()
    }
  }
</script>
<style scoped>
  #container {
    height: 400px;
  }
</style>