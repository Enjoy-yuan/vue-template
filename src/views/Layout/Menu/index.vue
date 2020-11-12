<template>
    <div>
        <el-menu
            router
            unique-opened
            style="height: 100%;border-right:none;overflow: auto;"
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#67c23a"
            :default-active="onRouters"
            :collapse="isCollapse"
            @select="handleSelect"
        >
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">{{ $t('home') }}</span>
            </el-menu-item>
            <el-submenu index="/echarts">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ $t('echarts') }}</span>
                </template>
                <el-menu-item index="/echarts/bar">{{ $t('bar') }}</el-menu-item>
                <el-menu-item index="/echarts/line">{{ $t('line') }}</el-menu-item>
                <el-menu-item index="/echarts/pie">{{ $t('pie') }}</el-menu-item>
                <el-menu-item index="/echarts/map">{{ $t('map') }}</el-menu-item>
            </el-submenu>
            <el-submenu index="/three">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ $t('three') }}</span>
                </template>
                <el-menu-item index="/three/feature">{{ $t('feature') }}</el-menu-item>
                <el-menu-item index="/three/car">{{ $t('car') }}</el-menu-item>
                <el-menu-item index="/three/music">{{ $t('music') }}</el-menu-item>
                <el-menu-item index="/three/sprite">{{ $t('sprite') }}</el-menu-item>
            </el-submenu>
            <el-submenu index="/example">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ $t('example') }}</span>
                </template>
                <el-menu-item index="/example/table">{{ $t('tables') }}</el-menu-item>
                <el-menu-item index="/example/echart">{{ $t('echarts') }}</el-menu-item>
                <el-menu-item index="/example/clipboard">{{ $t('clipboard') }}</el-menu-item>
                <el-menu-item index="/example/moment">{{ $t('moment') }}</el-menu-item>
                <el-menu-item index="/example/tinymce">{{ $t('tinymce') }}</el-menu-item>
                <el-menu-item index="/example/backtop">{{ $t('backtop') }}</el-menu-item>
                <el-menu-item index="/example/Excel">{{ $t('excel') }}</el-menu-item>
                <el-menu-item index="/example/test">{{ $t('test') }}</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="/three">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">三维</span>
                </template>
                <el-menu-item index="/three/feature">功能演示</el-menu-item>
                <el-menu-item index="/three/car">小车</el-menu-item>
                <el-menu-item index="/three/music">音频可视化</el-menu-item>
                <el-menu-item index="/three/sprite">精灵粒子</el-menu-item>
                <el-menu-item index="/three/panoramic">开发指南demo</el-menu-item>
                <el-menu-item index="/three/test">测试</el-menu-item>
            </el-submenu> -->
            <Menutree :data="treeData" :isCollapse="isCollapse"></Menutree>
        </el-menu>
    </div>
</template>

<script>
import axios from 'axios'
import Menutree from '@/views/Layout/Menu/components/Menutree'
import { getCookie, setCookie } from '@/utils/cookie'
import { dataToTree } from '@/utils/myFun'
export default {
    props: ['isCollapse'],
    components: { Menutree },
    data() {
        return {
            treeData: [] // 动态菜单
        }
    },
    created() {
        let menuData = [
            { catalogEngName: 'menu', icon: 'el-icon-menu', rowId: 1, url: '/menu' },
            { catalogEngName: 'menuChild', parentId: 1, rowId: 3, url: '/menu/menuChild' }
        ]
        this.treeData = dataToTree(menuData)
    },
    computed: {
        onRouters() {
            return this.$route.path
        }
    },
    methods: {
        handleSelect(key) {
            this.$emit('clickMenu', key)
        }
    }
}
</script>
