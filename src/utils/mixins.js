export let table = {
  data() {
    return {
      // 表格数据
      tableData: [],
      tableHeight: 0, // 表格自适应的高度
      currentPage: 1, // 当前页
      pageSizes: [15, 20, 30, 50], // 可选的分页
      pageSize: 15, // 当前分页每页的数量
      total: 0 // 总数据量
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = document.body.offsetHeight - this.$refs.table.offsetTop - 60
      // 监听窗口大小变化
      window.onresize = () => {
        this.tableHeight = document.body.offsetHeight - this.$refs.table.offsetTop - 60
      }
    })
  },
  methods: {
    // 重置form表单
    resetForm() {
      this.$refs.form.resetFields()
    },
    // 删除分类
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.confirmDelete()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            showClose: true,
            message: '已取消删除'
          })
        })
    },
    // 添加方法，防止报错
    confirmDelete() {}
  }
}
