<template>
  <div class="content-layout">
    <div class="layout__header">
      <router-link :to="{ name: toName }">
        <span class="header-title">{{ headerTitle }}</span>
      </router-link>
    </div>
    <separate-line></separate-line>
    <div class="layout__main">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import separateLine from '@web/components/separator/separate-line.vue'
export default defineComponent({
  name: 'ContentLayout',
  components: {
    separateLine,
  },
  props: {
    headerTitle: String,
    toName: String,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.content-layout {
  & .layout__header {
    .header-title {
      font-size: 2rem;
      font-weight: 500;
      color: var(--accents-5);
    }
  }

  & .layout__main {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }
}
</style>
