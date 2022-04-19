<template>
  <div class="articles-wrapper">
    <content-layout header-title="所有文章">
      <article-item class="article" :article="article" v-for="article in articles" :key="article._id"></article-item>
    </content-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import contentLayout from '@web/layouts/content-layout.vue'
import articleItem from '@web/components/article-item/article-item.vue'
import { useArticleStore } from '@web/stores/articleStore'
export default defineComponent({
  name: 'Articles',
  components: { articleItem, contentLayout },
  setup() {
    const ArticleStore = useArticleStore()
    const articles = computed(() => ArticleStore.articleList)

    onMounted(async () => {
      await ArticleStore.getAllArticle()
    })

    onBeforeUnmount(() => {
      ArticleStore.recycleArticleData()
    })

    return {
      articles,
    }
  },
})
</script>

<style lang="less" scoped>
.articles-wrapper {
  .article {
  }
}
</style>
