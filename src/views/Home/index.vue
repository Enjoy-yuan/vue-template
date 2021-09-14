<template>
  <div>welcome: {{ username }}</div>
</template>

<script>
import { getCookie } from '@/utils/cookie'
export default {
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = getCookie('username')
  }
}
</script>

<style lang="scss" scoped></style>
