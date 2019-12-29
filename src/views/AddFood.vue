<template>
  <div>
    <div id="shop">
      <div>
        商品名称：<el-input
          v-model="name"
          placeholder="请输入商品名称"
        ></el-input>
      </div>
      <div>
        商品价格：<el-input
          type="number"
          v-model="price"
          placeholder="请输入商品价格"
          style="margin-top:20px;"
        ></el-input>
      </div>
      <el-button
        type="primary"
        style="margin-top:30px;width:128px;"
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
      name: "",
      price: ""
    };
  },
  methods: {
    add() {
      if (this.name === "") {
        this.$message("商品名称不能为空！");
      } else if (this.price === "") {
        this.$message("商品价格不能为空！");
      } else {
        this.$message("成功添加该商品！");
      }
      console.log(999);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 200px;
}
#shop {
  margin-top: 100px;
  text-align: center;
}
</style>
