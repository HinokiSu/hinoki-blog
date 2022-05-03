<template>
  <div class="article-detail">
    <div class="article-main">
      <div class="article-header">
        <article-author class="author"></article-author>
        <div class="publish-time">
          {{ publishTime }}
        </div>
      </div>
      <separate-line></separate-line>
      <div class="article-main-content">
        <div class="title">
          {{ article.title }}
        </div>

        <div class="description">
          <p>
            {{ article.description }}
          </p>
        </div>
        <div class="content">
          <!-- TODO 需要替换为 markdown 去在客户端中解析 -->
          <div v-html="article.markdown"></div>
        </div>
        <div class="toc__open-icon"></div>
        <div class="toc__wrapper" :class="tocStatus ? '--active' : ''">
          <List class="icon list" @click="changeTocStatus" />
          <div class="toc__container">
            <ChevronRight class="icon chevron-right" @click="changeTocStatus" />
            <div ref="tocRef" class="toc"></div>
          </div>
        </div>
      </div>
    </div>
    <separate-line></separate-line>
    <div class="article-footer">
      <div class="tags">
        <article-tags :tags="article.classification"> </article-tags>
      </div>
      <article-comment @click-textarea="modalHanler"></article-comment>
    </div>
    <a-modal
      v-model:visible="modalVisible"
      :title="modalStatus.modalTitle"
      width="100%"
      wrap-class-name="full-modal"
      @ok="modalHanler"
    >
      <template #footer></template>
      <visitor-login @close-modal="modalHanler" v-if="modalStatus.isLogin" @click="modalBodyHandler"></visitor-login>
      <visitor-register @close-modal="modalHanler" v-else @click="modalBodyHandler"></visitor-register>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { useArticleStore } from '@web/stores/articleStore'
import { markdownParser } from '@web/plugins/md-it'
import ArticleAuthor from '@web/components/article-item/article-author.vue'
import SeparateLine from '@web/components/separator/separate-line.vue'
import ArticleTags from '@web/components/article-item/article-tags.vue'
import ArticleComment from '@web/components/article-comment/article-comment.vue'
import ArticleAnchor from '@web/components/article-item/article-anchor.vue'
import { ChevronRight, List } from '@fect-ui/vue-icons'
import VisitorLogin from '@web/components/visitor/visitor-login.vue'
import VisitorRegister from '@web/components/visitor/visitor-register.vue'
import { useVisitorStore } from '@web/stores/visitorStore'
export default defineComponent({
  name: 'ArticleDetail',
  components: {
    ArticleAuthor,
    SeparateLine,
    ArticleTags,
    ArticleComment,
    ArticleAnchor,
    List,
    ChevronRight,
    VisitorLogin,
    VisitorRegister,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const ArticleStore = useArticleStore()
    const articleId = computed(() => route.params?.id)
    const article = computed(() => ArticleStore.articleData)
    const tocRef = ref()
    const VisitorStore = useVisitorStore()
    const publishTime = computed(() => article.value.createdAt?.split(' ')[0].replace(/-/g, '/'))

    const fetchData = async (id: string) => {
      await ArticleStore.getArticleById(id)
    }

    // 处理markdown
    const getArticle = async () => {
      if (articleId) {
        await fetchData(articleId.value as string)
        ArticleStore.articleData.markdown = markdownParser(tocRef).render(
          ArticleStore.articleData.markdown ? ArticleStore.articleData.markdown : ''
        )
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

    // TODO: 动态获取 可视屏幕的宽度
    // 965px尺寸式，默认不展开，toc 主体

    // 控制toc的展开,
    const tocStatus = ref(false)
    const changeTocStatus = () => {
      tocStatus.value = !tocStatus.value
    }

    // 控制 注册/登录 的Modal的显示
    const modalVisible = ref<boolean>(false)

    const modalStatus = reactive({
      isLogin: true,
      modalTitle: '',
    })

    const modalHanler = () => {
      modalVisible.value = !modalVisible.value
    }

    watchEffect(() => {
      if (modalStatus.isLogin) {
        modalStatus.modalTitle = '登录'
      } else {
        modalStatus.modalTitle = '注册'
      }

      // 监视 visitorStatus
      if (VisitorStore.visitorStatus) {
        modalVisible.value = false
      }
    })

    const modalBodyHandler = () => {
      modalStatus.isLogin = !modalStatus.isLogin
    }

    return {
      article,
      publishTime,
      tocRef,
      tocStatus,
      changeTocStatus,

      modalHanler,
      modalVisible,

      modalStatus,
      modalBodyHandler,
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

  & .article-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .author {
      margin-left: 16px;
    }

    .publish-time {
      padding-top: 8px;
      color: var(--accents-3);
    }
  }

  & .article-main-content {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 48px;
    word-break: break-all;
    position: relative;

    .title {
      font-size: 2.4rem;
      font-weight: 600;
      margin-top: 12px;
      margin-bottom: 8px;
    }

    .description {
      margin: 10px 0;
    }

    .content {
      width: 100%;
    }

    // toc 目录控制
    .toc__wrapper {
      position: fixed;
      right: 64px;

      & .icon {
        cursor: pointer;
      }

      .toc__container {
        display: none;
      }

      &.--active {
        width: 240px;

        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px;
        border-radius: 12px;
        padding: 8px;

        .list {
          display: none;
        }

        .toc__container {
          display: flex;

          .chevron-right {
            display: block;
            width: 32px;
          }
        }

        .toc {
          height: 400px;
          overflow: auto;
          margin-left: 4px;
          position: relative;
          visibility: visible;
          padding: 8px;
        }
      }
    }
  }

  .article-footer {
    justify-content: flex-end;
    display: flex;
    justify-content: space-between;
    margin: 0 16px;

    .tags {
      display: flex;
      column-gap: 8px;
    }
  }

  @media screen and (max-width: 965px) {
    & {
      & .article-main-content {
        width: 100%;
        margin-left: 0;

        .toc__wrapper {
          right: 24px;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    & {
      & .article-main-content {
        .toc__wrapper {
          right: 0;
        }
      }
    }
  }
}
</style>
