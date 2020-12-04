<template>
  <div>
    <div class="pie">
      <div class="pie-item">
        <pie1></pie1>
      </div>
      <div class="pie-item">
        <pie2></pie2>
      </div>
      <div class="pie-item">
        <pie3></pie3>
      </div>
    </div>
  </div>
</template>

<script>
import pie1 from './components/pie1'
import pie2 from './components/pie2'
import pie3 from './components/pie3'
export default {
  components: {
    pie1,
    pie2,
    pie3
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.pie {
  display: flex;
  flex-wrap: wrap;
  .pie-item {
    width: 50%;
  }
}
</style>
