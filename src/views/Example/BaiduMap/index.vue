<template>
  <div>
    <div id="allmap" :style="{ height: echartsHeight}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      echartsHeight: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeHeight, false)
    this.resizeHeight()

    //   const map = new window.BMap.Map('allmap')
    //   map.enableScrollWheelZoom(true)

    const map = new window.BMap.Map('allmap') // 创建Map实例
    // map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
    // 添加地图类型控件
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

    const point = new window.BMap.Point(114.14031, 30.64299)
    map.centerAndZoom(point, 16)
    const marker = new window.BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中

    map.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHeight, false)
  },
  methods: {
    resizeHeight() {
      this.echartsHeight = document.body.offsetHeight - 130 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
#allmap{
  width: 100%;
}
</style>
