<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    console.log('当前环境：' + process.env.NODE_ENV)
    console.log('当前环境api：' + process.env.VUE_APP_BaseUrl)
    console.log('当前环境api2：' + process.env.VUE_APP_BaseUrl2)
  }
}
</script>

<style lang="scss" scope>
#app {
  height: 100%;
}
</style>
