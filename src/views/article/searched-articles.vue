<template>
  <div class="hinoki-articles">
    <div class="page-header">
      <span class="header-title">搜索到的文章</span>
    </div>
    <separate-line></separate-line>
    <div class="page-main">
      <article-item class="article" :article="article" v-for="article in articles" :key="article._id"></article-item>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import separateLine from '@web/components/separator/separate-line.vue'
import articleItem from '@web/components/article-item/article-item.vue'
import { useArticleStore } from '@web/stores/articleStore'
export default defineComponent({
  components: { separateLine, articleItem },
  name: 'SearchedArticles',
  setup() {
    const ArticleStore = useArticleStore()
    const articles = computed(() => ArticleStore.articleList)

    return {
      articles,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-articles {
  & .page-header {
    .header-title {
      font-size: 2rem;
      font-weight: 500;
      color: var(--accents-5);
    }
  }

  & .page-main {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    margin-top: 24px;
  }
}
</style>
