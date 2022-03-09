<template>
  <div class="article-detail">
    <div class="article-main">
      <div class="article-basic-info">
        <div class="article-header">
          <article-author class="author"></article-author>
          <div class="tags">
            <fe-tag :text="tag.name" v-for="tag in article?.classification" :key="tag._id" type="success" use-invert />
          </div>
        </div>
        <separate-line></separate-line>
        <div class="article-main-content">
          <div class="title">
            {{ article.title }}
          </div>
          <div class="publish-time">
            {{ publishTime }}
          </div>
          <div class="description">
            {{ article.description }}
          </div>
          <div class="content">
            <div v-html="article.html"></div>
          </div>
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
    const publishTime = computed(() => article.value.updatedAt?.split(' ')[0].replace(/-/g, '/'))

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
      publishTime,
    }
  },
})
</script>

<style lang="less" scoped>
.article-detail {
  display: flex;
  flex-direction: column;
  padding: 24px 0;

  // strip
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: var(--accents-1);
  }

  // track
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 3px var(--accents-2);
    border-radius: 12px;
    background-color: var(--accents-1);
  }

  // slider
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--accents-3);
  }

  & .article-main {
    display: flex;
    flex-direction: column;
  }

  & .article-basic-info {
    & .article-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .author {
        margin-left: 16px;
      }

      & .tags {
        display: flex;
        justify-content: flex-end;
        column-gap: 6px;
      }
    }
  }

  & .article-main-content {
    margin: 0 32px;
    word-break: break-all;
    .title {
      font-size: 2rem;
    }

    .publish-time {
      padding-top: 8px;
      color: var(--accents-3);
    }

    .description {
      margin: 10px 0;
    }
  }

  @media screen and (max-width: 500px) {
    & {
      & .article-main-content {
        margin: 0;
      }
    }
  }
}
</style>
