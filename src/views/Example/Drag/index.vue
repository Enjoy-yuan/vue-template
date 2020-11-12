<template>
  <div>
    <draggable v-model="myArray" draggable=".item">
      <div v-for="element in myArray" :key="element.id" class="item">
        {{ element.name }}
      </div>
      <button slot="footer">Add</button>
      <img src="../../../../public/404.png" alt="" />
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
      myArray: [
        {
          name: 'aaa',
          id: 111
        },
        {
          name: 'bbb',
          id: 222
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
