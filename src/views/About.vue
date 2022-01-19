<template>
  <nav-bar></nav-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@web/components/nav-bar/index.vue'
export default defineComponent({
  components: {
    NavBar,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
