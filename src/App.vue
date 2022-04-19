<template>
  <!-- <router-view v-slot="Component">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view> -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="less">
@import url('@web/assets/css/global.css');
@import url('@web/assets/css/markdown-global.css');
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.full-modal {
  width: 50%;
  margin: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
  @media screen and (max-width: 700px) {
    & {
      width: 100%;
      .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
      }
      .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
      }
      .ant-modal-body {
        flex: 1;
        
      }
    }
  }

  @media screen and (max-height: 400px) {
    & {
      & .ant-modal-content {
        height: 100%;
      }
    }
  }
}
</style>
