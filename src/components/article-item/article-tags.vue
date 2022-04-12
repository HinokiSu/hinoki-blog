<template>
  <div class="article-tags">
    <div class="tags__icon">
      <svg width="21" height="21" class="afd">
        <path
          d="M4.66 8.72L3.43 9.95a1.75 1.75 0 0 0 0 2.48l5.14 5.13c.7.7 1.8.69 2.48 0l1.23-1.22 5.35-5.35a2 2 0 0 0 .51-1.36l-.32-4.29a2.42 2.42 0 0 0-2.15-2.14l-4.3-.33c-.43-.03-1.05.2-1.36.51l-.79.8-2.27 2.28-2.28 2.27zm9.83-.98a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>
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
.article-tags {
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .tags__icon {
    height: 100%;
    margin-right: 12px;
  }

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
</style>
