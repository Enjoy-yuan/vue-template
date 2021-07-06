<template>
  <div>
    <div class="form">
      <el-form :model="form" :inline="true">
        <el-form-item prop="name">
          <el-input v-model="form.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item prop="region">
          <el-select filterable allow-create v-model="form.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="time">
          <el-date-picker
            :end-placeholder="'开始时间'"
            :start-placeholder="'结束时间'"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData" icon="el-icon-search">{{ $t('search') }}</el-button>
          <el-button type="primary" @click="resetForm" style="margin-left: 10px;" icon="el-icon-delete">{{
            $t('reset')
          }}</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" icon="el-icon-download" @click="downloadExcelFront">导出Excel</el-button>
        <!-- <el-button type="primary" icon="el-icon-download" @click="downloadExcelUrl">url导出Excel</el-button> -->
      </div>
    </div>
    <div class="table" ref="table">
      <el-table :height="tableHeight" :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" width="50" label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + (currentPage - 1) * pageSize }}</span>
          </template></el-table-column
        >
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="handleEdit(scope.row.id)" style="color:#67c23a;cursor:pointer;">
              修改
            </span>
            <span @click="handleDelete(scope.row.id)" style="color:#67c23a;cursor:pointer;">
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="getTableData"
        @current-change="getTableData"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <div class="dialog">
      <el-dialog v-el-drag-dialog title="收货地址" width="30%" :visible.sync="dialogVisible">
        <el-form :hide-required-asterisk="true" :model="dialogForm" ref="form" :rules="rules">
          <el-form-item label="姓名" label-width="100px">
            <el-input v-model="dialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" label-width="100px">
            <el-input v-model="dialogForm.age"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { table } from '@/utils/mixins'
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  mixins: [table],
  directives: { elDragDialog },
  data() {
    return {
      tableData: [
        {
          name: '111'
        },
        {
          name: '222'
        },
        {
          name: '333'
        }
      ], // 表格数据
      form: {}, // 表单数据
      dialogForm: {}, // 弹出框表单数据
      // 数据校验
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        region: [{ required: true, message: '活动区域不能为空', trigger: 'blur' }]
      },
      dialogVisible: false // 弹出框是否显示
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    downloadExcelFront() {
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['姓名', '年龄']
        const filterVal = ['name', 'age']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      if (this.tableData.length === 0) {
        this.$message.warning('表格数据为空')
      } else {
        return this.tableData.map((v) =>
          filterVal.map((j) => {
            return v[j]
          })
        )
      }
    },
    downloadExcelUrl() {
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      // 替换未后端给的url地址
      a.href = 'https://www.360yunxi.com/_next/static/images/login-bg-8e5ea703150c3deac9f3034b1663ab16.gif'
      a.dispatchEvent(event)
    },
    // 获取表格数据
    getTableData() {},
    // 编辑
    handleEdit() {
      this.dialogForm = {}
      this.dialogVisible = true
    },
    // 删除
    confirmDelete() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
}
</style>
