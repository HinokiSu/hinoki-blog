<template>
  <div class="archive__wrapper">
    <content-layout header-title="归档">
      <div class="archive__container">
        <div class="category__item" v-for="item in categories" :key="item._id">
          <article-tags></article-tags>
          <div class="item__name" @click="categoryHandler(item._id)">
            {{ item.name }}
          </div>
        </div>
      </div>
    </content-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, ref, watchEffect } from 'vue'
import { useCategoryStore } from '@web/stores/categoryStore'
import ArticleTags from '@web/components/article-item/article-tags.vue'
import contentLayout from '@web/layouts/content-layout.vue'
import router from '@web/routes'
export default defineComponent({
  name: 'Archive',
  components: { contentLayout, ArticleTags },
  setup() {
    const CategoryStore = useCategoryStore()
    const categories = computed(() => CategoryStore.categoryList)
    const { proxy } = getCurrentInstance() as any
    onMounted(() => {
      CategoryStore.getCategories()
    })

    const categoryHandler = (cateId: string | undefined) => {
      if (cateId) {
        router.push({
          name: 'archive-detail',
          params: {
            id: cateId,
          },
        })
      } else {
        proxy.$toast['error']({
          text: '根据类别, 获取文章失败',
          duration: '1500',
        })
      }
    }

    return {
      categories,
      categoryHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.archive__wrapper {
  & .archive__container {
    display: flex;
    flex-direction: column;
  }

  & .category__item {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 8px;
    .item__name {
      font-size: 1.6rem;
      color: var(--accents-7);
      cursor: pointer;
      &:hover {
        color: var(--accents-5);
      }
    }
  }
}
</style>
