<template>
  <div class="footer-wrapper">
    <p class="icp-info">
      <a href="https://beian.miit.gov.cn/">鲁ICP备2021045142号-1</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.footer-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 5px;

  .icp-info {
    a {
      color: inherit;
      font-size: 14px;
      color: #222;
    }
  }
}
</style>
