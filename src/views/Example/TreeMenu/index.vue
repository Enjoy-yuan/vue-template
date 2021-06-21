<template>
  <div>
    <el-col :span="4">
      <el-scrollbar>
        <div class="leftTree">
          <el-tree
            ref="refTree"
            node-key="rowId"
            :data="treeData"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col :span="20">
      <div class="rightTable">
        {{ clickTreeLabel }}
      </div>
    </el-col>
  </div>
</template>

<script>
import { dataToTree } from '@/utils/myFun'
export default {
  data() {
    return {
      treeData: [],
      resData: [
        { rowId: 1, label: '1级菜单' },
        { parentId: 1, rowId: 2, label: '2级菜单' },
        { parentId: 2, rowId: 3, label: '3级菜单' },
        { rowId: 4, label: '1级菜单' },
        { parentId: 4, rowId: 5, label: '2级菜单' }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      clickTreeLabel: ''
    }
  },
  mounted() {
    // 将数据转成树形结构
    this.treeData = dataToTree(this.resData)
    this.getFirstData(this.treeData)
  },
  methods: {
    handleNodeClick(data) {
      this.clickTreeLabel = data.label
      // 初始进入设置样式
      this.$nextTick(() => {
        this.$refs.refTree.setCurrentKey(data.rowId)
      })
    },
    // 递归获取第一个最内层元素
    getFirstData(arr) {
      if (arr[0] && arr[0].children) {
        this.getFirstData(arr[0].children)
      } else {
        this.handleNodeClick(arr[0])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .is-current .el-tree-node__label {
    color: #67c23a;
  }
  .is-current .el-tree-node__children .el-tree-node__label {
    color: #606266;
  }
}
</style>
