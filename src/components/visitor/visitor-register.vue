<template>
  <div class="visitor-register__wrapper">
    <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item has-feedback label="昵称" name="nickname">
        <a-input v-model:value="formState.nickname" placeholder="请输入昵称✍..." />
      </a-form-item>
      <a-form-item has-feedback label="邮箱" name="email">
        <a-input v-model:value="formState.email" placeholder="请输入邮箱📫..." />
      </a-form-item>
      <a-form-item has-feedback label="密码" name="pass">
        <a-input v-model:value="formState.pass" type="password" autocomplete="off" placeholder="请输入密码🔑..." />
      </a-form-item>
      <a-form-item has-feedback label="再次确认" name="checkPass">
        <a-input
          v-model:value="formState.checkPass"
          type="password"
          autocomplete="off"
          placeholder="请再次输入密码🔑..."
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 16, offset: 6 }">
        <a-button :disabled="isDisabled" type="primary" html-type="submit" @click.prevent="onSubmit">注册</a-button>
        <span class="register-span" @click="switchLogin">已有账号，登录</span>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { useVisitorStore } from '@web/stores/visitorStore'
import type { Rule } from 'ant-design-vue/es/form'
import { computed, defineComponent, getCurrentInstance, onBeforeMount, reactive, ref } from 'vue'
interface FormState {
  nickname: string
  email: string
  pass: string
  checkPass: string
}
export default defineComponent({
  name: 'VisitorRegister',
  emits: ['click', 'closeModal'],
  setup(props, { emit }) {
    const formRef = ref()
    const formState = reactive<FormState>({
      nickname: '',
      email: '',
      pass: '',
      checkPass: '',
    })
    const { proxy }: any = getCurrentInstance()

    const VisitorStore = useVisitorStore()

    // 控制 注册按钮的 启用状态
    const isDisabled = computed((): boolean => {
      return !(formState.nickname && formState.email && formState.pass && formState.checkPass)
    })

    // 校验 昵称
    let validateNickname = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请输入昵称')
      } else {
        if (value.includes(' ')) {
          return Promise.reject('昵称不允许存在空格字符')
        } else {
          if (value.length < 4) {
            return Promise.reject('昵称不能小于4个字符')
          } else if (value.length > 10) {
            return Promise.reject('昵称不能大于10个字符')
          } else {
            if (formState.checkPass !== '') {
              formRef.value.validateFields('nickname')
            }
          }
        }

        return Promise.resolve()
      }
    }
    // 校验邮件
    let validateEmail = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请输入邮箱')
      } else {
        if (formState.checkPass !== '') {
          formRef.value.validateFields('email')
        }
        return Promise.resolve()
      }
    }
    // 校验第一次密码
    let validatePass = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请输入密码')
      } else {
        if (value.length < 8) {
          return Promise.reject('密码不能小于8位')
        } else if (value.length > 16) {
          return Promise.reject('密码不能大于16位')
        } else {
          if (formState.checkPass !== '') {
            formRef.value.validateFields('checkPass')
          }
        }
        return Promise.resolve()
      }
    }
    // 校验第二次密码
    let validatePass2 = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请再次输入密码')
      } else if (value !== formState.pass) {
        return Promise.reject('两次密码不一致!')
      } else {
        return Promise.resolve()
      }
    }

    const rules = {
      nickname: [{ required: true, validator: validateNickname, trigger: 'change' }],
      email: [
        { type: 'email', message: '请输入有效的邮箱' },
        { required: true, validator: validateEmail, trigger: 'change' },
      ],
      pass: [{ required: true, validator: validatePass, trigger: 'change' }],
      checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }],
    }
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    }

    // 重置表单
    const resetForm = () => {
      formRef.value.resetFields()
    }

    // 清除表单数据
    const clearForm = () => {
      formState.nickname = ''
      formState.email = ''
      formState.pass = ''
      formState.checkPass = ''
    }

    // 注册按钮
    const onSubmit = async () => {
      await VisitorStore.registerVisitor({
        nickname: formState.nickname,
        email: formState.email,
        password: formState.pass,
      })
        .then(() => {
          proxy.$toast['success']({
            text: '注册成功',
            duration: '1200',
          })
          // 清除表单原有数据
          formRef.value.resetFields()
          // 切换到登录模态框
          switchLogin()
          // 关闭登录模态框
          emit('closeModal')
        })
        .catch(() => {
          proxy.$toast['error']({
            text: '注册失败，请稍后重试',
            duration: '1500',
          })
        })
    }

    // 切换到登录
    const switchLogin = () => {
      emit('click')
    }

    onBeforeMount(() => {
      clearForm()
    })
    return {
      formState,
      isDisabled,
      formRef,
      rules,
      layout,
      resetForm,
      switchLogin,
      onSubmit,
    }
  },
})
</script>

<style lang="less" scoped>
.visitor-register__wrapper {
  .register-span {
    margin-left: 32px;
    cursor: pointer;
    &:hover {
      color: #40a9ff;
    }
  }
}
</style>
