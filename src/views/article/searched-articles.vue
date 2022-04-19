<template>
  <div class="searched-articles">
    <div class="page-header">
      <span class="header-title">搜索到的文章</span>
    </div>
    <separate-line></separate-line>
    <div class="page-main">
      <article-item class="article" :article="article" v-for="article in articles" :key="article._id"></article-item>
      <div class="searched-articles__empty">
        <a-empty v-if="!isEmpty" description="未搜索到相关文章" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue'
import separateLine from '@web/components/separator/separate-line.vue'
import articleItem from '@web/components/article-item/article-item.vue'
import { useArticleStore } from '@web/stores/articleStore'
export default defineComponent({
  components: { separateLine, articleItem },
  name: 'SearchedArticles',
  setup() {
    const ArticleStore = useArticleStore()
    const articles = computed(() => ArticleStore.articleList)

    const isEmpty = ref(false)

    watchEffect(() => {
      if (articles.value.length !== 0) {
        isEmpty.value = true
      } else {
        isEmpty.value = false
      }
    })
    return {
      articles,
      isEmpty,
    }
  },
})
</script>

<style lang="less" scoped>
.searched-articles {
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
