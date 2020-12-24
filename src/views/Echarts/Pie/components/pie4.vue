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
      echartsHeight: 0 // 图表高度
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
      this.chartInstane = this.$echarts.init(this.$refs.ref_echart)
      const initOption = {
        title: [
          {
            text: '已完成',
            x: 'center',
            top: '55%',
            textStyle: {
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '100'
            }
          },
          {
            text: '75%',
            x: 'center',
            top: '38%',
            textStyle: {
              fontSize: '60',
              color: '#FFFFFF',
              fontFamily: 'DINAlternate-Bold, DINAlternate',
              foontWeight: '600'
            }
          }
        ],
        polar: {
          radius: ['42%', '52%'],
          center: ['50%', '50%']
        },
        angleAxis: {
          max: 100,
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            roundCap: true,
            barWidth: 90,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(66, 66, 66, .3)'
            },
            data: [60],
            coordinateSystem: 'polar'

            // itemStyle: {
            //     normal: {
            //         color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            //                 offset: 0,
            //                 color: '#16CEB9',
            //             },
            //             {
            //                 offset: 1,
            //                 color: '#6648FF',
            //             },
            //         ]),
            //     },
            // },
          },
          {
            name: '',
            type: 'pie',
            startAngle: 80,
            radius: ['56%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              color: 'rgba(66, 66, 66, .1)',
              borderWidth: 1,
              borderColor: '#5269EE'
            },
            data: [100]
          },
          {
            name: '',
            type: 'pie',
            startAngle: 80,
            radius: ['38%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              color: 'rgba(66, 66, 66, .1)',
              borderWidth: 1,
              borderColor: '#5269EE'
            },
            data: [100]
          }
        ]
      }

      this.chartInstane.setOption(initOption)
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
