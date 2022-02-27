<template>
  <div class="hinoki-about">
    <div class="page-header">
      <span>About</span>
    </div>
    <separate-line></separate-line>
    <div class="page-main">
      <p>Hey! This here 👋</p>
      <p>I'm Hinoki 🌠</p>
      <p>This is a personal development record Website.</p>
      <p>Enjoy!</p>
    </div>
  </div>
</template>

<script lang="ts">
import separateLine from '@web/components/separator/separate-line.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { separateLine },
  name: 'About',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-about {
  & .page-header {
    font-size: 2rem;
    font-weight: 500;
    color: var(--accents-5);
  }

  & .page-main {
    display: flex;
    flex-direction: column;
    row-gap: 2px;

    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: 2px;
  }
}
</style>
