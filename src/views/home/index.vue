<template>
  <div class="home page-wrapper">
    <div class="individual-info">
      <div class="avatar">
        <fe-image
          skeleton
          width="13rem"
          height="13rem"
          max-delay="1500"
          src="https://avatars.githubusercontent.com/u/93910087?v=4"
        ></fe-image>
      </div>
      <div class="nickname">Hinoki</div>
      <div class="github-name">Hinoki_Su</div>
      <div class="sns">
        <span class="iconfont sns-GitHub"></span>
      </div>
    </div>
    <div class="right-container">
      <div class="recently-content">
        <div class="caption">Recently Article</div>
        <!-- 列举最近发布的3篇文章 -->
        <div class="article-items">
          <article-item></article-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleItem from '@web/components/article-item/article-item.vue'
export default defineComponent({
  name: 'Home',
  components: { ArticleItem },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.home {
  &.page-wrapper {
    display: grid;
    grid-template-columns: 2fr 8fr;
    column-gap: 36px;

    .individual-info {
      margin-top: 48px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        object-fit: cover;
        overflow: hidden;
        border-radius: 50%;
      }

      .nickname {
        margin-top: 32px;
        font-size: 40px;
        font-weight: 500;
      }

      .github-name {
        font-size: 16px;
      }

      .sns {
        margin-top: 64px;
        .iconfont {
          cursor: pointer;
          font-size: 36px;
        }
      }
    }

    .right-container {
      padding: 0 24px;
      .recently-content {
        .caption {
          font-size: 32px;
          padding: 12px;
        }
      }
    }
  }
}
</style>
