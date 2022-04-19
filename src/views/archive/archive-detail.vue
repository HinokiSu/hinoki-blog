<template>
  <div class="archive-detail">
    <contentLayout headerTitle="归档" toName="archive">
      <div class="archive__header">
        <article-tag-icon width="30" height="30"></article-tag-icon>
        <div class="tag-name">
          {{ category.name }}
        </div>
      </div>
      <div class="articles-container">
        <article-item
          :has-tags="false"
          :article="article"
          v-for="article in articles"
          :key="article._id"
        ></article-item>
      </div>
      <a-empty v-if="isEmpty" description="没有发现文章" />
    </contentLayout>
  </div>
</template>

<script lang="ts">
import { useArticleStore } from '@web/stores/articleStore'
import { defineComponent, computed, onMounted, ref, watchEffect, watch, onBeforeMount, onBeforeUnmount } from 'vue'
import ContentLayout from '@web/layouts/content-layout.vue'
import ArticleTagIcon from '@web/components/article-item/article-tag-icon.vue'
import { useCategoryStore } from '@web/stores/categoryStore'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'ArchiveDetail',
  components: {
    ContentLayout,
    ArticleTagIcon,
  },
  setup() {
    const ArticleStore = useArticleStore()
    const CategoryStore = useCategoryStore()
    const articles = computed(() => ArticleStore.articleList)
    const category = computed(() => CategoryStore.categoryData)
    const route = useRoute()
    const cateId = computed(() => route.params.id as string)
    const isEmpty = ref<boolean>(false)

    watch(
      () => articles.value.length,
      () => {
        if (articles.value.length === 0) {
          isEmpty.value = true
        } else {
          isEmpty.value = false
        }
      }
    )
    onMounted(() => {
      if (cateId.value) {
        CategoryStore.getCategoryById(cateId.value).then(() => {
          ArticleStore.getArticlesByCateId(cateId.value)
        })
      }
    })

    onBeforeUnmount(() => {
      CategoryStore.recycleData()
      ArticleStore.recycleArticleData()
    })
    return {
      articles,
      category,
      isEmpty,
    }
  },
})
</script>

<style lang="less" scoped>
.archive-detail {
  .archive__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    .tag-name {
      margin-left: 8px;
      font-size: 2rem;
      font-weight: 500;
      color: var(--accents-6);
    }
  }
}
</style>
