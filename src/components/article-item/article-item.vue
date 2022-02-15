<template>
  <div class="article-item wrapper">
    <div class="item-container">
      <div class="time">
        <div class="day">03</div>
        <div class="month">2月</div>
      </div>
      <div class="content">
        <div class="title">这是标题</div>
        <div class="category-tabs">
          <fe-tag text="前端" type="success" use-invert />
          <fe-tag text="Vue" type="success" use-invert />
        </div>
        <div class="description">这是简短的文章描述</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticleItem',
  setup() {
    return {}
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
        font-size: 42px;
        color: var(--success-default);
      }
      .month {
        font-size: 24px;
        color: var(--highlight-pink);
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
      .title {
        font-size: 38px;
        font-weight: 500;
      }

      .category-tabs {
        display: flex;
        column-gap: 8px;
      }
    }
  }
}
</style>
