<template>
    <div class="com-container" ref="container">
        <el-dropdown @command="handleCommand" style="margin-left: 30px;margin-top: 10px;">
            <span class="el-dropdown-link"> {{ showTitle }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item.key" v-for="(item, index) in optionsType" :key="index">{{
                    item.text
                }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="com-chart" :style="{ height: echartsHeight }" ref="echart"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chartInstane: null, // echart实例
            allData: null, // 获取的数据
            optionsType: [], // 下拉框数据
            choiceType: 'map', // 初始选中
            echartsHeight: '0' // 图表高度
        }
    },
    computed: {
        showTitle() {
            if (this.allData) {
                return this.allData[this.choiceType].title
            }
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
        // 点击下拉框
        handleCommand(currentType) {
            this.choiceType = currentType
            // 下拉框过滤
            this.optionsType = this.allData.type.filter((item) => {
                return item.key !== this.choiceType
            })
            this.updataChart()
        },
        // 初始化
        initCharts() {
            this.chartInstane = this.$echarts.init(this.$refs.echart, 'macarons')
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
                    trigger: 'axis'
                },
                legend: {
                    left: 30,
                    top: '3%',
                    icon: 'circle'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false // 最左边间隙是否从y轴开始
                },
                yAxis: {
                    type: 'value'
                }
            }
            this.chartInstane.setOption(initOption)
        },
        // 取值
        getData() {
            this.$axios.get(`${window.location.origin}/echarts/lineData.json`).then((res) => {
                this.allData = res.data
                // 下拉框过滤
                this.optionsType = this.allData.type.filter((item) => {
                    return item.key !== this.choiceType
                })
                this.updataChart()
            })
        },
        // 更新
        updataChart() {
            const colorArr1 = [
                'rgba(11,168,44,0.5)',
                'rgba(44,110,255,0.5)',
                'rgba(22,242,217,0.5)',
                'rgba(254,33,30,0.5)',
                'rgba(250,105,0,0.5)'
            ]
            const colorArr2 = [
                'rgba(11,168,44,0)',
                'rgba(44,110,255,0)',
                'rgba(22,242,217,0)',
                'rgba(254,33,30,0)',
                'rgba(250,105,0,0)'
            ]
            // 类目轴的数据
            const timeArr = this.allData.common.month
            // y轴series下的数据
            const valueArr = this.allData[this.choiceType].data
            const seriesArr = valueArr.map((item, index) => {
                return {
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    stack: this.choiceType, // 堆叠图?
                    areaStyle: {
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
            })
            // 图例的数据
            const legendArr = valueArr.map((item) => {
                return item.name
            })
            const dataOption = {
                xAxis: {
                    data: timeArr
                },
                legend: {
                    data: legendArr
                },
                series: seriesArr
            }

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

<style lang="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
}
</style>
