<template>
  <div class="hinoki-blog about">
    <content-layout header-title="关于">
      <div class="about__introduction"></div>
    </content-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import contentLayout from '@web/layouts/content-layout.vue'
export default defineComponent({
  components: { contentLayout },
  name: 'About',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.about {
    .about__introduction {
    }
  }
}
</style>
