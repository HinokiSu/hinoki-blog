<template>
  <div class="article-tags">
    <article-tag-icon></article-tag-icon>
    <div class="tags__container">
      <span class="article__tag" v-for="tag in tags" :key="tag._id" type="success" use-invert> {{ tag.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ICategory } from '@web/interfaces/ICategory'
import { defineComponent, PropType } from 'vue'
import articleTagIcon from './article-tag-icon.vue'
export default defineComponent({
  name: 'ArticleTags',
  components: { articleTagIcon },
  props: {
    tags: Object as PropType<ICategory[]>,
  },
  setup(props) {
    return {}
  },
})
</script>

<style lang="less" scoped>
.article-tags {
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .tags__container {
    & .article__tag {
      padding: 4px 8px;
      margin-right: 8px;
      transition: all 0.5s ease;
      background-color: var(--accents-2);
      border-radius: 4px;
      cursor: pointer;
      color: var(--accents-5);
      font-size: 0.9rem;

      &:hover {
        color: var(--accents-6);
        background-color: var(--accents-2);
        box-shadow: 0 0 16px var(--accents-2);
      }
    }
  }
}
</style>
