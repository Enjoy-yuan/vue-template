<template>
  <div>
music
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created() {
      this.axios.post(`/api/search/pc?type=1&offset=0&limit=40&s='邓紫棋'`)
      .then((res)=>{
        console.log(res)
      })
  },
}
</script>

<style scoped>

 
</style>
