<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      console.log(666)
    }, 3000);
  }
};
</script>
