<template>
  <div class="article-author">
    <div class="author-avatar" :style="styles">
      <fe-img
        class="avatar-img"
        src="https://avatars.githubusercontent.com/u/93910087?v=4"
        :width="avatarSize.width"
        :height="avatarSize.height"
        skeleton
        max-delay="600"
      ></fe-img>
    </div>
    <div class="author-info">
      <span class="author-name">Hinoki</span>
      <span class="author-identity"> frontEnd developer </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
export default defineComponent({
  name: 'ArticleAuthor',
  props: {
    width: {
      type: String,
      default: '64px',
    },
    height: {
      type: String,
      default: '64px',
    },
  },
  setup(props) {
    const avatarSize = ref({
      width: '',
      height: '',
    })
    const styles = ref('')

    watchEffect(() => {
      avatarSize.value.width = props.width
      avatarSize.value.height = props.height
      styles.value = `width: ${avatarSize.value.width};height: ${avatarSize.value.height}`
    })
    return {
      avatarSize,
      styles,
    }
  },
})
</script>

<style lang="less" scoped>
.article-author {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  .author-avatar {
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
  }

  .author-info {
    display: inline-flex;
    flex-direction: column;
    margin-left: 8pt;
    // only show in one row
    white-space: nowrap;

    .author-name {
      font-size: 16px;
      color: var(--accents-8);
      // first word uppercase
      text-transform: capitalize;
      font-display: 500;
      // use `...` hid overflow content
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .author-identity {
      font-size: 13px;
      color: var(--accents-5);
    }
  }
}
</style>
