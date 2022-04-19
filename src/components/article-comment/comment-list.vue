<template>
  <div class="comment-list wrapper">
    <a-list
      class="comment-list"
      :locale="{ emptyText: '无评论' }"
      :header="` `"
      item-layout="horizontal"
      :data-source="commentList"
    >
      <a-list-item v-for="item in commentList" :key="item._id">
        <comment-item :comment-item="item"></comment-item>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { useCommentStore } from '@web/stores/commentStore'
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'CommentList',
  setup() {
    const CommentStore = useCommentStore()
    const commentList = computed(() => CommentStore.commentList)

    watchEffect(() => {
      CommentStore.getParsedMarkdownContent()
    })
    return {
      commentList,
    }
  },
})
</script>

<style lang="less" scoped>
.comment-list {
  &.wrapper {
    width: 500px;
  }
}
</style>
