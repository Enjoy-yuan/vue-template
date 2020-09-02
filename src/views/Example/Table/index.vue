<template>
  <div>
    <div class="form">
      <el-form ref="form" :rules="rules" :model="form" :inline="true" :hide-required-asterisk="true">
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
            :picker-options="pickerOptions"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData" icon="el-icon-search">查询</el-button>
          <el-button type="primary" @click="resetForm" style="margin-left: 10px;" icon="el-icon-delete">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table" ref="table">
      <el-table :height="tableHeight" :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" width="50" label="序号">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + (currentPage - 1) * pageSize }}</span>
          </template></el-table-column
        >
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="birthday" label="生日"> </el-table-column>
        <el-table-column prop="city" label="地址"> </el-table-column>
        <el-table-column prop="color" label="颜色"> </el-table-column>
        <el-table-column label="操作" width="150">
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
      <el-dialog v-el-drag-dialog title="收货地址" width="30%" center :visible.sync="dialogVisible">
        <el-form :model="dialogForm">
          <el-form-item label="活动名称" label-width="100px">
            <el-input v-model="dialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" label-width="100px">
            <el-select v-model="dialogForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { table } from '@/utils/mixins'
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  mixins: [table],
  directives: { elDragDialog },
  data() {
    return {
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
  computed: {
    // 只能选择起始时间一个月内的时间
    pickerOptions() {
      let _this = this
      return {
        disabledDate(time) {
          const times = 86400000 * 30
          let curSelectTime = new Date(_this.minDate).getTime()
          let before = curSelectTime - times
          let after = curSelectTime + times
          return time.getTime() > after || time.getTime() < before
        },
        onPick({ maxDate, minDate }) {
          if (!maxDate) {
            _this.minDate = minDate
          }
        }
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      axios
        .post('/mock/api/users', {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then((res) => {
          this.tableData = res.data.data
          this.total = res.data.total
        })
      // }
      // })
    },
    // 编辑
    handleEdit() {
      this.dialogForm = {}
      this.dialogVisible = true
    },
    // 删除
    confirmDelete() {
      // console.log(222)
    }
  }
}
</script>

<style lang="scss" scoped></style>
