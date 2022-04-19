<template>
  <span class="sperator-dot" :style="styles"></span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SeparateDot',
  props: {
    w: {
      type: String,
      default: '4px',
    },
    h: {
      type: String,
      default: '4px',
    },
    color: {
      type: String,
      default: '#888',
    },
  },
  setup(props) {
    return {
      styles: computed(() => ({
        width: props.w,
        height: props.h,
        'background-color': props.color,
      })),
    }
  },
})
</script>

<style lang="less" scoped>
.sperator-dot {
  margin: 0 4px;
  border-radius: 50%;
}
</style>
