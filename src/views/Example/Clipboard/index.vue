<template>
  <div>
    <div class="boxs">
      <div class="box">
        <div class="title">剪切板clipboard</div>
        <div class="content">
          <div class="form">
            <el-input style="width: 200px;margin-right: 10px;" v-model="copyText" placeholder="请输入要复制的文字"></el-input>
            <el-button type="primary" v-waves @click="copy($event)">复制</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'
import waves from '@/directive/waves'
import throttle from 'lodash/throttle'
export default {
  directives: {
    waves
  },
  data() {
    return {
      copyText: ''
    }
  },
  methods: {
    copy: throttle(
      function(e) {
        if (this.copyText) {
          clip(this.copyText, e)
        }
      },
      2000,
      {
        leading: true,
        trailing: false
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.boxs {
  display: flex;
  justify-content: space-between;
  .box {
    border: 1px solid #ddd;
    padding: 10px;
    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
