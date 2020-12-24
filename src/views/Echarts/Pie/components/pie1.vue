<template>
  <div>
    <div :style="{ height: echartsHeight }" ref="ref_echart"></div>
  </div>
</template>

<script>
export default {
  props: ['pieData', 'title'],
  data() {
    return {
      chartInstane: null, // echart实例
      echartsHeight: 0 // 图表高度
    }
  },
  watch: {
    pieData: function(pieData) {
      this.updataChart(pieData)
    }
  },
  created() {
    window.addEventListener('resize', this.resizeHeight, false)
    this.resizeHeight()
  },
  mounted() {
    this.initCharts()
    // 此写法避免多组件之间相互覆盖
    window.addEventListener('resize', this.resizeEcharts, false)
    this.resizeEcharts()
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHeight, false)
    window.removeEventListener('resize', this.resizeEcharts, false)
  },
  methods: {
    // 初始化
    initCharts() {
      this.chartInstane = this.$echarts.init(this.$refs.ref_echart, 'macarons')
      const initOption = {
        title: {
          left: 20,
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '45%', // 设置半径大小
            label: {
              show: true,
              position: 'inner',
              formatter: '{d}%'
            }
          },
          // 放置两个重合的pie图，同时在内部和外部设置label
          {
            type: 'pie',
            radius: '45%',
            label: {
              show: true,
              fontSize: 16,
              position: 'outer',
              formatter: '{b}：{c}'
            }
          }
        ]
      }
      this.chartInstane.setOption(initOption)
    },
    // 更新
    updataChart(pieData) {
      const dataOption = {
        title: {
          text: this.title
        },
        series: [
          {
            data: pieData
          },
          {
            data: pieData
          }
        ]
      }
      this.chartInstane.setOption(dataOption)
    },
    // 重置echarts高度
    resizeHeight() {
      this.echartsHeight = (document.body.offsetHeight - 175) / 2 + 'px'
    },
    // 适配
    resizeEcharts() {
      // 图例大小的适配
      this.chartInstane.resize()
    }
  }
}
</script>

<style lang="scss" scoped></style>
