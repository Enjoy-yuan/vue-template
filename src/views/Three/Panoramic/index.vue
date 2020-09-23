

<template>
    <div class="content">
        <h1>Load A Model</h1>
        <div class="three-content" id="three"></div>
        <div class="buttons">
            基本方法封装用例：
            <button @click="LoadModel" class="button">加载模型</button>
            <button @click="ShowModel" class="button">显示模型</button>
            <button @click="HideModel" class="button">隐藏模型</button>
        </div>
    </div>
</template>

<script>
import ThreeApp from '../Utils/three/Entry/ThreeView'
import { Scene } from 'three'

let app
let loadModel
let animations
let mixer
export default {
    name: 'LoadAModel',
    methods: {
        LoadModel() {
            app.LoadGLTFModel(
                `/Model/yeyazhijia.gltf`
            ).then((res) => {
                loadModel = res.obj3d
                app.AddGLTFModelToScene(loadModel)
                animations = res.animations
                console.log(app.scene)
            })
        },

       
        HideModel() {
            loadModel.setVisible(false)
        },
        ShowModel() {
            loadModel.setVisible(true)
        },
    },
    mounted() {

        const el = document.getElementById('three')
        const cameraPos = [100, 100, 100]
        const params = {
            el: el,
            cameraPosition: cameraPos,
        }
        app = new ThreeApp(params)
    },
    beforeDestroy() {
        app.Destroy()
    },
}
</script>

<style scoped>
.three-content {
    width: 800px;
    height: 600px;
}
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    flex-direction: column;
}
.buttons {
    margin-top: 20px;
}

.button {
    margin: 0 5px;
}
</style>

