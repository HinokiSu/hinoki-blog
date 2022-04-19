<template>
  <div class="footer-wrapper">
    <div class="icp-info">
      <a href="https://beian.miit.gov.cn/">鲁ICP备2021045142号-1</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterBar',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.footer-wrapper {
  text-align: center;
  .icp-info {
    a {
      color: inherit;
      font-size: 0.6rem;
      color: var(--accents-5);
      &:hover {
        color: var(--accents-6);
      }
    }
  }
}
</style>
