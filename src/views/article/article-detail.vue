<template>
  <div class="article-detail">
    <div class="article-main">
      <div class="article-basic-info">
        <div class="article-header">
          <div class="author">
            <article-author></article-author>
          </div>
          <div class="title">
            {{ article.title }}
          </div>
          <div class="publish-time">
            <span>⌛</span>
            <span class="time">{{ article.updatedAt }}</span>
          </div>
        </div>
        <separate-line></separate-line>
        <div class="tags">
          <fe-tag :text="tag.name" v-for="tag in article?.classification" :key="tag._id" type="success" use-invert />
        </div>
      </div>
      <div class="article-main-content">
        <div class="description">
          {{ article.description }}
        </div>
        <div class="content">
          <div v-html="article.html"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useArticleStore } from '@web/stores/articleStore'
import { IArticle } from '@web/interfaces/IArticle'
import ArticleAuthor from '@web/components/article-item/article-author.vue'
import SeparateLine from '@web/components/separator/separate-line.vue'
export default defineComponent({
  name: 'ArticleDetail',
  components: {
    ArticleAuthor,
    SeparateLine,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const ArticleStore = useArticleStore()
    const articleId = computed(() => route.params?.id)
    const article = ref<IArticle>({})

    const fetchData = async (id: string) => {
      await ArticleStore.getArticleById(id)
    }

    const getArticle = async () => {
      if (articleId) {
        await fetchData(articleId.value as string)
        article.value = ArticleStore.articleData
      } else {
        router.push({
          name: 'home',
        })
      }
    }

    onMounted(() => {
      getArticle()
    })

    onBeforeUnmount(() => {
      ArticleStore.recycleArticleData()
    })
    return {
      article,
    }
  },
})
</script>

<style lang="less" scoped>
.article-detail {
  display: flex;
  flex-direction: column;
  padding: 48px 0;
  & .article-main {
    display: flex;
    flex-direction: column;
  }

  & .article-basic-info {
    & .article-header {
      justify-content: center;
      align-items: flex-end;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 4fr 1fr;
      column-gap: 12px;

      .author {
        margin-left: 16px;
        justify-items: flex-start;
      }

      .title {
        justify-self: center;
        font-size: 2rem;
      }

      .publish-time {
        justify-self: flex-end;
        padding-right: 16px;
        & :nth-child(1) {
          font-size: 1rem;
          padding: 0 4px;
        }
        .time {
          color: var(--accents-3);
        }
      }
    }

    & .tags {
      display: flex;
      justify-content: flex-end;
      column-gap: 4px;
      row-gap: 8px;

      padding-bottom: 12px;
      padding-right: 16px;
    }
  }

  & .article-main-content {
    max-width: 60%;
    align-self: center;
    display: flex;
    flex-direction: column;

    .description {
      margin: 10px 0;
    }
  }
}
</style>
