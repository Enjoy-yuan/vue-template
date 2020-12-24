<template>
  <div>
    <div class="bar">
      <div class="bar-item item-top item-left" v-show="barData">
        <bar1 :barData="barData" title="渐变色"></bar1>
      </div>
      <div class="bar-item item-top" v-show="barData">
        <bar2 :barData="barData" title="自动滚动"></bar2>
      </div>
      <div class="bar-item item-left" v-show="barData">
        <bar3 :barData="barData" title="堆叠图"></bar3>
      </div>
    </div>
  </div>
</template>

<script>
import bar1 from './components/bar1'
import bar2 from './components/bar2'
import bar3 from './components/bar3'
export default {
  components: {
    bar1,
    bar2,
    bar3
  },
  data() {
    return {
      barData: []
    }
  },
  async created() {
    this.barData = (await this.$axios.get(`${window.location.origin}/echarts/barData.json`)).data
  }
}
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  flex-wrap: wrap;
  .bar-item {
    width: 49.5%;
    border: 1px solid #e5e7eb;
    padding: 10px;
  }
  .item-left {
    margin-right: 1%;
  }
  .item-top {
    margin-bottom: 10px;
  }
}
</style>
