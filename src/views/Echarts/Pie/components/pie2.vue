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
        title: {
          text: '趋势分析',
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
            type: 'pie'
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
      this.updataChart()
    },
    // 更新
    updataChart() {
      const dataOption = {
        series: [
          {
            data: this.allData,
            label: {
              show: true,
              formatter: (info) => `${info.name}：${info.value}`
            },
            // 设置圆环
            radius: ['50%', '75%']
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
