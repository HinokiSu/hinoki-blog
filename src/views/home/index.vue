<template>
  <div class="home page-wrapper">
    <div class="individual-info">
      <div class="avatar">
        <fe-img
          skeleton
          width="160px"
          height="160px"
          max-delay="1200"
          src="https://avatars.githubusercontent.com/u/93910087?v=4"
        ></fe-img>
      </div>
      <div class="name-box">
        <div class="nickname">Hinoki</div>
        <div class="github-name">Hinoki_Su</div>
      </div>
      <div class="sns">
        <a href="https://github.com/HinokiSu">
          <span class="iconfont sns-GitHub"></span>
        </a>
      </div>
    </div>
    <separate-line class="line" />
    <div class="right-container">
      <div class="recently-content">
        <div class="caption">
          <h3>Recently Article</h3>
        </div>
        <!-- 列举最近发布的3篇文章 -->
        <div class="article-items">
          <article-item :article="articleItem" v-for="articleItem in articleList" :key="articleItem._id"></article-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import ArticleItem from '@web/components/article-item/article-item.vue'
import { useArticleStore } from '@web/stores/articleStore'
import SeparateLine from '@web/components/separator/separate-line.vue'
export default defineComponent({
  name: 'Home',
  components: { ArticleItem, SeparateLine },
  setup() {
    const ArticleStore = useArticleStore()

    const articleList = computed(() => ArticleStore.latestArticleList)

    onMounted(async () => {
      await ArticleStore.getLatestArticle()
    })

    onBeforeUnmount(() => {
      ArticleStore.recycleArticleData()
    })
    return {
      articleList,
    }
  },
})
</script>

<style lang="less" scoped>
.home {
  &.page-wrapper {
    display: flex;
    column-gap: 24px;
    min-width: 100%;

    .individual-info {
      padding-top: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        object-fit: cover;
        overflow: hidden;
        border-radius: 50%;
        margin: -4px;
      }

      .name-box {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .nickname {
          font-size: 2rem;
          font-weight: 500;
        }
        .github-name {
          font-size: 16px;
        }
      }
      .sns {
        margin-top: 48px;
        .iconfont {
          cursor: pointer;
          font-size: 2rem;
        }
      }
    }

    .line {
      display: none;
    }

    .right-container {
      width: 100%;
      padding: 12px 24px;
      .recently-content {
        .caption {
          padding-left: 20px;
          padding-top: 12px;
          color: var(--accents-5);
        }

        .article-items {
          display: flex;
          flex-direction: column;
          row-gap: 32px;
        }
      }
    }

    @media screen and (max-width: 965px) {
      & {
        flex-direction: column;
        & .individual-info {
          flex-direction: row;
          margin-left: 12px;

          .name-box {
            margin: 0 24px;
          }
          .sns {
            margin: auto;
          }
        }

        .line {
          display: flex;
        }

        .right-container {
          padding: 0;
        }
      }
    }
  }
}
</style>
