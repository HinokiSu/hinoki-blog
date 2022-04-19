<template>
  <div class="article-item wrapper">
    <div class="item-container">
      <router-link :to="{ name: 'article-detail', params: { id: article?._id } }">
        <div class="article-body">
          <div class="article-caption">
            <div class="article-title">{{ article?.title }}</div>
            <separate-dot></separate-dot>
            <div class="article-time">
              {{ publishTime }}
            </div>
          </div>
          <div class="article-main">
            <div class="article-description">
              {{ article?.description }}
            </div>
          </div>
        </div>
      </router-link>
      <div class="article-footer" v-if="hasTags">
        <article-tags :tags="article?.classification"></article-tags>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IArticle } from '@web/interfaces/IArticle'
import { timeFormatToCNTime } from '@web/utils/formatter'
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue'
import articleTags from './article-tags.vue'
import SeparateDot from '../separator/separate-dot.vue'

export default defineComponent({
  name: 'ArticleItem',
  components: { articleTags, SeparateDot },
  props: {
    article: {
      type: Object as PropType<IArticle>,
    },
    hasTags: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const time = computed(() => <string>props.article?.createdAt)
    const publishTime = ref()
    watchEffect(() => {
      publishTime.value = timeFormatToCNTime(time.value)
    })

    return {
      publishTime,
    }
  },
})
</script>

<style lang="less" scoped>
.article-item {
  &.wrapper {
    padding-top: 24px;
    transition: all 0.4s ease;
    border-bottom: 2px solid var(--accents-2);
  }

  & .item-container {
    padding: 8px 24px;

    @media screen and (max-width: 500px) {
      & {
        padding: 8px 12px;
      }
    }

    .article-body {
      display: flex;
      flex-direction: column;
      padding-right: 8px;

      & .article-caption {
        display: flex;
        align-items: center;
        padding-bottom: 8px;

        .article-title {
          max-width: 60%;
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--accents-6);
          margin-bottom: 4px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
          display: -webkit-box;
        }

        .article-time {
          font-size: 0.8rem;
          color: var(--accents-5);
        }
      }

      .article-main {
        display: flex;
        flex-direction: column;

        .article-description {
          font-size: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
          display: -webkit-box;

          margin-bottom: 12px;
        }

        @media screen and (max-width: 500px) {
          & .article-description {
            padding: 4px 0;
            font-size: 0.8rem;
          }
        }
      }

      .article-footer {
        align-self: flex-end;
        display: flex;
        flex-direction: row;
      }
    }
  }
}
</style>
