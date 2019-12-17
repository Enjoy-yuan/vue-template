<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    console.log(333)
  },
  created() {
    console.log(444)
  },
  beforeMount() {
    console.log(555)
  },
  mounted() {
    console.log(666)
  },
};
</script>
