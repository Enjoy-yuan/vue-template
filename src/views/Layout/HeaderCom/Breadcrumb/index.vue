<template>
  <div class="breadcrumb">
    <el-breadcrumb>
      <el-breadcrumb-item v-show="$route.path!=='/home'" :to="{ path: '/home' }">{{ $t('home') }}</el-breadcrumb-item>
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in routeArr" :key="item">{{ $t(item) }}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeArr: []
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler: function(newUrl) {
        this.routeArr = this.$route.path.split('/')
        this.routeArr.shift()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  ::v-deep {
    .el-breadcrumb__inner.is-link,
    .el-breadcrumb__inner a {
      color: #fff;
    }
    .el-breadcrumb__inner.is-link:hover,
    .el-breadcrumb__inner a:hover {
      color: #67c23a;
    }
    .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a {
      color: #aaa;
    }
    .el-breadcrumb__inner.is-link,
    .el-breadcrumb__inner a {
      font-weight: 400;
    }
  }
}
</style>
