<template>
  <div>
    <div class="bar">
      <div class="bar-item">
        <bar1></bar1>
      </div>
      <div class="bar-item">
        <bar2></bar2>
      </div>
      <div class="bar-item">
        <!-- <bar3></bar3> -->
      </div>
    </div>
  </div>
</template>

<script>
import bar1 from './components/bar1'
import bar2 from './components/bar2'
// import bar3 from './components/bar3'
export default {
  components: {
    bar1,
    bar2
    // bar3
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  flex-wrap: wrap;
  .bar-item {
    width: 50%;
  }
}
</style>
