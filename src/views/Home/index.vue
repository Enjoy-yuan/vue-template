<template>
  <div>
    首页
    <el-button type="text" @click="open">点击打开 Message Box</el-button>
    <child :fn="(ref) => (this.childRef = ref)" @emitFn="emitFn" :res="777"></child>
  </div>
</template>

<script>
import child from './child.vue'
export default {
  components: { child },
  data() {
    return {
      childRef: '',
      subList: [
        {
          deliveryState: '未交付',
          pointCode: 888
        },
        {
          deliveryState: '交付',
          pointCode: 777
        }
      ]
    }
  },
  mounted() {
    console.log(this.childRef)
    // setTimeout(() => {
    //   console.log(this.childRef)
    // }, 1000)
  },
  methods: {
    emitFn(msg) {
      console.log(msg)
    },
    open() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const list = this.subList.filter((i) => {
            return i.deliveryState === '未交付'
          })
          const data = list.map((i) => {
            return i.pointCode
          })
          console.log(data)
          return null
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    fn(msg) {
      console.log(msg)
    }
  }
}
</script>

<style scoped></style>
