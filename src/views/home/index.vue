<template>
  <div class="home">
    <div class="left-container">
      <home-introducation></home-introducation>
      <div class="recently-content">
        <div class="caption">
          <h3>最新的文章</h3>
        </div>
        <!-- 列举最近发布的3篇文章 -->
        <div class="article-items">
          <article-item :article="articleItem" v-for="articleItem in articleList" :key="articleItem._id"></article-item>
        </div>
      </div>
    </div>
    <div class="right-container individual-info">
      <div class="avatar">
        <img src="https://avatars.githubusercontent.com/u/93910087?v=4" alt="github avatar" />
      </div>
      <div class="name-box">
        <div class="nickname">Hinoki</div>
      </div>
      <div class="profession">
        <span>前端开发</span>
        <span>RPA开发</span>
      </div>
      <div class="sns">
        <a href="https://github.com/HinokiSu">
          <github size="24" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import ArticleItem from '@web/components/article-item/article-item.vue'
import { useArticleStore } from '@web/stores/articleStore'
import SeparateLine from '@web/components/separator/separate-line.vue'
import { Github } from '@fect-ui/vue-icons'
import HomeIntroducation from '@web/components/home/home-introducation.vue'

export default defineComponent({
  name: 'Home',
  components: { ArticleItem, SeparateLine, Github, HomeIntroducation },
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
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  padding-bottom: 80px;
  .left-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-right: 200px;

    .recently-content {
      width: 100%;
      .caption {
        width: 100%;
        border-bottom: 2px solid var(--accents-2);
        padding: 12px 24px;
        color: var(--accents-5);
      }

      .article-items {
        display: flex;
        flex-direction: column;
        row-gap: 32px;
      }
    }
  }

  .right-container {
    width: 200px;
    &.individual-info {
      position: fixed;
      flex-shrink: 0;

      height: 100%;
      top: 120px;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-left: 2px solid var(--accents-2);

      .avatar {
        margin-top: 32px;
        width: 160px;
        img {
          border-radius: 50%;
          object-fit: cover;
          overflow: hidden;
        }
      }

      .name-box {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .nickname {
          font-size: 1.8rem;
          font-weight: 500;
        }
      }

      .profession {
        display: flex;
        flex-direction: column;
        font-size: 0.82rem;
        font-weight: 500;
        color: var(--accents-7);
      }
      .sns {
        margin-top: 24px;
        cursor: pointer;
      }

      @media screen and (max-width: 965px) {
        & {
          position: unset;
          height: unset;
          right: unset;
          border-left: 0px;
        }
      }
    }
  }
  @media screen and (max-width: 965px) {
    & {
      flex-direction: column-reverse;
      .right-container {
        width: 100%;
        &.individual-info {
          flex-direction: column;
          margin-left: 12px;
          margin-bottom: 12px;
          .avatar {
            margin-top: 0;
          }

          .name-box {
            margin-top: 0px;
          }
        }

        .left-container {
          padding-right: 0px;
        }
      }

      .left-container {
        padding-right: 0px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    & {
      .right-container {
        .individual-info {
          flex-direction: column;

          .avatar {
            width: 120px;
          }
        }
      }
    }
  }
}
</style>
