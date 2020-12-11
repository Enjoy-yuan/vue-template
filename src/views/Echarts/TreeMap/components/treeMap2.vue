<template>
  <div>
    <div :style="{ height: echartsHeight }" ref="echart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstane: null, // echart实例
      allData: null, // 获取的数据
      echartsHeight: '0' // 图表高度
    }
  },
  created() {
    window.addEventListener('resize', this.resizeHeight, false)
    this.resizeHeight()
  },
  mounted() {
    this.initCharts()
    this.getData()
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
      this.chartInstane = this.$echarts.init(this.$refs.echart, 'macarons')
      const initOption = {
        tooltip: {
          show: true,
          formatter: '{b0}: {c0}'
        },
        series: [
          {
            name: '概念',
            type: 'treemap',
            breadcrumb: false, // 面包屑导航
            roam: false, // 可拖拽漫游
            nodeClick: false, // 可点击
            // width: '100%', // 撑满宽度
            itemStyle: {
              normal: {
                borderWidth: 1
              }
            },
            label: {
              normal: {
                formatter: '{b0}: {c0}'
              }
            }
          }
        ]
      }
      this.chartInstane.setOption(initOption)
    },
    // 取值
    getData() {
      this.allData = [
        {
          name: 'nodeA',
          value: 10
        },
        {
          name: 'nodeB',
          value: 20
        },
        {
          name: 'nodeC',
          value: 30
        },
        {
          name: 'nodeD',
          value: 40
        },
        {
          name: 'nodeE',
          value: 50
        }
      ]
      this.updataChart()
    },
    // 更新
    updataChart() {
      const dataOption = {
        series: [
          {
            data: this.allData
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
