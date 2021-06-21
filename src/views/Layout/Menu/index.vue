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
      </el-submenu>
      <el-submenu index="/example">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ $t('example') }}</span>
        </template>
        <el-menu-item index="/example/tables">{{ $t('tables') }}</el-menu-item>
        <el-menu-item index="/example/clipboard">{{ $t('clipboard') }}</el-menu-item>
        <el-menu-item index="/example/moment">{{ $t('moment') }}</el-menu-item>
        <el-menu-item index="/example/tinymce">{{ $t('tinymce') }}</el-menu-item>
        <el-menu-item index="/example/backtop">{{ $t('backtop') }}</el-menu-item>
        <el-menu-item index="/example/baiduMap">{{ $t('baiduMap') }}</el-menu-item>
        <el-menu-item index="/example/QRcode">{{ $t('QRcode') }}</el-menu-item>
        <el-menu-item index="/example/treeMenu">{{ $t('treeMenu') }}</el-menu-item>
      </el-submenu>
      <Menutree :data="treeData" :isCollapse="isCollapse"></Menutree>
    </el-menu>
  </div>
</template>

<script>
import Menutree from '@/views/Layout/Menu/components/Menutree'
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
    const menuData = [
      { catalogEngName: 'dynamicMenu', icon: 'el-icon-menu', rowId: 1, url: '/dynamicMenu' },
      { catalogEngName: 'childMenu', parentId: 1, rowId: 2, url: '/dynamicMenu/childMenu' }
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
