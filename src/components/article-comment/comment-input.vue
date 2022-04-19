<template>
  <div class="comment-input wrapper" :class="commentStatus.isVisible ? '__activating' : ''">
    <div class="comment__header">
      <div class="visitor__nickname nickname">{{ visitor.nickname }}</div>
      <div class="visitor__signout" v-if="commentStatus.signOutVisible && commentStatus.isVisible">
        <span @click="signOut">退出</span>
      </div>
    </div>
    <div class="reply__visitor" v-show="commentStatus.isReplyStatus">
      <span class="reply__sign">回复给</span>
      <span class="reply__nickname nickname" @click="clearReplyHandler">
        {{ replyVisitor }}
        <span class="clear-reply__icon"
          ><svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            shape-rendering="geometricPrecision"
            viewBox="0 0 24 24"
            height="16"
            width="16"
            data-v-8357e50e=""
            style="color: currentcolor"
          >
            <path d="M18 6L6 18M6 6l12 12"></path></svg></span
      ></span>
    </div>
    <div class="comment__input" @click="commentAreaHandler">
      <!-- textarea. support Markdown -->
      <a-textarea
        :disabled="commentStatus.isDisabledInput"
        v-model:value="commentValue"
        :placeholder="commentStatus.placeholder"
        allow-clear
      />
    </div>
    <div class="comment__features_btns">
      <!-- 关闭drawer 触发事件， 将状态变换 -->
      <a-button @click="showInputHandler" class="btn__cancel" size="middle" :disabled="commentStatus.isDisabledBtn"
        >取消</a-button
      >
      <a-button
        type="primary"
        size="middle"
        :disabled="commentStatus.isDisabledBtn || commentStatus.isDisabledOfSubmit"
        @click="onSubmit"
        >提交</a-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { IComment, IParentComment, IReplyComment } from '@web/interfaces/IComment'
import { useArticleStore } from '@web/stores/articleStore'
import { useCommentStore } from '@web/stores/commentStore'
import { useVisitorStore } from '@web/stores/visitorStore'
import { getRealTime } from '@web/utils/formatter'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from 'vue'

export default defineComponent({
  name: 'CommentInput',
  emits: ['click-modal'],
  setup(props, { emit }) {
    const commentValue = ref('')
    const VisitorStore = useVisitorStore()
    const CommentStore = useCommentStore()
    const ArticleStore = useArticleStore()
    const visitor = computed(() => VisitorStore.visitorData)
    const articleId = computed(() => ArticleStore.articleData._id || '')

    // 回复给谁
    const replyVisitor = computed(() => CommentStore.replyComment.replyToNickname)
    // 根据 visitor的登录状态区改变 placeholder中的信息
    const loginStatus = computed(() => VisitorStore.getLoginStatus)

    let intervalId: number
    let realTime = ref('')
    const { proxy }: any = getCurrentInstance()

    onMounted(async () => {
      // 获取实时的时间
      intervalId = getRealTime(realTime, 1000)
    })
    const commentStatus = reactive({
      // 控制 输入框展开
      isVisible: false,
      // 控制 两个按钮的 禁用状态
      isDisabledBtn: true,
      // 控制 提交按钮的 禁用状态
      isDisabledOfSubmit: true,
      // textarea输入框是否禁用，默认禁用
      isDisabledInput: true,
      // 评论输入框，提示信息
      placeholder: '',
      // 控制 退出 按钮的显示
      signOutVisible: false,
      // 控制 回复
      isReplyStatus: false,
    })

    watchEffect(() => {
      // 根据 localStorage中的键值对，区判断visitor是否登录
      if (loginStatus.value) {
        // 已登录
        commentStatus.isDisabledInput = false
        commentStatus.placeholder = '想说点什么呢🤔？'

        commentStatus.signOutVisible = true

        if (commentStatus.isVisible) {
          commentStatus.isDisabledBtn = false
        } else {
          commentStatus.isDisabledBtn = true
        }

        // 监视textarea是否为空，若为空，则禁止使用"提交"按钮
        if (commentValue.value === '') {
          commentStatus.isDisabledOfSubmit = true
        } else {
          commentStatus.isDisabledOfSubmit = false
        }
      } else {
        // 未登录
        commentStatus.placeholder = '如果想说点什么，请点击这儿👋'
      }
    })

    const comment = reactive(<IParentComment>{
      article_id: '',
      visitor_id: '',
      content: '',
      createdAt: '',
    })

    const replyComment = reactive(<IReplyComment>{
      visitor_id: '',
      reply_to_visitor: '',
      content: '',
      createdAt: '',
    })

    watchEffect(() => {
      comment.article_id = ArticleStore.articleData._id || ''
      comment.visitor_id = VisitorStore.visitorData._id || ''
      comment.content = commentValue.value
      comment.createdAt = realTime.value

      replyComment.visitor_id = VisitorStore.visitorData._id
      replyComment.reply_to_visitor = CommentStore.replyComment.replyToNickname
      replyComment.content = commentValue.value
      replyComment.createdAt = realTime.value

      if (CommentStore.replyComment.replyToNickname) {
        commentStatus.isReplyStatus = true
      } else {
        commentStatus.isReplyStatus = false
      }
    })

    // 控制展示 完整的 评论输入区
    const commentAreaHandler = () => {
      // 若输入框被 禁用，则不会显示完整的 评论输入区
      if (commentStatus.isDisabledInput) {
        // 显示 注册/登录 Modal
        emit('click-modal')
      } else {
        commentStatus.isVisible = true
      }
    }
    // 退出
    const signOut = () => {
      VisitorStore.visitorStatus = false
      localStorage.removeItem('visitor')
      VisitorStore.visitorData = {}
      commentStatus.isDisabledInput = true
      commentStatus.isVisible = false
    }

    const showInputHandler = () => {
      commentStatus.isVisible = !commentStatus.isVisible
    }

    // 评论变化，重新获取
    const reGetData = () => {
      CommentStore.getCommentsByArticleId(articleId.value)
      CommentStore.getCommentTotalByArticleId(articleId.value)
    }

    // 发表评论
    const onSubmit = () => {
      if (commentStatus.isReplyStatus) {
        // 回复
        console.log(replyComment)
        CommentStore.replyCommentByArticleId(CommentStore.replyCommentId, replyComment).then(
          () => {
            proxy.$toast['success']({
              text: '回复评论成功',
              duration: '1200',
            })
            commentValue.value = ''
            reGetData()
          },
          () => {
            proxy.$toast['success']({
              text: '回复评论失败',
              duration: '1500',
            })
          }
        )
      } else {
        CommentStore.addCommentByArticleId(comment).then(
          () => {
            proxy.$toast['success']({
              text: '评论成功',
              duration: '1200',
            })
            commentValue.value = ''
            reGetData()
          },
          () => {
            proxy.$toast['success']({
              text: '评论失败',
              duration: '1500',
            })
          }
        )
      }
    }

    /*
      回复功能
    */
    const clearReplyHandler = () => {
      // 清除回复状态
      CommentStore.replyComment.replyToNickname = ''
      commentStatus.isReplyStatus = false
    }

    // recycle
    onBeforeUnmount(() => {
      clearInterval(intervalId)
    })
    return {
      commentValue,
      commentAreaHandler,
      showInputHandler,
      commentStatus,
      visitor,
      onSubmit,
      signOut,
      replyVisitor,
      clearReplyHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.comment-input {
  z-index: 800;
  width: 100%;
  &.wrapper {
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 8px;
    border-radius: 8px;

    .nickname {
      background-color: whitesmoke;
      border-radius: 8px;
    }
  }

  & .comment__header {
    display: flex;
    align-items: center;
    margin-left: 6px;
    margin-bottom: 8px;

    height: 0;

    opacity: 0;
    transition: all 0.3s ease;

    .visitor__nickname {
      padding: 2px 12px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .visitor__signout {
      font-size: 0.8rem;
      margin-left: 16px;
      color: var(--accents-3);
      cursor: pointer;

      &:hover {
        color: #40a9ff;
      }
    }
  }

  & .reply__visitor {
    margin-bottom: 8px;
    margin-left: 10px;

    .reply__sign {
      font-size: 0.6rem;
      color: var(--accents-3);
      margin-right: 4px;
    }
    .reply__nickname {
      font-size: 0.8rem;
      font-weight: 500;
      padding: 4px 6px;
      cursor: pointer;
      .clear-reply__icon {
        vertical-align: sub;
      }
    }
  }

  & .comment__features_btns {
    display: flex;
    margin-top: 12px;
    justify-content: flex-end;
    align-items: center;

    transition: all 0.3s ease;
    opacity: 0;
    height: 0;

    .btn__cancel {
      margin-right: 12px;
    }
  }

  &.__activating {
    transition: all 4s ease;

    opacity: 1;

    & .comment__header {
      opacity: 1;
      transition: all 0.4s ease;
      height: 32px;
    }

    & .comment__features_btns {
      opacity: 1;
      transition: all 0.4s ease;
      height: 48px;
    }
  }

  @media screen and (max-width: 765px) {
    & {
      margin-top: 24px;
    }
  }
}
</style>
