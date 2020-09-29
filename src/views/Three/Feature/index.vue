<template>
  <div style="padding-left: 30px;padding-right: 30px;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="点击高亮" name="first">
        <First v-if="activeName==='first'"></First>
      </el-tab-pane>
      <el-tab-pane label="轨迹动画" name="second"><Second v-if="activeName==='second'"></Second></el-tab-pane>
      <el-tab-pane label="添加标签" name="third"><Third v-if="activeName==='third'"></Third></el-tab-pane>
      <el-tab-pane label="控制摄像机" name="fourth"><Fourth v-if="activeName==='fourth'"></Fourth></el-tab-pane>
      <el-tab-pane label="加载关卡" name="fifth"><Fifth v-if="activeName==='fifth'"></Fifth></el-tab-pane>
      <el-tab-pane label="事件触发" name="sixth"><Sixth v-if="activeName==='sixth'"></Sixth></el-tab-pane>
      <el-tab-pane label="多线段与运动" name="seventh"><Seventh v-if="activeName==='seventh'"></Seventh></el-tab-pane>
      <el-tab-pane label="相机漫游" name="eighth"><Eighth v-if="activeName==='eighth'"></Eighth></el-tab-pane>
      <el-tab-pane label="轨迹动画" name="ninth"><Ninth v-if="activeName==='ninth'"></Ninth></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import First from './Tabs/first'
import Second from './Tabs/second'
import Third from './Tabs/third'
import Fourth from './Tabs/fourth'
import Fifth from './Tabs/fifth'
import Sixth from './Tabs/sixth'
import Seventh from './Tabs/seventh'
import Eighth from './Tabs/eighth'
import Ninth from './Tabs/ninth'
export default {
  name: "feature",
  components: { First, Second, Third, Fourth, Fifth, Sixth, Seventh,Eighth, Ninth },
  data() {
    return {
      activeName: 'third'
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
}
</script>
