<template>
  <div class="hinoki-blog fold-nav">
    <div class="burger" @click="clickHandler">
      <div class="burger-line-1"></div>
      <div class="burger-line-2"></div>
      <div class="burger-line-3"></div>
    </div>
    <fe-drawer placement="left" v-model="visible">
      <navigation-bar :direction="'row'" style="margin-top: 32px;"></navigation-bar>
    </fe-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import navigationBar from './navigation-bar.vue'

export default defineComponent({
  components: { navigationBar },
  name: 'FoldNav',
  setup(props, { emit }) {
    const visible = ref<boolean>(false)
    const clickHandler = () => {
      visible.value = !visible.value
    }
    return {
      clickHandler,
      visible,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.fold-nav {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 8px;
    cursor: pointer;

    & .burger {
      width: 45px;
      height: 19px;

      display: grid;
      grid-template-rows: repeat(3, 1fr);
      justify-items: center;
      align-items: center;

      row-gap: 2px;

      .burger-line-1,
      .burger-line-2,
      .burger-line-3 {
        width: 36px;
        height: 2px;
        background-color: var(--accents-7);
        transition: all 0.5s ease;
        border-radius: 2px;
        margin: 2px 0;
      }

      /* 折叠按钮的三条线 */
    }
    &:hover {
      & .burger {
        .burger-line-1,
        .burger-line-2,
        .burger-line-3 {
          background-color: #2e2e2e;
          transition: 0.4s ease;
        }
        .burger-line-1 {
          transform: translateX(10px);
        }
        .burger-line-2 {
          transform: translateX(15px);
        }
        .burger-line-3 {
          transform: translateX(10px);
        }
      }
    }
  }
}
</style>
