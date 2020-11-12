<template>
    <div class="com-container" ref="container">
        <div class="com-chart" :style="{ height: echartsHeight }" ref="echart"></div>
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
            const initOption = {}
            this.chartInstane.setOption(initOption)
        },
        // 取值
        getData() {
            this.$axios.get(`${window.location.origin}/echarts/barData.json`).then((res) => {
                this.allData = res.data

                this.updataChart()
            })
        },
        // 更新
        updataChart() {
            const dataOption = {}
            this.chartInstane.setOption(dataOption)
        },
        // 重置echarts高度
        resizeHeight() {
            this.echartsHeight = document.body.offsetHeight - 175 + 'px'
        },
        // 适配
        resizeEcharts() {
            // 图例大小的适配
            let titleFontSize = (this.$refs.echart.offsetWidth / 100) * 1.5
            let adapterOption = {}
            if (titleFontSize > 12) {
                adapterOption = {
                    legend: {
                        itemWidth: titleFontSize,
                        itemHeight: titleFontSize,
                        itemGap: titleFontSize,
                        textStyle: {
                            fontSize: titleFontSize
                        }
                    }
                }
            }
            this.chartInstane.setOption(adapterOption)
            this.chartInstane.resize()
        }
    }
}
</script>

<style lang="scss" scoped></style>
