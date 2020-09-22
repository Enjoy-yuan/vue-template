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
      <el-submenu index="/example">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ $t('example') }}</span>
        </template>
        <el-menu-item index="/example/table">{{ $t('table') }}</el-menu-item>
        <el-menu-item index="/example/echart">{{ $t('echart') }}</el-menu-item>
        <el-menu-item index="/example/clipboard">{{ $t('clipboard') }}</el-menu-item>
        <el-menu-item index="/example/moment">{{ $t('moment') }}</el-menu-item>
        <el-menu-item index="/example/tinymce">{{ $t('tinymce') }}</el-menu-item>
        <el-menu-item index="/example/backtop">{{ $t('backtop') }}</el-menu-item>
        <el-menu-item index="/example/Excel">{{ $t('Excel') }}</el-menu-item>
        <el-menu-item index="/example/test">{{ $t('test') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="/three">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Threejs</span>
        </template>
        <el-menu-item index="/three/car">小车</el-menu-item>
        <el-menu-item index="/three/feature">基本功能</el-menu-item>
        <el-menu-item index="/three/music">音频可视化</el-menu-item>
        <el-menu-item index="/three/sprite">精灵粒子</el-menu-item>
        <el-menu-item index="/three/panoramic">3D全景</el-menu-item>
        <el-menu-item index="/three/test">测试</el-menu-item>
      </el-submenu>
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
      treeData: []
    }
  },
  created() {
    if (JSON.parse(sessionStorage.getItem('menuData'))) {
      this.treeData = JSON.parse(sessionStorage.getItem('menuData'))
    }
  },
  mounted() {
    axios
      .post('/mock/api/getMenu', {
        role: getCookie('username')
      })
      .then((res) => {
        this.treeData = dataToTree(res.data.catalog)
        sessionStorage.setItem('menuData', JSON.stringify(this.treeData))
      })
    // this.$api.getCatalog(getCookie('username')).then((res) => {
    //   this.treeData = dataToTree(res.data.catalogVMs)
    //   sessionStorage.setItem('menuData', JSON.stringify(this.treeData))
    // })
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
