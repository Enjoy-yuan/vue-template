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
        <span slot="title">{{ $t('Home') }}</span>
      </el-menu-item>
      <el-submenu index="/echarts">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ $t('Echarts') }}</span>
        </template>
        <el-menu-item index="/echarts/bar">{{ $t('Bar') }}</el-menu-item>
        <el-menu-item index="/echarts/line">{{ $t('Line') }}</el-menu-item>
        <el-menu-item index="/echarts/pie">{{ $t('Pie') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="/example">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ $t('Example') }}</span>
        </template>
        <el-menu-item index="/example/tables">{{ $t('Tables') }}</el-menu-item>
        <el-menu-item index="/example/clipboard">{{ $t('Clipboard') }}</el-menu-item>
        <el-menu-item index="/example/moment">{{ $t('Moment') }}</el-menu-item>
        <el-menu-item index="/example/tinymce">{{ $t('Tinymce') }}</el-menu-item>
        <el-menu-item index="/example/backtop">{{ $t('Backtop') }}</el-menu-item>
        <el-menu-item index="/example/baiduMap">{{ $t('BaiduMap') }}</el-menu-item>
        <el-menu-item index="/example/QRcode">{{ $t('QRcode') }}</el-menu-item>
        <el-menu-item index="/example/treeMenu">{{ $t('TreeMenu') }}</el-menu-item>
      </el-submenu>
      <Menutree :data="treeData" :isCollapse="isCollapse"></Menutree>
    </el-menu>
  </div>
</template>

<script>
import Menutree from '@/views/Layout/Menu/components/Menutree'
import { dataToTree } from '@/utils/myFun'
import { getCookie } from '@/utils/cookie'
export default {
  props: ['isCollapse'],
  components: { Menutree },
  data() {
    return {
      treeData: [] // 动态菜单
    }
  },
  created() {
    this.treeData = dataToTree(JSON.parse(getCookie('menuData')))
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
