<template>
  <div class="hinoki__separator separate-line">
    <div class="dashed-line"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SeparatorLine',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki__separator {
  width: inherit;
  box-sizing: border-box;
  display: block;
  &.separate-line {
    .dashed-line {
      width: 100%;
      align-self: center;
      margin: 10px 0;

      // ref: https://segmentfault.com/q/1010000002442556
      height: 1px;
      background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
      background-size: 8px 1px;
      background-repeat: repeat-x;
    }
  }
}
</style>
