<template>
  <div>
    <div class="pie">
      <div class="pie-item item-top item-left">
        <pie1 :pieData="pieData" title="重叠图"></pie1>
      </div>
      <div class="pie-item item-top">
        <pie2></pie2>
      </div>
      <div class="pie-item item-left">
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
    return {
      pieData: []
    }
  },
  async created() {
    this.pieData = (await this.$axios.get(`${window.location.origin}/echarts/barData.json`)).data.slice(0, 10)
  }
}
</script>

<style lang="scss" scoped>
.pie {
  display: flex;
  flex-wrap: wrap;
  .pie-item {
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
