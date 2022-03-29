<template>
  <div class="hinoki-blog article-tags">
    <span class="article__tag" v-for="tag in tags" :key="tag._id" type="success" use-invert> {{ tag.name }}</span>
  </div>
</template>

<script lang="ts">
import { ICategory } from '@web/interfaces/ICategory'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ArticleTags',
  props: {
    tags: Object as PropType<ICategory[]>,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.article-tags {
    display: flex;
    flex-direction: row;

    & .article__tag {
      padding: 4px 6px;
      margin-right: 8px;
      transition: all 0.5s ease;
      background-color: var(--accents-2);
      border-radius: 4px;
      cursor: pointer;
      color: var(--accents-5);

      &:hover {
        color: var(--accents-6);
        background-color: var(--accents-2);
        box-shadow: 0 0 16px var(--accents-2);
      }
    }
  }
}
</style>
