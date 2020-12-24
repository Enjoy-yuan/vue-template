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
        grid: {
          left: '4%',
          top: '14%',
          right: '4%',
          bottom: '10%',
          containLabel: true // 将底部label包括在内
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}'
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false // 不显示坐标轴刻度线
          }
        },
        yAxis: {
          show: false, // 不显示y轴
          type: 'value'
        },
        dataZoom: {
          show: true
        },
        series: [
          {
            type: 'bar',
            // 在上方开启数值显示
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      }
      this.chartInstane.setOption(initOption)
    },
    // 更新
    updataChart(barData) {
      const colorArr1 = ['rgba(44,110,255,0.5)', 'rgba(22,242,217,0.5)', 'rgba(254,33,30,0.5)']
      const colorArr2 = ['rgba(22,242,217,0.5)', 'rgba(254,33,30,0.5)', 'rgba(250,105,0,0.5)']
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
            data: valueArr,
            itemStyle: {
              color: (info) => {
                let index = 0
                if (info.value > 300) {
                  index = 0
                } else if (info.value > 200) {
                  index = 1
                } else {
                  index = 2
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colorArr1[index]
                  },
                  {
                    offset: 1,
                    color: colorArr2[index]
                  }
                ])
              }
            }
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
