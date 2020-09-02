// 剪切板复制文字
import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: '复制成功',
    type: 'success',
    showClose: true,
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: '复制失败',
    type: 'error',
    showClose: true
  })
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
