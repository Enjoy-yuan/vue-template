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
      echartsHeight: '0', // 图表高度
      startValue: 0, // 动画起始值
      endValue: 9, // 动画结束值
      timer: null // 定时器
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
          text: '地区销量排行',
          left: 20
        },
        grid: {
          left: '4%',
          top: '14%',
          right: '4%',
          bottom: '4%',
          containLabel: true // 将底部label包括在内
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
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
    // 取值
    getData() {
      this.$axios.get(`${window.location.origin}/echarts/barData.json`).then((res) => {
        this.allData = res.data
        this.allData.sort((a, b) => b.value - a.value)
        this.updataChart()
        this.startInterval()
      })
    },
    // 更新
    updataChart() {
      const colorArr1 = ['rgba(44,110,255,0.5)', 'rgba(22,242,217,0.5)', 'rgba(254,33,30,0.5)']
      const colorArr2 = ['rgba(22,242,217,0.5)', 'rgba(254,33,30,0.5)', 'rgba(250,105,0,0.5)']
      const provinceArr = this.allData.map((item) => {
        return item.name
      })
      const valueArr = this.allData.map((item) => {
        return item.value
      })
      const dataOption = {
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
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                let index = 0
                if (arg.value > 300) {
                  index = 0
                } else if (arg.value > 200) {
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
