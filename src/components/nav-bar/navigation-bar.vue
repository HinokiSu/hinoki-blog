<template>
  <div class="navigation-bar" :class="classes">
    <div class="nav-link">
      <router-link :to="{ name: 'home' }">主页</router-link>
    </div>
    <div class="nav-link">
      <router-link :to="{ name: 'articles' }">文章</router-link>
    </div>
    <div class="nav-link">
      <router-link :to="{ name: 'archive' }">归档</router-link>
    </div>
    <div class="nav-link">
      <router-link :to="{ name: 'about' }">关于</router-link>
    </div>
    <div class="search-feature">
      <a-input
        v-model:value.trim="searchVal"
        class="search-input"
        :class="searchStatus.visible ? '__open' : '__close'"
        @keyup.enter.once="searchHandler"
      ></a-input>
      <svg
        @click="searchHandler"
        t="1649944739696"
        class="icon-search"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2580"
        width="20"
        height="30"
      >
        <path
          d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6c3.2 3.2 8.4 3.2 11.6 0l43.6-43.5c3.2-3.2 3.2-8.4 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
          p-id="2581"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@web/routes'
import { useArticleStore } from '@web/stores/articleStore'
import { computed, defineComponent, getCurrentInstance, reactive, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'NavigationBar',
  props: {
    direction: {
      type: String,
      default: 'column',
    },
  },
  setup(props) {
    const classes = computed(() => {
      if (props.direction === 'row') {
        return '__row'
      } else {
        return '__column'
      }
    })
    const searchStatus = reactive({
      visible: false,
      isSearch: false,
    })
    const { proxy }: any = getCurrentInstance()
    const ArticleStore = useArticleStore()

    // TODO：待优化，需要 防抖机制
    const searchHandler = async () => {
      if (searchStatus.isSearch) {
        // 搜索框中有值，点击搜索图表，进行搜索
        await ArticleStore.getArticleFuzzyByTitle(searchVal.value).then(
          () => {
            // 跳转到
            router.push({
              name: 'searched-articles',
              params: {
                keyword: searchVal.value,
              },
            })
          },
          () =>
            proxy.$toast['error']({
              text: '搜索失败',
              duration: '1500',
            })
        )
      } else {
        searchStatus.visible = !searchStatus.visible
      }
    }
    const searchVal = ref('')

    watchEffect(() => {
      if (searchVal.value.trim() !== '') {
        searchStatus.isSearch = true
      } else {
        searchStatus.isSearch = false
      }
    })
    return {
      classes,
      searchStatus,
      searchHandler,
      searchVal,
    }
  },
})
</script>

<style lang="less" scoped>
.navigation-bar {
  display: grid;
  justify-items: center;
  align-items: center;
  &.__column {
    grid-template-columns: repeat(4, 1fr) auto;
    column-gap: 12px;
  }

  &.__row {
    grid-template-rows: repeat(3, 1fr);
    row-gap: 32px;

    & .delimiter {
      display: none;
    }

    & .nav-link {
      transition: all 0.5s ease;
      padding: 12pt 16pt;
      &:hover {
        border-radius: 16px;
        background-color: var(--accents-2);
      }
    }
  }
  .nav-link {
    display: flex;
    a {
      padding: 10px;
      color: var(--accents-7);
      font-size: 1.2rem;
      font-weight: 400;
      &:hover {
        color: var(--primary-foreground);
      }
    }
  }

  .search-feature {
    display: flex;
    align-items: center;

    .search-input {
      &.__close {
        // transition: all 0.6s ease;
        transition: width 0.6s ease;
        visibility: hidden;
        width: 0px;
        height: 0;
        margin: 0;
        padding: 0;
      }

      &.__open {
        transition: width 0.3s ease;
        width: 120px;
        visibility: visible;
      }
    }

    .icon-search {
      margin-left: 8px;
      cursor: pointer;
    }
  }
}
</style>
