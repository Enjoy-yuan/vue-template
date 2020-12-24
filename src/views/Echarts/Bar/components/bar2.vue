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
      allData: null, // 获取的数据
      echartsHeight: 0, // 图表高度
      startValue: 0, // 动画起始值
      endValue: 9, // 动画结束值
      timer: null // 定时器
    }
  },
  watch: {
    barData: function(barData) {
      this.allData = barData
      this.updataChart()
      this.startInterval()
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
    clearInterval(this.timer)
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
          top: '18%', // 调整顶部距离
          right: '14%', // 调整右侧距离
          bottom: '4%',
          containLabel: true // 将底部label包括在内
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}'
        },
        xAxis: {
          name: '（单位：h)', // 横轴单位
          type: 'category'
        },
        yAxis: {
          name: '（单位：KW/h)', // 纵轴单位
          type: 'value'
        },
        series: [
          {
            type: 'bar'
          }
        ]
      }
      this.chartInstane.setOption(initOption)
      this.chartInstane.on('mouseover', () => {
        clearInterval(this.timer)
      })
      this.chartInstane.on('mouseout', () => {
        this.startInterval()
      })
    },
    // 更新
    updataChart() {
      const provinceArr = this.allData.map((item) => {
        return item.name
      })
      const valueArr = this.allData.map((item) => {
        return item.value
      })
      const dataOption = {
        title: {
          text: this.title
        },
        xAxis: {
          data: provinceArr
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue
        },
        series: [
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
      const titleFontSize = (this.$refs.echart.offsetWidth / 100) * 3.6
      let adapterOption = {}
      if (titleFontSize > 12) {
        adapterOption = {
          series: [
            {
              barWidth: titleFontSize,
              itemStyle: {
                barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
              }
            }
          ]
        }
      }
      this.chartInstane.setOption(adapterOption)
      this.chartInstane.resize()
    },
    // 开启定时器
    startInterval() {
      this.timer = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        this.updataChart()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped></style>
