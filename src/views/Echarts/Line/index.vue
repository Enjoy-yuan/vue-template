<template>
  <div>
    <div class="line">
      <div class="line-item">
        <line1></line1>
      </div>
      <div class="line-item">
        <line2></line2>
      </div>
      <div class="line-item">
        <line3></line3>
      </div>
    </div>
  </div>
</template>

<script>
import line1 from './components/line1'
import line2 from './components/line2'
import line3 from './components/line3'
export default {
  components: {
    line1,
    line2,
    line3
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.line {
  display: flex;
  flex-wrap: wrap;
  .line-item {
    width: 50%;
  }
}
</style>
