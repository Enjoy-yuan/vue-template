<template>
  <div>
    <div :style="{ height: echartsHeight }" ref="ref_echart"></div>
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
      this.chartInstane = this.$echarts.init(this.$refs.ref_echart, 'macarons')
      const initOption = {
        grid: {
          left: '4%',
          top: '14%',
          right: '4%',
          bottom: '4%',
          containLabel: true // 将底部label包括在内
        },
        // 鼠标滑动提示
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}'
        },
        legend: {
          left: 30,
          top: '3%',
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false // 最左边与y轴是否留有间隙，紧挨边缘
        },
        yAxis: {
          type: 'value',
          scale: true // y轴不从0开始
        }
      }
      this.chartInstane.setOption(initOption)
    },
    // 取值
    getData() {
      this.allData = {
        xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        yData: [3000, 2800, 900, 1000, 800, 700, 1400, 1300, 900, 1000, 800, 600]
      }
      this.updataChart()
    },
    // 更新
    updataChart() {
      // 图例的数据
      const dataOption = {
        xAxis: {
          data: this.allData.xData
        },
        series: [
          {
            name: '销量1',
            data: this.allData.yData,
            stack: 'all', // 设置堆叠
            type: 'line',
            // 最大值，最小值标注
            markPoint: {
              data: [
                // {
                //   type: 'max'
                // },
                {
                  type: 'min'
                }
              ]
            },
            // 平均值标注
            markLine: {
              data: [
                {
                  type: 'average'
                }
              ]
            },
            // 区间标注
            // markArea: {
            //   data: [
            //     [
            //       {
            //         xAxis: '1月'
            //       },
            //       {
            //         xAxis: '2月'
            //       }
            //     ],
            //     [
            //       {
            //         xAxis: '7月'
            //       },
            //       {
            //         xAxis: '8月'
            //       }
            //     ]
            //   ]
            // },
            smooth: true, // 设置平滑，主题自带
            // 线条样式
            lineStyle: {
            //   color: 'green',
              type: 'solid'
            },
            // 阴影区域填充
            areaStyle: {
              color: 'pink'
            }
          },
          {
            name: '销量2',
            data: this.allData.yData,
            stack: 'all',
            type: 'line'
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
