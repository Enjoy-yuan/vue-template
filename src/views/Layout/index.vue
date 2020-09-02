<template>
  <div style="height:100%;">
    <div class="flex" style="height:100%;">
      <Menu :isCollapse="isCollapse" @clickMenu="clickMenu"></Menu>
      <div class="content" id="content">
        <HeaderCom @changeSlidebarState="changeSlidebarState"></HeaderCom>
        <Tags ref="tags"></Tags>
        <div class="router">
          <transition name="fade-transform" mode="out-in">
            <keep-alive exclude="tinymce">
              <router-view />
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import HeaderCom from './HeaderCom'
import Tags from './Tags'
import Menu from './Menu'
export default {
  name: 'Layout',
  components: { HeaderCom, Menu, Tags },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeSlidebarState(data) {
      this.isCollapse = data
    },
    // 菜单子组件通过父组件触发标签子组件
    clickMenu(key) {
      this.$refs.tags.clickMenu(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  overflow: auto;
  border: 1px solid #000;
  .router {
    padding: 10px 10px 0 10px;
  }
}
</style>
