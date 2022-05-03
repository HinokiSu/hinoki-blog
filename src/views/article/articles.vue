<template>
  <div class="articles-wrapper">
    <content-layout header-title="所有文章">
      <article-item class="article" :article="article" v-for="article in articles" :key="article._id"></article-item>
    </content-layout>
    <div class="load-more__wrapper">
      <div class="load-more" v-if="visible" @click="loadMore">加载更多...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import contentLayout from '@web/layouts/content-layout.vue'
import articleItem from '@web/components/article-item/article-item.vue'
import { useArticleStore } from '@web/stores/articleStore'
export default defineComponent({
  name: 'Articles',
  components: { articleItem, contentLayout },
  setup() {
    const ArticleStore = useArticleStore()
    const articles = computed(() => ArticleStore.articleList)
    const pageNum = ref<number>(1)
    const pageSize = ref<number>(2)
    const visible = ref<boolean>(true)
    onMounted(async () => {
      await ArticleStore.getArticleByPagination(pageNum.value, pageSize.value)
    })

    const loadMore = async () => {
      pageNum.value = pageNum.value + 1
      await ArticleStore.getArticleByPagination(pageNum.value, pageSize.value)
      // 返回的是空数组，说明已经分页查询完成
      if (ArticleStore.isFinished) {
        visible.value = !visible.value
      }
    }

    onBeforeUnmount(() => {
      ArticleStore.recycleArticleData()
    })

    return {
      articles,
      visible,
      loadMore,
    }
  },
})
</script>

<style lang="less" scoped>
.articles-wrapper {
  width: 100%;
  .load-more__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    .load-more {
      text-align: center;
      margin-top: 16px;
      width: 100px;
      padding: 4px 0;
      line-height: 32px;

      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
      transition: all 0.8s ease;
      color: var(--accents-5);
      border: 1px solid #ececec;
      border-radius: 8px;

      &:hover {
        color: var(--accents-8);
        transition: all 0.4s ease;
        border-color: #c3c0c0;
      }
    }
  }
}
</style>
