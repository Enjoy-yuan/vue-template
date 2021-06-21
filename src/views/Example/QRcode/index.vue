<template>
  <div>
    <div style="width: 200px;">
      <div id="canvasImg">
        <ul>
          <li>二维码名称</li>
        </ul>
        <div id="qrcode"></div>
        <ul>
          <li>二维码编码</li>
        </ul>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" @click="downloadCode">下载二维码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import Html2canvas from 'html2canvas'
export default {
  data() {
    return {}
  },
  mounted() {
    this.qrcode('https://www.baidu.com/')
  },
  methods: {
    qrcode(url) {
      // 一定要加上document.getElementById("qrcode").innerHTML = "";，否则每点击一次按钮就会多一个二维码
      document.getElementById('qrcode').innerHTML = ''
      new QRCode('qrcode', {
        width: 100, // 二维码宽度，单位像素
        height: 100, // 二维码高度，单位像素
        text: url // 生成二维码的链接
      })
    },
    downloadCode() {
      const aElement = document.createElement('a')
      const event = new MouseEvent('click') // 创建一个单击事件
      new Html2canvas(document.getElementById('canvasImg')).then((canvas) => {
        aElement.href = canvas.toDataURL()
        aElement.download = '二维码名称'
        aElement.dispatchEvent(event) // 触发a的单击事件
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#canvasImg {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    line-height: 26px;
  }
}
</style>
