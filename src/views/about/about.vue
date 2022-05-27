<template>
  <div class="hinoki-blog about">
    <content-layout header-title="关于">
      <div class="about__introduction">
        <p>你好!👋</p>
        <p>我是 Hinoki , 目前我从事于 前端开发 和 RPA开发的工作。热衷于使用 Vue 和 TypeScript进行开发。</p>
        <p>若对本博客的内容有新的想法🤔, 欢迎你在评论中表达出来✨。</p>
      </div>
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
    width: 100%;
    display: flex;
    flex-direction: column;
    .about__introduction {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 1.15rem;
    }
  }
}
</style>
