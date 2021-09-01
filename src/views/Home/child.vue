<template>
  <div>
    孩子节点
    {{ this.obj }}
  </div>
</template>

<script>
export default {
  props: ['fn'],
  data() {
    return {
      obj: {
        name: 'jack'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.obj = { age: 9999 }
    }, 2000)
    this.fn(this)
    this.$emit('emitFn', this)
  }
}
</script>

<style lang="scss" scoped></style>
