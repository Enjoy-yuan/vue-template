<template>
  <div>
    <div :style="{ height: echartsHeight }" ref="echart"></div>
  </div>
</template>

<script>
export default {
  props: ['barData', 'title'],
  data() {
    return {
      chartInstane: null, // echart实例
      echartsHeight: 0 // 图表高度
    }
  },
  // 不要使用箭头函数，会改变this指向，无法调用vue实例的属性和方法
  watch: {
    barData: function(barData) {
      barData = barData.slice(0, 2)
      this.updataChart(barData)
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
      this.chartInstane = this.$echarts.init(this.$refs.echart, 'macarons')
      const initOption = {
        title: {
          left: 20
        },
        legend: {
          data: ['bar1', 'bar2', 'bar3']
        },
        grid: {
          left: '4%',
          top: '14%',
          right: '4%',
          bottom: '4%',
          containLabel: true // 将底部label包括在内
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            name: 'bar1',
            stack: '总量'
          },
          {
            type: 'bar',
            name: 'bar2',
            stack: '总量'
          },
          {
            type: 'bar',
            name: 'bar3',
            stack: '总量'
          }
        ]
      }
      this.chartInstane.setOption(initOption)
    },
    // 更新
    updataChart(barData) {
      const provinceArr = barData.map((item) => {
        return item.name
      })
      const valueArr = barData.map((item) => {
        return item.value
      })
      const dataOption = {
        title: {
          text: this.title
        },
        xAxis: {
          data: provinceArr
        },
        series: [
          {
            data: valueArr
          },
          {
            data: valueArr
          },
          {
            data: valueArr
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
