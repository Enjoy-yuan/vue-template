<template>
  <div>
    <div class="treeMap">
      <div class="treeMap-item">
        <treeMap1></treeMap1>
      </div>
      <div class="treeMap-item">
        <treeMap2></treeMap2>
      </div>
    </div>
  </div>
</template>

<script>
import treeMap1 from './components/treeMap1'
import treeMap2 from './components/treeMap2'
export default {
  components: {
    treeMap1,
    treeMap2
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.treeMap {
  display: flex;
  flex-wrap: wrap;
  .treeMap-item {
    width: 50%;
  }
}
</style>
