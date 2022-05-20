<template>
  <div class="login-form">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 12 }"
      autocomplete="off"
    >
      <a-form-item
        label="邮箱"
        name="email"
        :rules="[
          { type: 'email', message: '请输入有效的邮箱' },
          { required: true, message: '邮箱不能为空!' },
        ]"
      >
        <a-input v-model:value="formState.email" placeholder="请输入邮箱📫..." />
      </a-form-item>

      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '密码不能为空!' }]">
        <a-input-password v-model:value="formState.password" placeholder="请输入密码🔑..." />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 6 }">
        <a-button type="primary" :disabled="isDisabled" html-type="submit" @click.prevent="onSubmit">登录</a-button>
        <span class="register-span" @click="switchRegister">注册</span>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { ILoginVisitor } from '@web/interfaces/IVisitor'
import { useVisitorStore } from '@web/stores/visitorStore'
import { computed, defineComponent, getCurrentInstance, onBeforeMount, reactive, ref } from 'vue'

export default defineComponent({
  name: 'VisitorLogin',
  emits: ['click', 'closeModal'],
  setup(props, { emit }) {
    // 表单ref
    const formRef = ref()
    const formState = reactive<ILoginVisitor>({
      email: '',
      password: '',
    })
    const { proxy }: any = getCurrentInstance()

    // 控制 登录按钮的 启用状态
    const isDisabled = computed((): boolean => {
      return !(formState.email && formState.password)
    })

    const VisitorStore = useVisitorStore()

    // 切换到注册
    const switchRegister = () => {
      emit('click')
    }

    // 登录提交
    const onSubmit = async () => {
      await VisitorStore.loginVisitor({ ...formState }).then(
        () => {
          proxy.$toast['success']({
            text: '登录成功',
            duration: '1200',
          })
          // 清空表单信息
          formRef.value.resetFields()
          VisitorStore.visitorStatus = true
        },
        () =>
          proxy.$toast['error']({
            text: '登录失败，邮箱或密码错误',
            duration: '1500',
          })
      )
    }

    onBeforeMount(() => {
      formState.email = ''
      formState.password = ''
    })
    return {
      formRef,
      formState,
      switchRegister,
      isDisabled,
      onSubmit,
    }
  },
})
</script>

<style lang="less" scoped>
.login-form {
  .register-span {
    margin-left: 32px;
    cursor: pointer;
    &:hover {
      color: #40a9ff;
    }
  }
}
</style>
