<template>
  <div>
    <div v-for="menu in data" :key="menu.path">
      <el-submenu :index="menu.path" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title" v-show="!isCollapse">{{ $t(menu.name) }}</span>
        </template>
        <div>
          <Menutree :data="menu.children"></Menutree>
        </div>
      </el-submenu>
      <el-menu-item v-else :index="menu.path">
        <i :class="menu.icon"></i>
        <span slot="title">{{ $t(menu.name) }}</span>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
import Menutree from '@/views/Layout/Menu/components/Menutree'
export default {
  name: 'Menutree',
  components: { Menutree },
  props: ['data', 'isCollapse']
}
</script>
