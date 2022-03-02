<template>
  <div class="hinoki-articles">
    <div class="page-header">
      <span class="header-title">Articles</span>
    </div>
    <separate-line></separate-line>
    <div class="page-main">
      <article-item class="article" :article="article" v-for="article in articles" :key="article._id"></article-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import separateLine from '@web/components/separator/separate-line.vue'
import articleItem from '@web/components/article-item/article-item.vue'
import { useArticleStore } from '@web/stores/articleStore'
import { IArticle } from '@web/interfaces/IArticle'
export default defineComponent({
  components: { separateLine, articleItem },
  name: 'Articles',
  setup() {
    const ArticleStore = useArticleStore()
    const articles = ref<IArticle[]>([])

    onMounted(() => {
      ArticleStore.getAllArticle()
    })

    watch(
      () => ArticleStore.artilceCount,
      () => {
        if (ArticleStore.artilceCount === 0) {
          ArticleStore.getAllArticle()
        }
        articles.value = ArticleStore.articleList
      }
    )
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
