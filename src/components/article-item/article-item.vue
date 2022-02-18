<template>
  <div class="article-item wrapper">
    <div class="item-container">
      <div class="time">
        <div class="day">{{ publishTime.day }}</div>
        <div class="month">{{ publishTime.month }}</div>
      </div>
      <div class="article-body">
        <div class="article-header">
          <h5>
            {{ article?.title }}
          </h5>
        </div>
        <div class="article-main">
          <div class="category-tabs">
            <fe-tag :text="tag.name" v-for="tag in article?.classification" :key="tag._id" type="success" use-invert />
          </div>
          <div class="description">{{ article?.description }}</div>
        </div>
        <div class="article-footer">
          <router-link :to="{ name: 'article-detail', params: { id: article?._id } }">
            <div class="read-more">Read More</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IArticle } from '@web/interfaces/IArticle'
import { timeHasMonthDay } from '@web/utils/formatter'
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'ArticleItem',
  props: {
    article: {
      type: Object as PropType<IArticle>,
    },
  },
  setup(props) {
    const time = computed(() => <string>props.article?.updatedAt)
    const publishTime = ref()
    watchEffect(() => {
      publishTime.value = timeHasMonthDay(time.value)
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
    width: 100%;
    margin: 8px;
    box-shadow: 0 0 36px var(--accents-2);
    border-radius: 24px;
    transition: all 0.4s ease;

    &:hover {
      box-shadow: 0 0 12px var(--accents-2);
    }
  }

  & .item-container {
    padding: 12px 8px;
    display: grid;
    grid-template-columns: 2fr 8fr;

    .time {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 4px;
      font-weight: 500;

      .day {
        font-size: 2.5rem;
        color: var(--success-default);
      }
      .month {
        font-size: 1.5rem;
        color: var(--highlight-pink);
      }
    }

    .article-body {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      padding-right: 8px;

      .article-header {
      }

      .article-main {
        display: flex;
        flex-direction: column;
        row-gap: 8px;
        .category-tabs {
          display: flex;
          column-gap: 8px;
        }
      }

      .article-footer {
        align-self: flex-end;

        .read-more {
          padding: 8px 12px;
          background-color: var(--success-default);
          color: var(--accents-1);
          font-size: 16px;
          font-weight: 600;
          border-radius: 16px;
          transition: all 0.4s ease;

          &:hover {
            background-color: var(--success-dark);
          }
        }
      }
    }
  }
}
</style>
