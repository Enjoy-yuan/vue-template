<template>
  <div>
    <div id="shop">
      <p style="font-size: 20px;color:#67C23A;margin-top: 20px;margin-bottom: 20px;">全部商品如下：</p> 
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="margin-top:50px;width:200px;"
        @click="add"
        >添加商品</el-button
      >

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          price: "1518"
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          price: "1517"
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          price: "1519"
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          price: "1516"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style scoped>
#shop{
  text-align: center;
}
</style>
