<template>
  <div class="content-wrapper">
    <div class="content-container">
      <div class="main-text">
        <p>Hey! This here 👋</p>
        <p>I'm Hinoki 🌠</p>
        <p>This ia a personal development record Website.</p>
        <p>Enjoy!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeContent',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
/* 内容 文本 */

.content-wrapper {
  display: flex;
  align-items: flex-end;

  .content-container {
    margin-left: 40px;
    margin-bottom: 40px;

    @media (max-width: 968px) {
      margin-bottom: 50px;
    }
    .main-text {
      p {
        font-size: 48px;
        font-weight: normal;
      }
      @media (max-width: 1200px) {
        p {
          font-size: 34px;
        }
      }

      @media (max-width: 968px) {
        p {
          font-size: 44px;
        }
      }

      @media (max-width: 876px) {
        p {
          font-size: 38px;
        }
      }
    }
  }
}
</style>
