<template>
  <div class="comment-item">
    <a-comment>
      <!-- 父级 -->
      <template #actions>
        <span key="comment-basic-reply-to" @click="clickReplyHandler(commentItem?.visitor.nickname, commentItem?._id)"
          >回复</span
        >
      </template>
      <template #author>
        <span class="visitor__nickname parent-comment">{{ commentItem?.visitor.nickname }}</span>
      </template>
      <template #content>
        <div class="comment__content" v-html="commentItem?.content"></div>
      </template>

      <template #datetime>
        <span> {{ commentItem?.createdAt }}</span>
      </template>

      <!-- 子级 -->
      <div class="child-comment" v-if="hasChild">
        <a-comment v-for="childItem in childComments" :key="childItem">
          <template #actions>
            <span
              key="comment-nested-reply-to"
              @click="clickReplyHandler(childItem.visitor.nickname || '', commentItem?._id)"
              >回复</span
            >
          </template>
          <template #author>
            <span class="visitor__nickname">{{ childItem.visitor.nickname }}</span>
            <span style="margin: 0px 4px; font-weight: 600">@</span>
            <span class="visitor__nickname">{{ childItem.reply_to_visitor }}</span>
          </template>
          <template #content>
            <div class="comment__content" v-html="childItem.content"></div>
          </template>
          <template #datetime>
            <separate-dot></separate-dot>
            <span>{{ childItem.createdAt }}</span>
          </template>
        </a-comment>
      </div>
    </a-comment>
  </div>
</template>

<script lang="ts">
import { IChildComment, IComment } from '@web/interfaces/IComment'
import { useCommentStore } from '@web/stores/commentStore'
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue'
import SeparateDot from '../separator/separate-dot.vue'

export default defineComponent({
  name: 'CommentItem',
  components: {
    SeparateDot,
  },
  props: {
    commentItem: Object as PropType<IComment>,
  },
  setup(props) {
    // childComment数据是 JSON类型，需要转换 JSON.parse()
    const childComments = computed((): IChildComment[] => props.commentItem?.child_comments || [])
    const hasChild = ref(false)
    const CommentStore = useCommentStore()
    watchEffect(() => {
      // BUG：child_comments数组中可能出现 {}空对象
      //  暂时解决方式：根据0索引值，判断是否是空对象
      if (JSON.stringify(childComments.value[0]) === '{}') {
        hasChild.value = false
      } else {
        hasChild.value = true
      }
    })
    const clickReplyHandler = (nickname: string, id: string) => {
      console.log(id, nickname)
      CommentStore.replyComment.replyToNickname = nickname
      CommentStore.replyCommentId = id
    }

    return {
      hasChild,
      childComments,
      clickReplyHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.comment-item {
  .visitor__nickname {
    font-weight: 500;
    padding: 4px 8px;
    background-color: whitesmoke;
    border-radius: 8px;
    font-size: 0.8rem;
    color: var(--accents-5);
    cursor: pointer;
    transition: all 0.3s ease;

    &.parent-comment {
      margin-left: -8px;
    }

    &:hover {
      color: var(--accents-7);
      transition: all 0.5s ease;
    }
  }

  .comment__content {
    margin-top: 12px;
    margin-left: 8px;
  }
}
</style>
