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
          type: 'category',
          axisTick: {
            show: false // 不显示坐标轴刻度线
          }
        },
        yAxis: {
          show: false, // 不显示y轴
          type: 'value'
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
    // 取值
    getData() {
      this.allData = [
        {
          name: '广东',
          value: 230
        },
        {
          name: '福建',
          value: 214
        },
        {
          name: '浙江',
          value: 203
        },
        {
          name: '上海',
          value: 310
        },
        {
          name: '北京',
          value: 289
        },
        {
          name: '江苏',
          value: 207
        },
        {
          name: '四川',
          value: 189
        },
        {
          name: '重庆',
          value: 195
        },
        {
          name: '陕西',
          value: 160
        },
        {
          name: '湖南',
          value: 140
        }
      ]
      this.allData.sort((a, b) => b.value - a.value)
      this.updataChart()
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
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                // console.log(arg)
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
      this.chartInstane.resize()
    }
  }
}
</script>

<style lang="scss" scoped></style>
