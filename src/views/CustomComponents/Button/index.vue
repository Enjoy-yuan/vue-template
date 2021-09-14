<template>
  <div>
    <div>不同类型</div>
    <Button type="primary" @click="btnClick">主按钮</Button>
    <Button style="margin: 0 20px;">默认类型</Button>
    <Button :disabled="true">禁用按钮</Button>

    <div style="margin-top: 20px;">不同尺寸</div>
    <Button size="large">大按钮</Button>
    <Button style="margin: 0 20px;">默认尺寸</Button>
    <Button size="small">小按钮</Button>

    <div class="text">事件: click</div>
  </div>
</template>

<script>
// 调用npm方法
import MyFun from 'yc-vue-common'
export default {
  data() {
    return {}
  },
  methods: {
    btnClick() {
      MyFun.Utils.fn()
    }
  }
}
</script>

<style lang="scss" scoped>
// 调用npm样式
@import 'yc-vue-common/styles/variable.scss';
.text {
  margin-top: 20px;
  color: $primary-color;
}
</style>
