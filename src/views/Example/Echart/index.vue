<template>
  <div>
    <div id="echarts" style="height: 300px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      option: {
        xAxis: {
          data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
        },
        yAxis: {},
        series: [
          {
            type: 'k',
            data: [
              [20, 30, 10, 35],
              [40, 35, 30, 55],
              [33, 38, 33, 40],
              [40, 40, 32, 42]
            ]
          }
        ]
      }
    }
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('echarts'))
    myChart.setOption(this.option, true)
    // 改变窗口宽度，echarts自适应
    window.onresize = () => {
      myChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped></style>
