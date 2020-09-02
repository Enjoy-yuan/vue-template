<template>
  <div class="boxs">
    <div class="box">
      <div class="title">时间格式化moment</div>
      <div class="content">一周前：{{ lastweekTime }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      lastweekTime: ''
    }
  },
  created() {
    this.lastweekTime = moment()
      .subtract('days', 7)
      .format('YYYY-MM-DD hh:mm:ss')
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
